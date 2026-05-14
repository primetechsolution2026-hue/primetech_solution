"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../lib/firebase";
import { Container } from "./Container";

const db = getFirestore(app);

const baseNav = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Team", href: "#team" },
];

const testimonialsLink = { label: "Testimonials", href: "#review" };

export function Navbar() {
  const [hasReviews, setHasReviews] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const snap = await getDocs(collection(db, "reviews"));
        setHasReviews(!snap.empty);
      } catch (e) {
        console.error(e);
      }
    };
    check();
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const nav = hasReviews
    ? [...baseNav.slice(0, 4), testimonialsLink, baseNav[4]]
    : baseNav;

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-teal-500/20 shadow-lg shadow-blue-950/30">
        <Container>
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <div className="flex h-24 items-center">
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/images/PrimeTech_Solutions.png"
                  alt="PrimeTech Solutions Logo"
                  width={240}
                  height={60}
                  priority
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-blue-200/70 hover:text-teal-400 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-teal-500 border border-teal-400/30 shadow-lg shadow-blue-900/40 transition-all duration-200"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile: CTA + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-teal-500 border border-teal-400/30 shadow-lg shadow-blue-900/40 transition-all duration-200"
              >
                Contact Us
              </a>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors"
                style={{ background: menuOpen ? "rgba(45,212,191,0.1)" : "transparent" }}
              >
                {/* Animated hamburger → X */}
                <span
                  className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "#2dd4bf",
                    transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-0.5 w-5 rounded-full transition-all duration-300"
                  style={{
                    background: "#2dd4bf",
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "none",
                  }}
                />
                <span
                  className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "#2dd4bf",
                    transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(1,8,18,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? "420px" : "0px",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <nav
          className="flex flex-col px-6 py-4 gap-1"
          style={{
            background: "rgba(2,11,24,0.98)",
            borderBottom: "1px solid rgba(45,212,191,0.15)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-[15%] right-[15%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)" }}
          />

          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-blue-200/70 hover:text-teal-400 hover:bg-teal-400/5 transition-all duration-200"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(45,212,191,0.5)" }}
              />
              {item.label}
            </a>
          ))}

          <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-teal-500 border border-teal-400/30 transition-all duration-200"
            >
              Contact Us
            </a> 
          </div>
        </nav>
      </div>
    </>
  );
}