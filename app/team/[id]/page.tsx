"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../lib/firebase";

const db = getFirestore(app);

interface Profile {
  id: string;
  fullName: string;
  position: string;
  description: string;
  techStack: string[];
  yearExperience: number;
  profileImageUrl: string;
}

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() } as Profile);
        } else {
          router.push("/");
        }
      } catch (e) {
        console.error("Failed to fetch profile:", e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  // ─── Loading Skeleton ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020b18 0%, #040f1f 40%, #010a15 100%)" }}>

        {/* Orbs */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
        <div className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)" }} />

        <div className="w-full max-w-lg rounded-3xl p-12 flex flex-col items-center gap-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(148,163,184,0.06)" }}>
          <div className="w-32 h-32 rounded-full animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-3/5 h-5 rounded-lg animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-2/5 h-3.5 rounded-lg animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-full h-16 rounded-lg animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020b18 0%, #040f1f 40%, #010a15 100%)" }}>

      {/* Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)" }} />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-10 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:-translate-y-0.5 transition-all duration-200"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(148,163,184,0.12)" }}
      >
        ← Back
      </button>

      {/* Card */}
      <div className="relative w-full max-w-lg rounded-3xl px-10 py-12 text-center overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(148,163,184,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}>

        {/* Top accent */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.5), transparent)" }} />

        {/* Avatar */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Glow */}
          <div className="absolute -inset-1.5 rounded-full blur-xl"
            style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(45,212,191,0.3))" }} />
          {/* Ring */}
          <div className="absolute inset-0 rounded-full p-0.5"
            style={{ background: "linear-gradient(135deg, #38bdf8, #2dd4bf)" }}>
            <div className="relative w-full h-full rounded-full overflow-hidden"
              style={{ background: "#020b18" }}>
              {profile.profileImageUrl ? (
                <Image
                  src={profile.profileImageUrl}
                  alt={profile.fullName}
                  fill
                  className="object-cover object-top rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: "rgba(45,212,191,0.08)" }}>
                  <span className="text-5xl font-bold text-teal-400">
                    {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name & Position */}
        <div className="flex flex-col items-center gap-2.5 mb-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-50">
            {profile.fullName}
          </h1>
          <span className="px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase text-teal-300"
            style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.25)" }}>
            {profile.position}
          </span>
          {profile.yearExperience > 0 && (
            <p className="text-xs text-slate-500">
              {profile.yearExperience} year{profile.yearExperience !== 1 ? "s" : ""} of experience
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-7"
          style={{ background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.1), transparent)" }} />

        {/* About */}
        {profile.description && (
          <div className="text-left mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400 mb-2.5">
              About
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              {profile.description}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        {profile.techStack?.length > 0 && (
          <div className="text-left">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400 mb-2.5">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-[11px] font-medium text-sky-300"
                  style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}