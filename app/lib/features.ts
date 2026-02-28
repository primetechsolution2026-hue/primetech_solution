export type FeatureCategory =
  | "Project Type"
  | "Website Type"
  | "Pages"
  | "Design"
  | "CMS"
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

export const FEATURES: Feature[] = [

  /* ===============================
     PROJECT TYPE
  =============================== */
  {
    id: "proj-website",
    name: "Marketing Website",
    category: "Project Type",
    price: 0,
    note: "Standard business website",
  },
  {
    id: "proj-webapp",
    name: "Web Application / System",
    category: "Project Type",
    price: 25000,
    note: "Dashboard, automation, or SaaS system",
  },

  /* ===============================
     WEBSITE TYPE
  =============================== */
  { id: "type-landing", name: "Landing Page", category: "Website Type", price: 12000 },
  { id: "type-corp", name: "Company / Marketing Website", category: "Website Type", price: 25000 },
  { id: "type-portfolio", name: "Portfolio Website", category: "Website Type", price: 18000 },
  { id: "type-ecom", name: "Ecommerce Website", category: "Website Type", price: 45000 },

  /* ===============================
     PAGES
  =============================== */
  { id: "pages-5", name: "Up to 5 pages", category: "Pages", price: 0, note: "Included baseline" },
  { id: "pages-10", name: "Up to 10 pages", category: "Pages", price: 8000 },
  { id: "pages-20", name: "Up to 20 pages", category: "Pages", price: 18000 },

  /* ===============================
     DESIGN
  =============================== */
  { id: "design-template", name: "Template-based design", category: "Design", price: 0 },
  { id: "design-custom", name: "Custom UI design", category: "Design", price: 15000 },
  { id: "design-figma", name: "Figma design file included", category: "Design", price: 8000 },

  /* ===============================
     CMS
  =============================== */
  { id: "cms-none", name: "No CMS (static content)", category: "CMS", price: 0 },
  { id: "cms-sanity", name: "Sanity CMS integration", category: "CMS", price: 14000 },
  { id: "cms-strapi", name: "Strapi CMS integration", category: "CMS", price: 16000 },

  /* ===============================
     DATABASE & BACKEND (NEW)
  =============================== */
  {
    id: "db-setup",
    name: "Database setup (PostgreSQL / MySQL)",
    category: "Database & Backend",
    price: 18000,
    note: "Tables, schema, relations",
  },
  {
    id: "db-prisma",
    name: "Prisma ORM integration",
    category: "Database & Backend",
    price: 12000,
  },
  {
    id: "api-backend",
    name: "Custom API backend (CRUD endpoints)",
    category: "Database & Backend",
    price: 20000,
  },
  {
    id: "admin-dashboard",
    name: "Admin dashboard / management panel",
    category: "Database & Backend",
    price: 22000,
  },
  {
    id: "file-uploads",
    name: "File uploads (images/documents storage)",
    category: "Database & Backend",
    price: 12000,
  },
  {
    id: "activity-logs",
    name: "Activity logs & analytics tracking",
    category: "Database & Backend",
    price: 14000,
  },

  /* ===============================
     AUTHENTICATION (NEW)
  =============================== */
  {
    id: "auth-login",
    name: "User login system",
    category: "Authentication & Users",
    price: 12000,
  },
  {
    id: "auth-roles",
    name: "User roles (Admin / Staff / Client)",
    category: "Authentication & Users",
    price: 15000,
  },
  {
    id: "auth-social",
    name: "Google / Social login",
    category: "Authentication & Users",
    price: 9000,
  },
  {
    id: "auth-2fa",
    name: "Two-factor authentication (2FA)",
    category: "Authentication & Users",
    price: 10000,
  },

  /* ===============================
     SEO
  =============================== */
  { id: "seo-basic", name: "Basic SEO", category: "SEO", price: 6000 },
  { id: "seo-advanced", name: "Advanced SEO Optimization", category: "SEO", price: 14000 },

  /* ===============================
     FORMS & LEADS
  =============================== */
  { id: "forms-contact", name: "Contact form", category: "Forms & Leads", price: 2500 },
  { id: "forms-multistep", name: "Multi-step form", category: "Forms & Leads", price: 9000 },
  { id: "leads-crm", name: "CRM integration", category: "Forms & Leads", price: 12000 },

  /* ===============================
     ECOMMERCE
  =============================== */
  { id: "ecom-payments", name: "Payments (Stripe/PayPal)", category: "Ecommerce", price: 12000 },
  { id: "ecom-products-50", name: "Product setup up to 50 items", category: "Ecommerce", price: 8000 },
  { id: "ecom-shipping", name: "Shipping configuration", category: "Ecommerce", price: 7000 },

  /* ===============================
     BOOKING
  =============================== */
  { id: "booking-basic", name: "Booking system", category: "Booking", price: 15000 },
  { id: "booking-reminders", name: "Automated reminders", category: "Booking", price: 12000 },

  /* ===============================
     HOSTING & SUPPORT
  =============================== */
  { id: "host-vercel", name: "Deploy to Vercel", category: "Hosting & Support", price: 3000 },
  { id: "maint-basic", name: "Maintenance (basic)", category: "Hosting & Support", price: 0, monthly: 2500 },
  { id: "maint-pro", name: "Maintenance (pro)", category: "Hosting & Support", price: 0, monthly: 6000 },
];

export const CATEGORY_ORDER: FeatureCategory[] = [
  "Project Type",
  "Website Type",
  "Pages",
  "Design",
  "CMS",
  "Database & Backend",
  "Authentication & Users",
  "SEO",
  "Forms & Leads",
  "Ecommerce",
  "Booking",
  "Hosting & Support",
];