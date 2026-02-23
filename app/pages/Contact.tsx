import { Container } from "../components/Container";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-teal-400/50" />
      <div className="absolute -bottom-20 -left-10 w-[500px] h-96 rounded-full bg-blue-800/10 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative grid gap-10 py-24 lg:grid-cols-2 lg:items-start">
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
                { label: "Visit Us", lines: ["1200 Innovation Drive", "San Francisco, CA 94103"], icon: "📍" },
                { label: "Email Us", lines: ["primetechsolution2026@gmail.com", "support@primetech.solutions"], icon: "✉️" },
                { label: "Call Us", lines: ["+1 (555) 123-4567", "Mon–Fri, 9am–6pm PST"], icon: "📞" },
              ].map(({ label, lines, icon }) => (
                <div key={label} className="flex gap-4 rounded-xl p-4 bg-white/[0.03] border border-blue-600/15">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm bg-teal-500/10 border border-teal-500/25">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1 text-teal-400">{label}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-blue-200/70">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-7 bg-white/[0.03] border border-blue-600/20 backdrop-blur-md shadow-xl shadow-blue-950/30">
            <h3 className="text-base font-bold mb-6 text-blue-50">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-blue-200/80">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-blue-200/80">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-blue-200/80">Project Details</label>
                <textarea
                  placeholder="Tell us about your project goals, timeline, and budget..."
                  className="mt-1.5 min-h-[120px] w-full resize-none rounded-lg px-3 py-2.5 text-sm bg-white/5 border border-blue-600/25 text-blue-50 placeholder:text-blue-300/30 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/10 transition-all duration-200"
                />
              </div>
              <button
                type="button"
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 via-blue-600 to-teal-500 border border-teal-400/20 shadow-lg shadow-blue-900/40 hover:shadow-teal-900/40 transition-all duration-200"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}