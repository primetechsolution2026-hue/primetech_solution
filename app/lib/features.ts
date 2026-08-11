export type FeatureCategory =
  | "Project Type"
  | "Website Type"
  | "Pages"
  | "Design"
  | "CMS"
  | "Event Modules"
  | "Registration & Payments"
  | "Database & Backend"
  | "Authentication & Users"
  | "SEO"
  | "Forms & Leads"
  | "Ecommerce"
  | "Booking"
  | "Hosting & Support";

export type Feature = {
  id: string;
  name: string;
  category: FeatureCategory;
  // one-time setup
  price: number;
  // optional recurring monthly
  monthly?: number;
  // optional notes shown on quote
  note?: string;
};

// Deadline / timeline options. Modeled separately from Feature because
// the price impact is a percentage rush fee on the whole project total,
// not a flat add-on — the tighter the deadline, the more the rush fee
// scales with how much work is actually in the quote.
//
// Duration is expressed as a value + unit so short engagements (weeks)
// and long ones (months/years) can share the same structure instead of
// hardcoding everything in "weeks".
export type TimelineUnit = "week" | "month" | "year";

export type TimelineOption = {
  id: string;
  name: string;
  durationValue: number; // e.g. 6, or 2
  durationUnit: TimelineUnit; // "week" | "month" | "year"
  durationLabel: string; // display range, e.g. "6–8 weeks"
  multiplier: number; // 1 = no rush fee, 1.25 = +25%, etc.
  note: string;
};

export const TIMELINE_OPTIONS: TimelineOption[] = [
  {
    id: "timeline-rush",
    name: "Rush",
    durationValue: 1,
    durationUnit: "week",
    durationLabel: "1–2 weeks",
    multiplier: 1.6,
    note: "A hard deadline with limited scope for changes along the way. Adds a 60% rush fee to cover overtime and compressed testing.",
  },
  {
    id: "timeline-priority",
    name: "Priority",
    durationValue: 3,
    durationUnit: "week",
    durationLabel: "3–4 weeks",
    multiplier: 1.25,
    note: "We move your project ahead of others in the queue. Adds a 25% rush fee to cover the reprioritized schedule.",
  },
  {
    id: "timeline-standard",
    name: "Standard",
    durationValue: 6,
    durationUnit: "week",
    durationLabel: "6–8 weeks",
    multiplier: 1,
    note: "Our normal pace, no rush fee. Best for landing pages, portfolios, and standard marketing sites.",
  },
  {
    id: "timeline-extended",
    name: "Extended",
    durationValue: 2,
    durationUnit: "month",
    durationLabel: "2–3 months",
    multiplier: 1,
    note: "A relaxed pace for mid-size builds — ecommerce, client portals, or sites with a CMS and integrations. No rush fee.",
  },
  {
    id: "timeline-longterm",
    name: "Long-term",
    durationValue: 3,
    durationUnit: "month",
    durationLabel: "3–6 months",
    multiplier: 1,
    note: "Fits web apps, dashboards, or event platforms with multiple modules built and tested in phases. No rush fee.",
  },
  {
    id: "timeline-enterprise",
    name: "Enterprise",
    durationValue: 6,
    durationUnit: "month",
    durationLabel: "6–12 months",
    multiplier: 1,
    note: "For SaaS or membership platforms built and rolled out in stages, with room for feedback cycles between phases. No rush fee.",
  },
  {
    id: "timeline-multiyear",
    name: "Multi-year engagement",
    durationValue: 1,
    durationUnit: "year",
    durationLabel: "1+ year",
    multiplier: 1,
    note: "An ongoing build-and-grow engagement for large platforms, billed and delivered in scoped phases rather than one fixed deadline.",
  },
];

export const DEFAULT_TIMELINE_ID = "timeline-standard";

