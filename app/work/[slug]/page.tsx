"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Container } from "./../../components/Container";
import { projects } from "../data/projects";

// ─── Fullscreen Gallery ────────────────────────────────────────────────────────
function FullscreenGallery({
  images, startIndex, onClose,
}: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 180);
  }, [current]);

  const prev = useCallback(() => goTo((current - 1 + images.length) % images.length), [current, images.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % images.length), [current, images.length, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const thumbsRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const active = node.children[current] as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [current]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/96 backdrop-blur-md">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <span className="text-sm text-white/40 font-mono tabular-nums">{current + 1} / {images.length}</span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-150"
          aria-label="Close gallery"
        >
          <span className="hidden sm:inline tracking-wide">Close</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 hover:border-white/50 text-base leading-none">✕</span>
        </button>
      </div>

      {/* Main image area */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 px-14 sm:px-20">
        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white text-2xl hover:border-white/50 hover:bg-white/10 transition-all duration-200 select-none"
          aria-label="Previous image"
        >
          ‹
        </button>

        <div
          className="relative w-full h-full max-w-8xl mx-auto transition-opacity duration-[180ms] ease-in-out"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <Image
            key={current}
            src={images[current]}
            alt={`Gallery image ${current + 1}`}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="100vw"
            priority
          />
        </div>

        <button
          onClick={next}
          className="absolute right-3 sm:right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white text-2xl hover:border-white/50 hover:bg-white/10 transition-all duration-200 select-none"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 py-4 px-4">
          <div
            ref={thumbsRef}
            className="flex gap-2.5 justify-center overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                  i === current
                    ? "border-teal-400 w-24 h-16 opacity-100 scale-105 shadow-lg shadow-teal-500/20"
                    : "border-white/10 w-20 h-14 opacity-40 hover:opacity-75 hover:border-white/30"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                {i === current && (
                  <div className="absolute inset-0 ring-1 ring-inset ring-teal-400/40 rounded-lg pointer-events-none" />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 justify-center mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? "w-4 h-1.5 bg-teal-400" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const project = projects[slug];

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-blue-200/60 text-lg">Project not found.</p>
          <button onClick={() => router.back()} className="mt-4 text-teal-400 hover:underline text-sm">
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {galleryOpen && (
        <FullscreenGallery
          images={project.gallery}
          startIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-950 text-blue-50">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
          <Container>
            <div className="pt-16 pb-10">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-1.5 text-sm text-blue-200/50 hover:text-teal-400 transition-colors duration-200 mb-8"
              >
                ← Back to Work
              </button>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
                    {project.tag}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                    {project.title}
                  </h1>
                  <p className="mt-4 text-base text-blue-200/60 leading-relaxed max-w-lg">
                    {project.desc}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { label: "Year", value: project.year },
                      { label: "Duration", value: project.duration },
                    ].map((m) => (
                      <div key={m.label} className="border border-blue-600/20 rounded-xl p-4 bg-white/[0.02]">
                        <p className="text-xs text-blue-200/40 uppercase tracking-widest">{m.label}</p>
                        <p className="mt-1 text-sm font-semibold text-blue-50">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="text-xs text-blue-200/40 uppercase tracking-widest mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Live project button */}
                  {project.liveUrl && (
                    <div className="mt-8">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30 transition-all duration-200 group"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Project
                        <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">→</span>
                      </a>
                    </div>
                  )}

                </div>

                <div
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-blue-600/20 cursor-zoom-in group"
                  onClick={() => openGallery(0)}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-xs text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    View fullscreen
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Gallery ── */}
        {project.gallery.length > 1 && (
          <section className="py-12 border-t border-blue-600/10">
            <Container>
              <p className="text-xs text-blue-200/40 uppercase tracking-widest mb-5">Screenshots</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden border border-blue-600/20 cursor-zoom-in group"
                    onClick={() => openGallery(i)}
                  >
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-teal-500/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-sm">⤢</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Overview ── */}
        <section className="py-12 border-t border-blue-600/10">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs text-blue-200/40 uppercase tracking-widest mb-3">Overview</p>
                <p className="text-base text-blue-200/70 leading-relaxed">{project.desc}</p>
              </div>
              <div>
                <p className="text-xs text-blue-200/40 uppercase tracking-widest mb-4">Key Features</p>
                <ul className="space-y-4">
                  {project.highlights.map((h) => (
                    <li key={h.label} className="flex gap-4">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400 mt-2" />
                      <div>
                        <p className="text-sm font-semibold text-blue-50">{h.label}</p>
                        <p className="text-sm text-blue-200/55 leading-relaxed mt-0.5">{h.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Footer nav ── */}
        <section className="py-12 border-t border-blue-600/10">
          <Container>
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm text-blue-200/50 hover:text-teal-400 transition-colors"
              >
                ← Back to Portfolio
              </button>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-teal-400 bg-white/[0.04] border border-teal-400/30 hover:bg-teal-500/10 transition-all duration-200"
              >
                View All Projects →
              </a>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}