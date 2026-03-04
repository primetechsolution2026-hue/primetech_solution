export interface Highlight {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  coverImage: string;
  gallery: string[];
  tech: string[];
  highlights: Highlight[];
  year: string;
  duration: string;
  liveUrl?: string;
}

export const projects: Record<string, Project> = {
  "logita-heights-hotel": {
    slug: "logita-heights-hotel",
    tag: "Property Management System",
    title: "Logita Heights Hotel fgfg",
    subtitle: "A full-featured hotel PMS built for scale and simplicity.",
    desc: "Built a Property Management System using React.js and Material-UI (MUI). Developed features like Check-in/Check-out, online booking, employee scheduling, payroll, and biometric attendance tracking. Designed responsive UIs, integrated RESTful APIs, and collaborated with backend teams to optimize performance. Delivered a scalable, user-friendly solution that enhanced operational efficiency.",
    coverImage: "/portfolio/pms/dashboard.png",
    gallery: [
      "/portfolio/pms/dashboard.png",
      "/portfolio/pms/Bookings.png",
      "/portfolio/pms/Employe-Shift-schedule.png",
      "/portfolio/pms/Home.png",
      "/portfolio/pms/Room.png",
    ],
    tech: ["React.js", "Material-UI", "Mysql", "RESTful APIs", "Node.js"],
    highlights: [
      { label: "Dashboard Analytics", detail: "Centralized overview of occupancy rates, revenue summaries, booking trends, and staff activity — updated in real time for informed front-desk and management decisions." },
      { label: "Check-in / Check-out", detail: "Streamlined front-desk flows with real-time room status updates." },
      { label: "Employee Scheduling", detail: "Manual / Auto Generate schedule with conflict detection." },
      { label: "Payroll", detail: "Automated payroll computation linked to attendance records." },
      { label: "Biometric Attendance", detail: "Hardware integration for fingerprint-based time tracking." },
    ],
    year: "March 2024",
    duration: "6 months",
    liveUrl: "", // Add link if deployed online, leave empty for local-only
  },

  "PetHaven": {
    slug: "PetHaven",
    tag: "Demo Project",
    title: "PetHaven – Pet Adoption Demo Website",
    subtitle: "A modern UI concept for a pet adoption and pet services platform.",
    desc: "PetHaven is a demo landing page concept for a pet adoption and pet services platform. The design demonstrates how a modern pet marketplace website can present pets available for adoption, categories of animals, and additional services such as grooming, veterinary care, and training. The interface focuses on clean layout, friendly visuals, and easy navigation to help users quickly find their ideal companion. This project is intended for UI/UX demonstration and portfolio purposes only and does not represent a real or functional adoption platform.",
    coverImage: "/portfolio/pethaven/image1.png",
    gallery: [
      "/portfolio/pethaven/image1.png",
      "/portfolio/pethaven/image2.png",
      "/portfolio/pethaven/image3.png",
      "/portfolio/pethaven/image4.png",
    ],
    tech: ["Figma", "UI/UX Design", "Responsive Design", "Next.js", "Tailwind CSS"],
    highlights: [
      {
        label: "Pet Discovery Interface",
        detail: "Designed a user-friendly layout that allows visitors to easily browse pets by categories such as dogs, cats, birds, and small animals."
      },
      {
        label: "Service Integration Concept",
        detail: "Included sections for grooming, veterinary care, and training services to simulate a complete pet-care ecosystem within one platform."
      },
      {
        label: "Featured Pets Showcase",
        detail: "Interactive card-style layout displaying pets available for adoption with key details like breed, age, and vaccination status."
      },
      {
        label: "Clean & Friendly Visual Design",
        detail: "Soft colors, rounded elements, and pet-focused imagery create an approachable and welcoming user experience."
      }
    ],
    year: "2026",
    duration: "Concept Design",
    liveUrl: "https://primetech-pethaven-demo.vercel.app/", 
  },

  "horizon-real-estate": {
    slug: "horizon-real-estate",
    tag: "Corporate Website",
    title: "Horizon Real Estate",
    subtitle: "Complete rebranding and custom CMS development for a luxury property firm.",
    desc: "Complete rebranding and custom CMS development for a luxury property firm.",
    coverImage: "/images/placeholder.png",
    gallery: [
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png"
    ],
    tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Framer Motion"],
    highlights: [
      { label: "Custom CMS", detail: "Fully headless CMS enabling non-technical editors to manage listings." },
      { label: "Brand Redesign", detail: "New visual identity with luxury aesthetics and refined typography." },
    ],
    year: "2023",
    duration: "3 months",
  },

};

// Array export — used by FeaturedWork and any other listing component
export const projectList: Project[] = Object.values(projects);