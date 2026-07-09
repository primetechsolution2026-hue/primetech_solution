"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../../lib/firebase";

const db = getFirestore(app);

interface Review {
  id: string;
  nameOrCompany: string;
  description: string;
  rating: number;
  profileImageUrl: string;
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill={value >= star ? "#2dd4bf" : "none"}
          stroke={value >= star ? "#2dd4bf" : "rgba(148,163,184,0.3)"}
          strokeWidth="1.8"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data: Review[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            nameOrCompany: raw.nameOrCompany ?? "",
            description: raw.description ?? "",
            rating: raw.rating ?? 5,
            profileImageUrl: raw.profileImageUrl ?? "",
          };
        });
        setReviews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (animating || reviews.length <= 1) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === "right"
            ? (prev + 1) % reviews.length
            : (prev - 1 + reviews.length) % reviews.length
        );
        setAnimating(false);
      }, 350);
    },
    [animating, reviews.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("right");
      if (e.key === "ArrowLeft") navigate("left");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  const review = reviews[current];
  const pad = (n: number) => String(n).padStart(2, "0");

  // Render nothing while loading or when there are no reviews
  if (loading || reviews.length === 0) return null;

  return (
    <div
      id="review"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #020b18 0%, #040f1f 50%, #010a15 100%)",
      }}
    >
      {/* Background glows */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(14,165,233,0.08) 0%, transparent 65%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(20,184,166,0.06) 0%, transparent 65%)" }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Title ── */}
      <div className="text-center mb-32 relative z-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/70" />
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-teal-400">
            Testimonials
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/70" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-sky-50">
          Client Reviews
        </h1>
      </div>

      {/* ── Slider ── */}
      <div className="relative w-full max-w-5xl flex items-center justify-center z-10">

        {/* Left Arrow */}
        <button
          onClick={() => navigate("left")}
          disabled={reviews.length <= 1}
          className="absolute left-0 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30"
          style={{
            background: "rgba(45,212,191,0.1)",
            border: "1px solid rgba(45,212,191,0.3)",
            color: "#2dd4bf",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Content */}
        <div className="w-full px-16 md:px-24">
          {review && (
            <div
              className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === "right" ? "-30px" : "30px"})`
                  : "translateX(0)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* ── Left: text side ── */}
              <div className="flex-1 flex flex-col gap-5 text-left">
                {/* Counter */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-black"
                    style={{ color: "#2dd4bf", lineHeight: 1 }}
                  >
                    {pad(current + 1)}
                  </span>
                  <span className="text-slate-500 text-lg font-medium">
                    / {pad(reviews.length)}
                  </span>
                </div>

                {/* Stars */}
                <StarRating value={review.rating} />

                {/* Quote text */}
                <blockquote className="text-lg md:text-xl leading-relaxed text-slate-300 italic">
                  "{review.description}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col gap-0.5 pt-1">
                  <span className="text-base font-bold text-sky-50">
                    {review.nameOrCompany}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#2dd4bf" }}>
                    Verified Client
                  </span>
                </div>
              </div>

              {/* ── Right: avatar ── */}
              <div className="flex-shrink-0 relative">
                {/* Teal quote badge */}
                <div
                  className="absolute -top-4 -left-4 z-10 w-20 h-20 rounded-full flex items-center justify-center text-[#020b18] font-black text-3xl shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #2dd4bf, #0ea5e9)",
                    boxShadow: "0 4px 24px rgba(45,212,191,0.45)",
                    lineHeight: 1,
                    paddingBottom: "6px",
                  }}
                >
                    <Image
                    src="/images/doulble-qoute.png"
                    alt="Hero Image"
                    width={50}
                    height={50}
                    priority
                    className="opacity-90"
                    />
                </div>

                {/* Avatar */}
                <div
                  className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden"
                  style={{
                    border: "4px solid rgba(45,212,191,0.2)",
                    boxShadow: "0 0 70px rgba(45,212,191,0.1), 0 24px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {review.profileImageUrl ? (
                    <img
                      src={review.profileImageUrl}
                      alt={review.nameOrCompany}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "grayscale(15%)" }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-6xl font-black text-teal-400"
                      style={{ background: "rgba(45,212,191,0.06)" }}
                    >
                      {review.nameOrCompany?.charAt(0)?.toUpperCase() ?? "?"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigate("right")}
          disabled={reviews.length <= 1}
          className="absolute right-0 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30"
          style={{
            background: "linear-gradient(135deg, #2dd4bf, #0ea5e9)",
            color: "#020b18",
            border: "none",
            boxShadow: "0 4px 20px rgba(45,212,191,0.35)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ── */}
      {reviews.length > 1 && (
        <div className="flex items-center gap-2 mt-12 z-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === current || animating) return;
                setDirection(i > current ? "right" : "left");
                setAnimating(true);
                setTimeout(() => { setCurrent(i); setAnimating(false); }, 350);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current
                  ? "linear-gradient(90deg, #2dd4bf, #0ea5e9)"
                  : "rgba(148,163,184,0.2)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}