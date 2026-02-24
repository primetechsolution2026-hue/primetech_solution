"use client";

import { Container } from "../components/Container";
import Image from "next/image";

const team = [
  { name: "Al Fritz", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Andrew Lantajo Llosa", role: "Sr. Wordpress Developer", image: "/team/user2.png" },
  { name: "Eduardo Macabacyao Jr.", role: "Sr. BackEnd Developer", image: "/team/user1.png" },
  { name: "Jake Rosales", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Joshua L. Bague", role: "Sr. Fullstack Developer", image: "/team/user2.png" },
  { name: "Jovino Monterde", role: "FrontEnd Developer", image: "/team/jovs.png" },
  { name: "Marco Pantonial", role: "Sr. BackEnd Developer", image: "/team/user1.png" },
  { name: "Mark Gulbin Nim", role: "Wordpress Developer", image: "/team/MarkNim.png" },
  { name: "Mark Kim", role: "Fullstack Developer", image: "/team/user2.png" },
  { name: "Nening B.", role: "Quality Assurance (QA)", image: "/team/user3.png" },
];

export function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #020b18 0%, #040f1f 40%, #010a15 100%)",
      }}
    >
      {/* Background decorative radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(14,165,233,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 90%, rgba(20,184,166,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scoped CSS for hover effects */}
      <style>{`
        .team-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(148,163,184,0.08);
          backdrop-filter: blur(12px);
          transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease;
        }
        .team-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(45,212,191,0.25);
          transform: translateY(-5px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(45,212,191,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .team-card .accent-line {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .team-card:hover .accent-line {
          opacity: 1;
        }
        .team-card .avatar-glow {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .team-card:hover .avatar-glow {
          opacity: 1;
        }
      `}</style>

      <Container>
        <div className="relative max-w-[1200px] mx-auto py-28 lg:py-36">

          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/70" />
              <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase"
                style={{ color: "#2dd4bf" }}
              >
                Our People
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/70" />
            </div>

            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
              style={{
                color: "#f0f9ff",
                letterSpacing: "-0.02em",
              }}
            >
              Meet the{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #2dd4bf 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Team
              </span>
            </h2>

            <p
              className="mx-auto mt-5 max-w-xl text-sm leading-relaxed"
              style={{ color: "rgba(148,163,184,0.75)" }}
            >
              A dedicated group of engineers and specialists committed to building
              exceptional digital products with care and craftsmanship.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {team.map((member) => (
              <div key={member.name} className="group relative">
                <div className="team-card relative rounded-2xl p-5 text-center cursor-default">

                  {/* Top hover accent line */}
                  <div
                    className="accent-line absolute top-0 left-8 right-8 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(45,212,191,0.6), transparent)",
                    }}
                  />

                  {/* Avatar */}
                  <div className="relative mx-auto mb-4" style={{ width: 80, height: 80 }}>
                    {/* Glow behind avatar on hover */}
                    <div
                      className="avatar-glow absolute -inset-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(45,212,191,0.4))",
                        filter: "blur(7px)",
                      }}
                    />
                    {/* Gradient border ring */}
                    <div
                      className="absolute inset-0 rounded-full p-[1.5px]"
                      style={{
                        background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
                      }}
                    >
                      <div
                        className="relative h-full w-full rounded-full overflow-hidden"
                        style={{ background: "#020b18" }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-xs font-bold leading-snug"
                    style={{ color: "#e0f2fe", letterSpacing: "0.01em" }}
                  >
                    {member.name}
                  </h3>

                  {/* Role badge */}
                  <div className="mt-2 flex justify-center">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wide uppercase"
                      style={{
                        background: "rgba(45,212,191,0.08)",
                        border: "1px solid rgba(45,212,191,0.2)",
                        color: "#5eead4",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom count indicator */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700" />
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(100,116,139,0.7)" }}
            >
              {team.length} specialists
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700" />
          </div>

        </div>
      </Container>
    </section>
  );
}