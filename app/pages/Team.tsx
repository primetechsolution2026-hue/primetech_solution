import { Container } from "../components/Container";
import Image from "next/image";

const team = [
  { name: "Jovino Monterde", role: "FrontEnd Developer", image: "/team/jovs.png" },
  { name: "Jake Rosales", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Al Fritz", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Mark Kim", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Eduardo Macabacyao Jr.", role: "Sr. BackEnd Developer", image: "/team/user1.png" },
  { name: "Marco Pantonial", role: "Sr. BackEnd Developer", image: "/team/user1.png" },
  { name: "Josuer L. Bague", role: "Sr. Fullstack Developer", image: "/team/user2.png" },
  { name: "Mark Gulbin Nim", role: "Wordpress Developer", image: "/team/MarkNim.png" },
  { name: "Nening B.", role: "Quality Assurance (QA)", image: "/team/user3.png" },
];

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-96 rounded-full bg-blue-800/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative max-w-[1100px] mx-auto py-32">
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 mb-3">
              Our People
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-50 sm:text-3xl lg:text-4xl">
              Meet the Team
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-200/70">
              Our diverse team of experts is passionate about creating exceptional digital experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {team.map((m) => (
              <div
                key={m.name}
                className="group rounded-2xl p-5 text-center bg-white/[0.03] border border-blue-600/20 backdrop-blur-sm hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-950/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative mx-auto h-32 w-32">
                  {/* Gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-700 to-teal-400 p-0.5">
                    <div className="h-full w-full rounded-full overflow-hidden">
                      <Image src={m.image} alt={m.name} fill className="object-cover rounded-full" />
                    </div>
                  </div>
                </div>

                <h3 className="mt-4 text-sm font-extrabold text-blue-50">{m.name}</h3>
                <p className="mt-1 text-xs font-medium text-teal-400">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}