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
    title: "Logita Heights Hotel",
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
      { label: "Check-in / Check-out", detail: "Streamlined front-desk flows with real-time room status updates." },
      { label: "Online Booking", detail: "Direct booking engine with availability calendar and payment gateway." },
      { label: "Employee Scheduling", detail: "Drag-and-drop shift planner with conflict detection." },
      { label: "Payroll Integration", detail: "Automated payroll computation linked to attendance records." },
      { label: "Biometric Attendance", detail: "Hardware integration for fingerprint-based time tracking." },
    ],
    year: "March 2024",
    duration: "6 months",
    liveUrl: "", // Add link if deployed online, leave empty for local-only
  },

  "fintrack-analytics": {
    slug: "fintrack-analytics",
    tag: "Web Application",
    title: "FinTrack Analytics",
    subtitle: "Real-time financial dashboard processing millions of data points per minute.",
    desc: "Real-time financial dashboard processing millions of data points per minute.",
    coverImage: "/images/work-2.png",
    gallery: ["/images/work-2.png"],
    tech: ["React.js", "D3.js", "WebSockets", "TypeScript"],
    highlights: [
      { label: "Real-time Data", detail: "Streaming millions of data points per minute via WebSockets." },
      { label: "Interactive Charts", detail: "Custom D3 visualizations for portfolio analytics." },
    ],
    year: "2023",
    duration: "4 months",
  },

  "horizon-real-estate": {
    slug: "horizon-real-estate",
    tag: "Corporate Website",
    title: "Horizon Real Estate",
    subtitle: "Complete rebranding and custom CMS development for a luxury property firm.",
    desc: "Complete rebranding and custom CMS development for a luxury property firm.",
    coverImage: "/images/work-3.png",
    gallery: ["/images/work-3.png"],
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