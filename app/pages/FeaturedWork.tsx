"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./../components/Container";
import { projectList } from "./../work/data/projects";
import type { Project } from "./../work/data/projects";

// ─── Per-card image slider ─────────────────────────────────────────────────────
function CardSlider({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const images = project.gallery;
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setFading(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 150);
    },
    [current]
  );

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    goTo((current - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    goTo((current + 1) % images.length);
  };

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-blue-950">
      {/* Main image */}
      <div
        className="absolute inset-0 transition-opacity duration-150 ease-in-out"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`${project.title} screenshot ${current + 1}`}
          fill
          className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

      {/* Prev / Next arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white text-lg leading-none opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-200 select-none"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white text-lg leading-none opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-200 select-none"
          >
            ›
          </button>
        </>
      )}

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                goTo(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-4 h-1.5 bg-teal-400"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Image count badge */}
      {hasMultiple && (
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-2 py-0.5 text-[10px] text-white/70 font-mono">
          {current + 1}/{images.length}
        </div>
      )}
    </div>
  );
}

// ─── FeaturedWork ──────────────────────────────────────────────────────────────
export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950"
    >
      <div className="absolute -bottom-20 -right-10 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative py-32">
          {/* Heading */}
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              Our Portfolio
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Featured Work
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-200/70">
              Explore some of our recent projects where we've helped clients
              achieve their digital transformation goals.
            </p>
          </div>

          {/* Project cards — sourced from projects.ts */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projectList.map((p) => (
              <article
                key={p.slug}
                className="group overflow-hidden rounded-2xl bg-white/[0.03] border border-blue-600/20 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-950/30 transition-all duration-300"
              >
                {/* Sliding image gallery */}
                <CardSlider project={p} />

                <div className="p-6">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-400">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold text-blue-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-200/65 line-clamp-3">
                    {p.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    {/* Case study page link */}
                    <Link
                      href={`/work/${p.slug}`}
                      className="text-xs font-semibold text-teal-500 group-hover:text-teal-300 transition-colors duration-200"
                    >
                      View Case Study →
                    </Link>

                    {/* Live project link — only renders when liveUrl is a non-empty string */}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-200/40 hover:text-blue-200/70 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View all */}
          <div className="mt-10 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-teal-400 bg-white/[0.04] border border-teal-400/30 backdrop-blur-sm hover:bg-teal-500/10 transition-all duration-200"
            >
              View All Projects →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}