"use client";

import { useState } from "react";
import { Container } from "../components/Container";

const FORMINIT_URL = "https://forminit.com/f/uog2j2wjhdb";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMINIT_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-teal-400/50" />
      <div className="absolute -bottom-20 -left-10 w-[500px] h-96 rounded-full bg-blue-800/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative grid gap-10 py-24 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              Let's Connect
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Get in Touch
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
            <p className="mt-4 max-w-md text-sm text-blue-200/70">
              Ready to start your next project? Fill out the form, or reach out to us directly using the information below.
            </p>

            <div className="mt-10 space-y-4">
              {[
                {
                  label: "Email Us",
                  lines: [
                    "primetechsolutions.contact@gmail.com",
                    "primetechsolutions.support@gmail.com",
                  ],
                  icon: "✉️",
                },
                {
                  label: "Call Us",
                  lines: ["09109903325", "Monday–Sunday, 9am–11pm"],
                  icon: "📞",
                },
              ].map(({ label, lines, icon }) => (
                <div
                  key={label}
                  className="flex gap-4 rounded-xl p-4 bg-white/[0.03] border border-blue-600/15"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm bg-teal-500/10 border border-teal-500/25">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1 text-teal-400">{label}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-blue-200/70">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl p-7 bg-white/[0.03] border border-blue-600/20 backdrop-blur-md shadow-xl shadow-blue-950/30">
            <h3 className="text-base font-bold mb-6 text-blue-50">Send us a message</h3>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-teal-500/15 border border-teal-400/30 text-2xl">
                  ✅
                </div>
                <p className="text-base font-semibold text-blue-50">Message sent!</p>
                <p className="text-sm text-blue-200/60">
                  Thanks for reaching out — we'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="text-xs font-semibold text-blue-200/80">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fi-sender-fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="senderEmail" className="text-xs font-semibold text-blue-200/80">
                    Email Address
                  </label>
                  <input
                    id="senderEmail"
                    name="fi-sender-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="textMessage" className="text-xs font-semibold text-blue-200/80">
                    Project Details
                  </label>
                  <textarea
                    id="textMessage"
                    name="fi-text-message"
                    required
                    placeholder="Tell us about your project goals, timeline, and budget..."
                    className="mt-1.5 min-h-[120px] w-full resize-none rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <p className="rounded-lg px-3 py-2 text-xs text-red-300 bg-red-500/10 border border-red-500/20">
                    ⚠️ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 via-blue-600 to-teal-500 border border-teal-400/20 shadow-lg shadow-blue-900/40 hover:shadow-teal-900/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {status === "loading" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}