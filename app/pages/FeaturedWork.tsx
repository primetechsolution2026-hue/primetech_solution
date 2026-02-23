import { Container } from "../components/Container";
import Image from "next/image";

const projects = [
  { 
    tag: "Property Management System", 
    title: "Logita Heights Hotel", 
    desc: "Built a Property Management System using React.js and Material-UI (MUI). Developed features like Check-in/Check-out, online booking, employee scheduling, payroll, and biometric attendance tracking. Designed responsive UIs, integrated RESTful APIs, and collaborated with backend teams to optimize performance. Delivered a scalable, user-friendly solution that enhanced operational efficiency.", 
    image: "/portfolio/pms/dashboard.png" 
  },
  { 
    tag: "Web Application", 
    title: "FinTrack Analytics", 
    desc: "Real-time financial dashboard processing millions of data points per minute.", 
    image: "/images/work-2.png" 
  },
  { 
    tag: "Corporate Website", 
    title: "Horizon Real Estate", 
    desc: "Complete rebranding and custom CMS development for a luxury property firm.", 
    image: "/images/work-3.png" },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="absolute -bottom-20 -right-10 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative py-32">
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              Our Portfolio
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Featured Work
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-200/70">
              Explore some of our recent projects where we've helped clients achieve their digital transformation goals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-2xl bg-white/[0.03] border border-blue-600/20 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-950/30 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-blue-950">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>

                <div className="p-6">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-400">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 text-base font-extrabold text-blue-50">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-200/65">{p.desc}</p>
                  <div className="mt-4 text-xs font-semibold text-teal-500 group-hover:text-teal-300 transition-colors duration-200">
                    View Case Study →
                  </div>
                </div>
              </article>
            ))}
          </div>

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