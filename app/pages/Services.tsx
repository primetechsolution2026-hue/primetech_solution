import { Container } from "../components/Container";

const services = [
  { title: "Frontend Development", desc: "Responsive, accessible, and interactive user interfaces using React, Vue, and modern CSS frameworks.", icon: "⌘" },
  { title: "Backend Engineering", desc: "Secure, scalable, and high-performance server architectures using Node.js, Python, and scalable databases.", icon: "⛭" },
  { title: "E-Commerce Solutions", desc: "Custom online stores and headless commerce setups optimized for conversion and seamless checkout.", icon: "🛒" },
  { title: "Progressive Web Apps", desc: "App-like experiences in the browser that work offline and engage users with push notifications.", icon: "⬚" },
  { title: "Cloud Infrastructure", desc: "Cloud migration, DevOps, and reliable hosting setups on AWS, Google Cloud, and Azure.", icon: "☁" },
  { title: "UI/UX Design", desc: "User-centered design processes that result in intuitive and visually stunning digital products.", icon: "✦" },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-96 rounded-full bg-blue-800/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative py-32">
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              What We Do
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Our Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-200/70">
              Comprehensive web development solutions tailored to your unique business needs.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl p-6 bg-white/[0.03] border border-blue-600/20 backdrop-blur-sm hover:border-teal-500/40 hover:bg-teal-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl text-lg bg-blue-600/15 border border-blue-500/25 text-blue-300 group-hover:bg-teal-500/15 group-hover:border-teal-500/30 group-hover:text-teal-400 transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-blue-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-200/65">{s.desc}</p>
                <div className="mt-5 text-xs font-semibold text-blue-400 group-hover:text-teal-400 transition-colors duration-200">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}