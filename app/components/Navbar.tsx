import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

const nav = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-teal-500/20 shadow-lg shadow-blue-950/30">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex h-24 items-center">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/PrimeTech_Solutions.png"
                alt="PrimeTech Solutions Logo"
                width={240}
                height={60}
                priority
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-blue-200/70 hover:text-teal-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden text-sm font-medium text-blue-200/70 hover:text-teal-400 transition-colors duration-200 sm:inline"
            >
              Contact Us
            </a>

            {/* ✅ Changed: now navigates to the quotation page */}
            <Link
              href="/pages/quote"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-teal-500 border border-teal-400/30 shadow-lg shadow-blue-900/40 transition-all duration-200"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}