"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ThankYouPage() {
  const [countdown, setCountdown] = useState(10);
  const [circleProgress, setCircleProgress] = useState(0);

  useEffect(() => {
    // Animate circle fill on mount
    const fillTimer = setTimeout(() => setCircleProgress(100), 100);

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "/";
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(fillTimer);
      clearInterval(interval);
    };
  }, []);

  // SVG circle math for countdown ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countdown / 10) * circumference;

  return (
    <div
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
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(20,184,166,0.07) 0%, transparent 65%)" }}
      />
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow behind card */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(45,212,191,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md flex flex-col items-center text-center px-8 py-12 rounded-3xl z-10"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(148,163,184,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(45,212,191,0.05) inset",
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.5), transparent)" }}
        />

        {/* Animated checkmark circle */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: "radial-gradient(circle, rgba(45,212,191,0.25) 0%, transparent 70%)",
              transform: "scale(1.6)",
            }}
          />

          {/* Circle with animated border */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(45,212,191,0.08)",
              border: "2px solid rgba(45,212,191,0.2)",
            }}
          >
            {/* Animated SVG checkmark */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="rgba(45,212,191,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="url(#checkGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - circleProgress / 100 * circumference}
                style={{ transition: "stroke-dashoffset 0.8s ease", transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
              <defs>
                <linearGradient id="checkGradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
              {/* Checkmark path */}
              <path
                d="M13 22L19.5 28.5L31 16"
                stroke="url(#checkGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: circleProgress === 100 ? 0 : 30,
                  transition: "stroke-dashoffset 0.6s ease 0.4s",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6" style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.7))" }} />
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-teal-400">
            Message Sent
          </span>
          <span className="h-px w-6" style={{ background: "linear-gradient(90deg, rgba(45,212,191,0.7), transparent)" }} />
        </div>

        {/* Heading */}
        <h1
          className="text-4xl font-extrabold tracking-tight text-sky-50 mb-4"
          style={{ lineHeight: 1.1 }}
        >
          Thank You!
        </h1>

        {/* Body */}
        <p className="text-slate-400 text-sm leading-relaxed mb-2">
          Your message has been received. We appreciate you reaching out and will get back to you as soon as possible.
        </p>
        <p className="text-slate-500 text-xs leading-relaxed mb-10">
          Expect a reply within <span className="text-teal-400 font-semibold">1–2 business days</span>.
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.1), transparent)" }}
        />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-[#020b18] transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)",
              boxShadow: "0 4px 20px rgba(45,212,191,0.25)",
            }}
          >
            Back to Home
          </Link>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); window.location.href = "/#contact"; }}
            className="flex-1 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-teal-400 transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(45,212,191,0.06)",
              border: "1px solid rgba(45,212,191,0.2)",
            }}
          >
            Send Another
          </a>
        </div>

        {/* Auto-redirect countdown */}
        <div className="flex items-center gap-2 mt-6">
          {/* Mini countdown ring */}
          <svg width="28" height="28" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r={radius} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="3" />
            <circle
              cx="25"
              cy="25"
              r={radius}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.9s linear" }}
            />
            <text x="25" y="30" textAnchor="middle" fill="#2dd4bf" fontSize="14" fontWeight="bold">
              {countdown}
            </text>
          </svg>
          <span className="text-xs text-slate-500">
            Redirecting to home in <span className="text-slate-400">{countdown}s</span>
          </span>
        </div>
      </div>

      {/* Logo watermark */}
      <div className="mt-10 z-10 opacity-40">
        <Image
          src="/images/PrimeTech_Solutions.png"
          alt="PrimeTech Solutions"
          width={140}
          height={35}
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  );
}