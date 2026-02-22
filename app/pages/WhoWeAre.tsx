import { Container } from "../components/Container";
import Image from "next/image";

export function WhoWeAre() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-48 bg-gradient-to-b from-transparent via-teal-500/50 to-transparent" />

      <Container>
        <div className="grid gap-12 py-32 md:grid-cols-2 md:items-center">

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-teal-400/20 shadow-2xl shadow-blue-950/60">
              <Image
                src="/images/image3.png"
                alt="Who We Are"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3 bg-gradient-to-br from-blue-700 to-teal-500 shadow-lg shadow-teal-900/40">
              <p className="text-xs font-bold text-white">Est. 2018</p>
              <p className="text-xs text-white/75">5+ Years of Excellence</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              About Us
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Who we are
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />

            <p className="mt-5 text-sm leading-relaxed text-blue-200/70">
              PrimeTech Solutions is a full-service web development agency dedicated to
              building scalable, high-performance web solutions that drive real business results.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-blue-200/70">
              Our mission is to empower businesses by providing robust digital
              infrastructure that drives growth and competitive advantage.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "50+", label: "Expert Engineers" },
                { value: "5+", label: "Years of Experience" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-5 bg-white/[0.03] border border-blue-600/20 backdrop-blur-sm"
                >
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-blue-200/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}