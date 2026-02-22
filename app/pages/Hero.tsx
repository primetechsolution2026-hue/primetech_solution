import Image from "next/image";
import { Container } from "../components/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,123,190,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(46,123,190,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      {/* Ambient glows */}
      <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-36">
          <div>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-400 tracking-widest">
              ✦ PrimeTech Solutions
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-blue-50 sm:text-5xl lg:text-6xl leading-tight">
              Building digital{" "}
              <br className="hidden sm:block" />
              experiences{" "}
              <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                that matter
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-200/70">
              We design, develop, and deploy world-class web applications for
              startups and enterprises. Transform your business with cutting-edge
              technology.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 via-blue-600 to-teal-500 border border-teal-400/20 shadow-lg shadow-blue-900/50 hover:shadow-teal-900/40 transition-all duration-200"
              >
                Start a Project →
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-teal-400 bg-white/5 border border-teal-400/25 backdrop-blur-sm hover:bg-teal-500/10 transition-all duration-200"
              >
                View Our Work
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[["150+", "Projects"], ["99%", "Satisfaction"], ["24/7", "Support"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-xl font-extrabold text-teal-400">{num}</p>
                  <p className="text-xs text-blue-200/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-teal-400/20 shadow-2xl shadow-blue-950/60">
              <Image
                src="/images/image2.png"
                alt="Hero Image"
                fill
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none" />
              <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}