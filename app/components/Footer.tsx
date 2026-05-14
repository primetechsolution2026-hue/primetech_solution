"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container } from "./Container";

// ── Legal content ─────────────────────────────────────────────────────────────
const LEGAL_CONTENT = {
  "Privacy Policy": {
    effectiveDate: "May 14, 2026",
    sections: [
      {
        title: "Introduction",
        body: "Welcome to PrimeTech Solutions. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, services, and related platforms. By accessing or using our services, you agree to the practices described in this Privacy Policy.",
      },
      {
        title: "1. Information We Collect",
        body: null,
        subsections: [
          {
            subtitle: "Personal Information",
            items: [
              "Full name",
              "Email address",
              "Phone number",
              "Company name",
              "Billing information",
              "Project requirements and communications",
            ],
          },
          {
            subtitle: "Technical Information",
            items: [
              "IP address",
              "Browser type",
              "Device information",
              "Operating system",
              "Pages visited",
              "Referring URLs",
              "Usage analytics",
            ],
          },
          {
            subtitle: "Cookies and Tracking Technologies",
            items: [
              "Improve website functionality",
              "Analyze traffic and usage",
              "Remember user preferences",
              "Enhance security and performance",
            ],
          },
        ],
      },
      {
        title: "2. How We Use Your Information",
        body: "We use collected information to:",
        bullets: [
          "Provide and manage our services",
          "Communicate with clients and prospects",
          "Respond to inquiries and support requests",
          "Improve website functionality and user experience",
          "Maintain security and prevent fraud",
          "Comply with legal obligations",
          "Send service-related updates and marketing communications (where permitted)",
        ],
      },
      {
        title: "3. Sharing of Information",
        body: "We do not sell personal information. We may share information with trusted third-party providers including cloud hosting providers, payment processors, analytics providers, CRM and customer support platforms, and email delivery services. These providers are only permitted to use information as necessary to provide services on our behalf. We may also disclose information when required by law, to protect our legal rights, or to prevent fraud or security threats.",
      },
      {
        title: "4. Data Security",
        body: "We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, or disclosure. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
      {
        title: "5. Data Retention",
        body: "We retain personal information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
      },
      {
        title: "6. Your Rights",
        body: "Depending on your jurisdiction, you may have rights to access your personal information, correct inaccurate information, request deletion of your information, object to certain processing activities, and withdraw consent where applicable. To exercise these rights, contact us using the details below.",
      },
      {
        title: "7. Third-Party Services",
        body: "Our website or services may contain links or integrations with third-party platforms such as payment gateways, analytics tools, CRM systems, and social media platforms. We are not responsible for the privacy practices of third-party services.",
      },
      {
        title: "8. Children's Privacy",
        body: "Our services are not directed to individuals under the age of 13, and we do not knowingly collect personal information from children.",
      },
      {
        title: "9. Changes to This Privacy Policy",
        body: "We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised effective date.",
      },
      {
        title: "10. Contact Us",
        body: "If you have questions about this Privacy Policy or our data practices, contact us at: primetechsolutions.contact@gmail.com or primetechsolutions.support@gmail.com",
      },
    ],
  },

  "Terms of Service": {
    effectiveDate: "May 14, 2026",
    sections: [
      {
        title: "Introduction",
        body: "These Terms of Service govern your access to and use of services provided by PrimeTech Solutions. By using our website or services, you agree to these Terms.",
      },
      {
        title: "1. Services",
        body: "PrimeTech Solutions provides web development and related digital services, including Frontend Development, Backend Engineering, CRM Development and Integration, Website Development, Software Consulting, and Maintenance and Support. Service scope, timelines, pricing, and deliverables will be defined in separate agreements or project proposals.",
      },
      {
        title: "2. Client Responsibilities",
        body: "Clients agree to provide accurate project requirements, supply necessary content and materials, respond to requests in a timely manner, and ensure they have rights to materials they provide. Delays caused by missing information or approvals may affect project timelines.",
      },
      {
        title: "3. Payments",
        body: "Payment terms will be specified in project agreements or invoices. Failure to pay may result in suspension of services, delayed delivery, or termination of agreements. All fees are non-refundable unless otherwise agreed in writing.",
      },
      {
        title: "4. Intellectual Property",
        body: "Unless otherwise agreed: clients retain ownership of their original content and trademarks; PrimeTech Solutions retains ownership of proprietary tools, frameworks, and internal systems; final project ownership transfers upon full payment. We reserve the right to showcase completed projects in our portfolio unless restricted by written agreement.",
      },
      {
        title: "5. Acceptable Use",
        body: "You agree not to use our services to violate laws or regulations, distribute malicious software, engage in fraud or abuse, infringe intellectual property rights, or disrupt systems or networks. We may suspend or terminate services for violations.",
      },
      {
        title: "6. Third-Party Services",
        body: "Projects may integrate third-party services or software. PrimeTech Solutions is not responsible for third-party outages, policy changes, pricing changes, or security issues originating from third parties.",
      },
      {
        title: "7. Limitation of Liability",
        body: "To the maximum extent permitted by law, PrimeTech Solutions shall not be liable for indirect or consequential damages, loss of profits or revenue, business interruption, or data loss. Our total liability shall not exceed the amount paid for the relevant services.",
      },
      {
        title: "8. Warranties Disclaimer",
        body: 'Services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee uninterrupted service, error-free operation, or specific business outcomes.',
      },
      {
        title: "9. Termination",
        body: "Either party may terminate services according to agreed project terms. Upon termination, outstanding balances become immediately due, access to certain services may be revoked, and completed work may be withheld until payment is settled.",
      },
      {
        title: "10. Changes to Terms",
        body: "We may update these Terms at any time. Continued use of our services after updates constitutes acceptance of revised Terms.",
      },
      {
        title: "11. Governing Law",
        body: "These Terms shall be governed by the laws of the Republic of the Philippines, without regard to conflict of law principles.",
      },
      {
        title: "12. Contact Information",
        body: "PrimeTech Solutions | Email: primetechsolutions.contact@gmail.com or primetechsolutions.support@gmail.com",
      },
    ],
  },
} as const;

type LegalKey = keyof typeof LEGAL_CONTENT;

// ── Section type helpers ──────────────────────────────────────────────────────
type Subsection = { subtitle: string; items: readonly string[] };

type Section = {
  title: string;
  body?: string | null;
  bullets?: readonly string[];
  subsections?: readonly Subsection[];
};

// ── LegalModal ────────────────────────────────────────────────────────────────
function LegalModal({ title, onClose }: { title: LegalKey; onClose: () => void }) {
  const { effectiveDate, sections } = LEGAL_CONTENT[title];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-900 border border-blue-600/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-blue-600/20 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-xs text-blue-200/50 mt-0.5">Effective Date: {effectiveDate}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg text-blue-300/60 hover:text-teal-400 hover:bg-white/[0.05] transition-all duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        {/* Scrollable body */}
        <div
          className="overflow-y-auto px-6 py-6 space-y-6"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.scrollbarColor =
              "rgba(45,212,191,0.3) transparent";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.scrollbarColor =
              "transparent transparent";
          }}
        >
          {(sections as readonly Section[]).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold tracking-wide text-teal-400 mb-2">
                {section.title}
              </h3>

              {section.body && (
                <p className="text-sm text-blue-200/70 leading-relaxed">{section.body}</p>
              )}

              {section.bullets && (
                <ul className="mt-2 space-y-1">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-blue-200/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.subsections && (
                <div className="mt-2 space-y-4">
                  {section.subsections.map((sub) => (
                    <div key={sub.subtitle}>
                      <p className="text-xs font-semibold text-blue-300/80 mb-1.5 uppercase tracking-wider">
                        {sub.subtitle}
                      </p>
                      <ul className="space-y-1">
                        {sub.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-blue-200/70">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-blue-600/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const [activeModal, setActiveModal] = useState<LegalKey | null>(null);

  const isLegalLabel = (label: string): label is LegalKey =>
    label === "Privacy Policy" || label === "Terms of Service";

  return (
    <>
      {activeModal && (
        <LegalModal title={activeModal} onClose={() => setActiveModal(null)} />
      )}

      <footer className="relative overflow-hidden bg-slate-950 border-t border-blue-600/20">
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
                links: [
                  { label: "About Us", href: "#about" },
                  { label: "Careers", href: "#" },
                  { label: "Our Team", href: "#team" },
                  { label: "Contact", href: "#contact" },
                ],
              },
              {
                title: "Services",
                links: [
                  { label: "Web Development", href: "#services" },
                  { label: "E-Commerce", href: "#services" },
                  { label: "UI/UX Design", href: "#services" },
                  { label: "Cloud Architecture", href: "#services" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-xs font-bold tracking-widest uppercase text-teal-400">{title}</p>
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      {isLegalLabel(label) ? (
                        <button
                          onClick={() => setActiveModal(label)}
                          className="text-sm text-blue-200/55 hover:text-teal-400 transition-colors duration-200 text-left"
                        >
                          {label}
                        </button>
                      ) : (
                        <a
                          href={href}
                          className="text-sm text-blue-200/55 hover:text-teal-400 transition-colors duration-200"
                        >
                          {label}
                        </a>
                      )}
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
    </>
  );
}