export const FEATURES: Feature[] = [

  /* ===============================
     PROJECT TYPE
  =============================== */
  {
    id: "proj-website",
    name: "Marketing Website",
    category: "Project Type",
    price: 0,
    note: "A public-facing site that presents your business — pages, content, and forms. No logins or data storage.",
  },
  {
    id: "proj-webapp",
    name: "Web Application / System",
    category: "Project Type",
    price: 35000,
    note: "Includes everything a Marketing Website has, plus a private system people log into — dashboards, bookings, or records. Needs a database.",
  },

  /* ===============================
     WEBSITE TYPE
  =============================== */
  {
    id: "type-landing",
    name: "Landing Page",
    category: "Website Type",
    price: 15000,
    note: "One focused page built to promote a single offer, product, or campaign.",
  },
  {
    id: "type-corp",
    name: "Company / Marketing Website",
    category: "Website Type",
    price: 30000,
    note: "A full multi-page site — home, about, services, contact. The standard business website.",
  },
  {
    id: "type-portfolio",
    name: "Portfolio Website",
    category: "Website Type",
    price: 20000,
    note: "Built to showcase work samples, case studies, or a personal brand.",
  },
  {
    id: "type-ecom",
    name: "Ecommerce Website",
    category: "Website Type",
    price: 55000,
    note: "A store where visitors can browse and buy products. Add Ecommerce features below to complete it.",
  },
  {
    id: "type-webapp",
    name: "Web Application / Dashboard",
    category: "Website Type",
    price: 50000,
    note: "A private tool people log into to manage data — bookings, records, inventory, internal workflows.",
  },
  {
    id: "type-portal",
    name: "Client / Member Portal",
    category: "Website Type",
    price: 40000,
    note: "A members-only area where clients log in to view their own info, documents, or updates.",
  },
  {
    id: "type-saas",
    name: "SaaS / Membership Platform",
    category: "Website Type",
    price: 90000,
    note: "A full product with paid accounts, subscriptions, and ongoing feature development.",
  },
  {
    id: "type-event",
    name: "Event / Conference Website",
    category: "Website Type",
    price: 130000,
    note: "A large, multi-module site for a conference, summit, or event — program, registration, sponsors, and travel info in one place. Add Event Modules and Registration & Payments below to scope it out.",
  },

  /* ===============================
     PAGES
  =============================== */
  {
    id: "pages-5",
    name: "Up to 5 pages",
    category: "Pages",
    price: 0,
    note: "Fits most small business sites — home, about, services, contact, plus one more.",
  },
  {
    id: "pages-10",
    name: "Up to 10 pages",
    category: "Pages",
    price: 9000,
    note: "Room for individual service pages, a blog listing, and more detailed content.",
  },
  {
    id: "pages-20",
    name: "Up to 20 pages",
    category: "Pages",
    price: 20000,
    note: "For larger sites — multiple locations, product lines, or in-depth resource sections.",
  },

  /* ===============================
     DESIGN
  =============================== */
  {
    id: "design-existing",
    name: "I already have a design",
    category: "Design",
    price: 0,
    note: "You provide a finished design or mockup (Figma, XD, screenshots) and we build directly from it — no design phase needed.",
  },
  {
    id: "design-template",
    name: "Template-based design",
    category: "Design",
    price: 0,
    note: "A proven, professional layout customized with your branding, colors, and content. Faster and more affordable.",
  },
  {
    id: "design-custom",
    name: "Custom UI design",
    category: "Design",
    price: 22000,
    note: "A layout designed from scratch around your brand — nothing off-the-shelf.",
  },
  {
    id: "design-figma",
    name: "Figma design file included",
    category: "Design",
    price: 9000,
    note: "You receive an editable design file you own, useful for future updates or a different developer.",
  },

  /* ===============================
     CMS
  =============================== */
  {
    id: "cms-none",
    name: "No CMS (static content)",
    category: "CMS",
    price: 0,
    note: "Content is set during build. Future text or image changes need a developer.",
  },
  {
    id: "cms-integration",
    name: "CMS Integration",
    category: "CMS",
    price: 17000,
    note: "We connect a content system suited to your needs (e.g. WordPress, Sanity, Strapi, or similar) so you can edit text, images, and pages yourself after launch — no coding needed.",
  },
  {
    id: "cms-multilang",
    name: "Multi-language support",
    category: "CMS",
    price: 15000,
    note: "Lets content be published in more than one language (e.g. English + Filipino) with a language switcher.",
  },

  /* ===============================
     EVENT MODULES
     (conference / event website sections — see AIWW-style ToRs)
  =============================== */
  {
    id: "event-about",
    name: "About / Event Overview module",
    category: "Event Modules",
    price: 8000,
    note: "Welcome messages, event overview and theme, organizing committee, co-organizers/partners, and links to past editions.",
  },
  {
    id: "event-program",
    name: "Program & Sessions module",
    category: "Event Modules",
    price: 25000,
    note: "Overall and day-by-day program (filterable), thematic sessions by track, side events, official statements, and field trips with capacity, itinerary, and fee/refund rules.",
  },
  {
    id: "event-exhibition",
    name: "Exhibition & Sponsorship module",
    category: "Event Modules",
    price: 20000,
    note: "Sponsorship and exhibitor packages with tiers and benefits, downloadable kits, and inquiry forms for prospective sponsors/exhibitors.",
  },
  {
    id: "event-venue",
    name: "Venue & Hotel module",
    category: "Event Modules",
    price: 10000,
    note: "Venue details (maps, accessibility, facilities) and an official accommodation listing with booking guidance.",
  },
  {
    id: "event-travel",
    name: "Travel Guide module",
    category: "Event Modules",
    price: 8000,
    note: "Host city guide, visa information, local transport guidance, and safety advisories/FAQs for visiting delegates.",
  },
  {
    id: "event-news",
    name: "News & Announcements module",
    category: "Event Modules",
    price: 9000,
    note: "Category-based announcements with search, archive, and featured posts — for circulars, advisories, and updates.",
  },
  {
    id: "event-downloads",
    name: "Downloads / Resource library",
    category: "Event Modules",
    price: 7000,
    note: "A central library for circulars, advisories, templates, media kits, and policy documents.",
  },
  {
    id: "event-legal",
    name: "Legal & Policy pages",
    category: "Event Modules",
    price: 4000,
    note: "Privacy Policy, Terms of Use, Cookie Notice, and a Refund/Cancellation Policy for registration and paid activities.",
  },
  {
    id: "event-home-extras",
    name: "Homepage extras (countdown, video, slider)",
    category: "Event Modules",
    price: 6000,
    note: "Rotating hero banner, key event stats, latest-announcement cards, a countdown timer, and an embedded highlight video.",
  },

  /* ===============================
     REGISTRATION & PAYMENTS
     (event-style registration systems — more than a simple booking form)
  =============================== */
  {
    id: "reg-multitier",
    name: "Multi-category registration system",
    category: "Registration & Payments",
    price: 30000,
    note: "Configurable participant categories (e.g. Regular, Student, Government, International, Early-bird, Onsite) with automatic fee calculation.",
  },
  {
    id: "reg-addons",
    name: "Optional add-ons at registration",
    category: "Registration & Payments",
    price: 12000,
    note: "Selectable extras during registration — gala dinner, field trips, workshops — with capacity caps and their own pricing.",
  },
  {
    id: "reg-payment-gateway",
    name: "Online payment gateway integration",
    category: "Registration & Payments",
    price: 25000,
    note: "Card payments and/or bank-transfer proof upload, with payment status tracking (Paid / Pending / Failed / Refunded).",
  },
  {
    id: "reg-invoicing",
    name: "Auto invoice, receipt & email confirmation",
    category: "Registration & Payments",
    price: 15000,
    note: "Automatic invoice/acknowledgment generation, a downloadable PDF receipt, and confirmation emails on successful payment.",
  },
  {
    id: "reg-admin-console",
    name: "Registration admin dashboard & reports",
    category: "Registration & Payments",
    price: 28000,
    note: "Back-office dashboard (totals, paid vs unpaid, category breakdown), exportable CSV/Excel reports, and optional badge-data export.",
  },
  {
    id: "reg-refund-policy",
    name: "Refund & cancellation policy engine",
    category: "Registration & Payments",
    price: 10000,
    note: "Date-based deadlines and caps (especially for limited activities like field trips), with configurable admin-fee refund rules.",
  },
  {
    id: "reg-sponsor-portal",
    name: "Sponsor / exhibitor onboarding portal",
    category: "Registration & Payments",
    price: 35000,
    note: "A self-service portal where approved sponsors and exhibitors submit materials, logos, and booth details and track their status.",
  },

  /* ===============================
     DATABASE & BACKEND
  =============================== */
  {
    id: "db-setup",
    name: "Database setup (PostgreSQL / MySQL)",
    category: "Database & Backend",
    price: 20000,
    note: "The storage system behind your site — needed for anything that saves data, like accounts or bookings.",
  },
  {
    id: "db-prisma",
    name: "Prisma ORM integration",
    category: "Database & Backend",
    price: 13000,
    note: "A technical layer that makes your database faster and safer to build on. No visible change for users.",
  },
  {
    id: "api-backend",
    name: "Custom API backend (CRUD endpoints)",
    category: "Database & Backend",
    price: 24000,
    note: "The behind-the-scenes logic that lets your site create, read, update, and delete records.",
  },
  {
    id: "admin-dashboard",
    name: "Admin dashboard / management panel",
    category: "Database & Backend",
    price: 26000,
    note: "A private screen where you or your staff manage content, orders, or users without touching code.",
  },
  {
    id: "file-uploads",
    name: "File uploads (images/documents storage)",
    category: "Database & Backend",
    price: 13000,
    note: "Lets users or admins upload and store files — photos, PDFs, attachments.",
  },
  {
    id: "activity-logs",
    name: "Activity logs & analytics tracking",
    category: "Database & Backend",
    price: 15000,
    note: "Tracks what happens on your site — useful for troubleshooting and understanding usage.",
  },

  /* ===============================
     AUTHENTICATION
  =============================== */
  {
    id: "auth-login",
    name: "User login system",
    category: "Authentication & Users",
    price: 13000,
    note: "Lets people create an account and sign in. The foundation for any members-only area.",
  },
  {
    id: "auth-roles",
    name: "User roles (Admin / Editor / Author)",
    category: "Authentication & Users",
    price: 16000,
    note: "Different people see and can do different things — for example, admins manage everything, editors publish content, authors draft it.",
  },
  {
    id: "auth-social",
    name: "Google / Social login",
    category: "Authentication & Users",
    price: 10000,
    note: "Lets users sign in with an existing Google or social account instead of creating a new password.",
  },
  {
    id: "auth-2fa",
    name: "Two-factor authentication (2FA)",
    category: "Authentication & Users",
    price: 11000,
    note: "Adds a second security step at login, like a code sent to the phone. Recommended for sensitive data.",
  },

  /* ===============================
     SEO
  =============================== */
  {
    id: "seo-basic",
    name: "Basic SEO",
    category: "SEO",
    price: 7000,
    note: "Page titles, descriptions, and technical setup so search engines can find and understand your site.",
  },
  {
    id: "seo-advanced",
    name: "Advanced SEO Optimization",
    category: "SEO",
    price: 16000,
    note: "Deeper keyword research, content structuring, and technical tuning to help you rank higher over time.",
  },

  /* ===============================
     FORMS & LEADS
  =============================== */
  {
    id: "forms-contact",
    name: "Contact form",
    category: "Forms & Leads",
    price: 3000,
    note: "A simple form that emails you when someone reaches out.",
  },
  {
    id: "forms-multistep",
    name: "Multi-step form",
    category: "Forms & Leads",
    price: 10000,
    note: "Breaks a longer form into steps — useful for quotes, applications, or detailed inquiries.",
  },
  {
    id: "leads-crm",
    name: "CRM integration",
    category: "Forms & Leads",
    price: 14000,
    note: "New leads are sent automatically into a CRM you already use, instead of just your inbox.",
  },

  /* ===============================
     ECOMMERCE
  =============================== */
  {
    id: "ecom-payments",
    name: "Payments (Stripe/PayPal)",
    category: "Ecommerce",
    price: 14000,
    note: "Lets customers pay online securely through Stripe or PayPal at checkout.",
  },
  {
    id: "ecom-products-50",
    name: "Product setup up to 50 items",
    category: "Ecommerce",
    price: 10000,
    note: "We add and organize up to 50 products for you, with images, prices, and descriptions.",
  },
  {
    id: "ecom-shipping",
    name: "Shipping configuration",
    category: "Ecommerce",
    price: 8000,
    note: "Sets up shipping rates, zones, and delivery options at checkout.",
  },

  /* ===============================
     BOOKING
  =============================== */
  {
    id: "booking-basic",
    name: "Booking system",
    category: "Booking",
    price: 17000,
    note: "Visitors can view availability and book a time slot or appointment directly on your site.",
  },
  {
    id: "booking-reminders",
    name: "Automated reminders",
    category: "Booking",
    price: 13000,
    note: "Sends automatic email or SMS reminders before a booked appointment, to cut down on no-shows.",
  },

  /* ===============================
     HOSTING & SUPPORT
  =============================== */
  {
    id: "host-vercel",
    name: "Deploy to Vercel",
    category: "Hosting & Support",
    price: 3500,
    note: "We publish your site live on Vercel's hosting so it's accessible on the internet.",
  },
  {
    id: "host-security",
    name: "Security hardening package",
    category: "Hosting & Support",
    price: 15000,
    note: "CAPTCHA, brute-force protection, access logging, and automated backups — a baseline security setup for sites handling personal data.",
  },
  {
    id: "host-ssl",
    name: "SSL certificate & HTTPS setup",
    category: "Hosting & Support",
    price: 3000,
    note: "Encrypted, secure connections for the whole site — required for any site collecting personal or payment data.",
  },
  {
    id: "host-uat",
    name: "Staging environment & UAT support",
    category: "Hosting & Support",
    price: 12000,
    note: "A separate staging site for review, plus structured support running User Acceptance Testing before go-live.",
  },
  {
    id: "host-turnover",
    name: "Turnover documentation & admin training",
    category: "Hosting & Support",
    price: 10000,
    note: "Admin/user guide, site mapping documentation, credentials and plugin handover, and a walkthrough training session for your team.",
  },
  {
    id: "host-warranty-extended",
    name: "Extended warranty (90-day bug-fix coverage)",
    category: "Hosting & Support",
    price: 8000,
    note: "Corrective fixes for defects in what we built, for 90 days after launch — beyond our standard warranty window.",
  },
  {
    id: "maint-basic",
    name: "Maintenance (basic)",
    category: "Hosting & Support",
    price: 0,
    monthly: 3000,
    note: "Monthly monitoring, security updates, and small content edits, so the site keeps running smoothly.",
  },
  {
    id: "maint-pro",
    name: "Maintenance (pro)",
    category: "Hosting & Support",
    price: 0,
    monthly: 6000,
    note: "Everything in basic, plus faster turnaround, more edit requests, and priority support.",
  },
];

export const CATEGORY_ORDER: FeatureCategory[] = [
  "Project Type",
  "Website Type",
  "Pages",
  "Design",
  "CMS",
  "Event Modules",
  "Registration & Payments",
  "Database & Backend",
  "Authentication & Users",
  "SEO",
  "Forms & Leads",
  "Ecommerce",
  "Booking",
  "Hosting & Support",
];