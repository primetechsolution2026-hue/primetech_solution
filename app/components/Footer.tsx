import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 border-t border-blue-600/20">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/PrimeTech_Solutions.png"
                alt="PrimeTech Solutions Logo"
                width={280}
                height={80}
                priority
                className="h-40 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-sm text-blue-200/55">
              Crafting digital excellence through innovative web development and design solutions.
            </p>
            <div className="mt-5 flex gap-3">
              {[["T", "Twitter"], ["G", "GitHub"], ["L", "LinkedIn"]].map(([letter, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg text-xs font-bold bg-white/[0.04] border border-blue-600/20 text-blue-300/60 hover:border-teal-400/40 hover:text-teal-400 transition-all duration-200"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Company",
              links: [{ label: "About Us", href: "#about" }, { label: "Careers", href: "#" }, { label: "Our Team", href: "#team" }, { label: "Contact", href: "#contact" }],
            },
            {
              title: "Services",
              links: [{ label: "Web Development", href: "#services" }, { label: "E-Commerce", href: "#services" }, { label: "UI/UX Design", href: "#services" }, { label: "Cloud Architecture", href: "#services" }],
            },
            {
              title: "Legal",
              links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Cookie Policy", href: "#" }],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-bold tracking-widest uppercase text-teal-400">{title}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-blue-200/55 hover:text-teal-400 transition-colors duration-200">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-blue-600/15 py-6 text-sm text-blue-200/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} PrimeTech Solutions. All rights reserved.</p>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-700 to-teal-400" />
        </div>
      </Container>
    </footer>
  );
}