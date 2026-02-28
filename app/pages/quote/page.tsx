// C:\xampp\htdocs\prime_source\app\pages\quote\page.tsx
import QuoteBuilder from "../../components/QuoteBuilder";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#060d2e] font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07102d] via-[#0a1845] to-[#060d2e] py-20 px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#0d1a45] border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Website Quotation Tool
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Build Your Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Website Package
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Select the features your business needs and get a transparent,
            real-time cost estimate for your next digital project.
          </p>

          <div className="flex justify-center gap-12">
            {[
              { value: "150+", label: "Projects" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <QuoteBuilder />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1a2d6b] py-8 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} PrimeTech Solutions · All rights reserved
      </footer>
    </div>
  );
}