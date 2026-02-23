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

"coming-soon": {
    slug: "coming-soon",
    tag: "Coming Soon",
    title: "Coming Soon",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    coverImage: "/images/placeholder.png",
    gallery: [
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png"
    ],
    tech: ["Lorem", "Ipsum", "Dolor", "Sit"],
    highlights: [
      { label: "Lorem Ipsum", detail: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium." },
      { label: "Dolor Sit Amet", detail: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit." },
    ],
    year: "2024",
    duration: "TBD",
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