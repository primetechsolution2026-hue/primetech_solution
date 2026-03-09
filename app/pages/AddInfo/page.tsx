"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../../../lib/firebase";

const db = getFirestore(app);

// ✅ NO Firebase Storage imports needed anymore

const TECH_OPTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Python", "Flutter", "React Native", "Vue.js", "Angular",
  "Laravel", "PHP", "MySQL", "PostgreSQL", "MongoDB", "Hubspot",
  "Firebase", "AWS", "Docker", "Git", "Figma", "WordPress", "Webflow",
  "Tailwind CSS", "GraphQL", "REST API", "Redux", "Swift",
];

interface FormData {
  fullName: string;
  position: string;
  description: string;
  techStack: string[];
  yearExperience: string;
}

interface Profile extends FormData {
  id: string;
  profileImageUrl: string;
}

const emptyForm: FormData = {
  fullName: "",
  position: "",
  description: "",
  techStack: [],
  yearExperience: "",
};

// ─── Upload via Next.js API route ─────────────────────────────────────────────
// Local dev : saves to /public/uploads/ → served as /uploads/filename.jpg
// Vercel    : saves to Vercel Blob      → served as https://...vercel-storage.com/...
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Upload failed");
  }

  const data = await res.json();
  return data.url;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProfileModal({
  editTarget,
  onClose,
  onSaved,
}: {
  editTarget: Profile | null;
  onClose: () => void;
  onSaved: (profile: Profile) => void;
}) {
  const isEdit = !!editTarget;
  const [form, setForm] = useState<FormData>(
    editTarget
      ? {
          fullName: editTarget.fullName,
          position: editTarget.position,
          description: editTarget.description,
          techStack: editTarget.techStack,
          yearExperience: editTarget.yearExperience,
        }
      : emptyForm
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(editTarget?.profileImageUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const update = (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleTech = (tech: string) =>
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.position) {
      setError("Full Name and Position are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let profileImageUrl = editTarget?.profileImageUrl ?? "";

      if (imageFile) {
        profileImageUrl = await uploadImage(imageFile);
      }

      if (isEdit && editTarget) {
        await updateDoc(doc(db, "profiles", editTarget.id), {
          fullName: form.fullName,
          position: form.position,
          description: form.description,
          techStack: form.techStack,
          yearExperience: Number(form.yearExperience),
          profileImageUrl,
          updatedAt: serverTimestamp(),
        });
        onSaved({ ...form, id: editTarget.id, profileImageUrl });
      } else {
        const docRef = await addDoc(collection(db, "profiles"), {
          fullName: form.fullName,
          position: form.position,
          description: form.description,
          techStack: form.techStack,
          yearExperience: Number(form.yearExperience),
          profileImageUrl,
          createdAt: serverTimestamp(),
        });
        onSaved({ ...form, id: docRef.id, profileImageUrl });
      }
    } catch (e: unknown) {
      console.error("Save error:", e);
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(`Failed to save: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(1,8,18,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl px-8 py-10"
        style={{
          background: "rgba(4,15,31,0.98)",
          border: "1px solid rgba(148,163,184,0.1)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        }}
      >
        <div className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.6), transparent)" }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition text-sm"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(148,163,184,0.1)" }}
        >✕</button>

        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-teal-400/70" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-400">Admin Panel</span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-teal-400/70" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-sky-50">
            {isEdit ? "Edit Profile" : "Add Profile"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isEdit ? "Update the developer information" : "Fill in the developer information"}
          </p>
        </div>

        <div className="flex flex-col items-center mb-7 gap-3">
          <div
            className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer overflow-visible"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <div className="absolute -inset-1.5 rounded-full blur-lg"
                  style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(45,212,191,0.3))" }} />
                <div className="absolute inset-0 rounded-full p-0.5"
                  style={{ background: "linear-gradient(135deg, #38bdf8, #2dd4bf)" }}>
                  <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#020b18" }}>
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
                  style={{ background: "rgba(2,11,24,0.65)" }}>
                  <span className="text-[10px] text-teal-300 font-semibold">Change</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1"
                style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(45,212,191,0.2)" }}>
                <span className="text-xl text-teal-400/40">+</span>
                <span className="text-[9px] text-teal-400/40 font-medium tracking-wide">Photo</span>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {imagePreview && (
            <button onClick={() => fileInputRef.current?.click()}
              className="px-4 py-1 rounded-lg text-xs text-teal-400 transition hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(45,212,191,0.2)", background: "transparent" }}>
              Change Photo
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Full Name <span className="text-teal-400 inline">*</span>
            <input
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.1)" }}
              placeholder="e.g. John Dela Cruz"
              value={form.fullName}
              onChange={update("fullName")}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Position <span className="text-teal-400 inline">*</span>
            <input
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.1)" }}
              placeholder="e.g. Full Stack Developer"
              value={form.position}
              onChange={update("position")}
            />
          </label>

          <label className="col-span-2 flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Years of Experience
            <input
              type="number" min={0} max={50}
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.1)" }}
              placeholder="e.g. 3"
              value={form.yearExperience}
              onChange={update("yearExperience")}
            />
          </label>

          <label className="col-span-2 flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Description
            <textarea
              rows={3}
              maxLength={300}
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.1)" }}
              placeholder="Brief description about this developer..."
              value={form.description}
              onChange={update("description")}
            />
            <span className="text-right text-[11px] text-slate-600">{form.description.length}/300</span>
          </label>

          <div className="col-span-2 flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-400">
              Tech Stack <span className="text-teal-400 font-normal">({form.techStack.length} selected)</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TECH_OPTIONS.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition hover:-translate-y-0.5 ${
                    form.techStack.includes(tech) ? "text-teal-300" : "text-slate-500 hover:text-slate-400"
                  }`}
                  style={
                    form.techStack.includes(tech)
                      ? { background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.3)" }
                      : { background: "transparent", border: "1px solid rgba(148,163,184,0.1)" }
                  }
                >{tech}</button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400 rounded-xl px-4 py-2.5"
            style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide text-[#020b18] transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)", boxShadow: "0 4px 24px rgba(45,212,191,0.2)" }}
        >
          {loading
            ? (isEdit ? "Saving changes..." : "Saving...")
            : (isEdit ? "Save Changes →" : "Save Profile →")}
        </button>
      </div>
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────
function ProfileCard({
  profile,
  onEdit,
  onDelete,
}: {
  profile: Profile;
  onEdit: (p: Profile) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(148,163,184,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.35), transparent)" }} />

      <div className="p-5 flex flex-col items-center text-center gap-3 flex-1">
        <div className="relative w-20 h-20 flex-shrink-0">
          {profile.profileImageUrl ? (
            <>
              <div className="absolute -inset-1 rounded-full blur-md"
                style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(45,212,191,0.25))" }} />
              <div className="absolute inset-0 rounded-full p-0.5"
                style={{ background: "linear-gradient(135deg, #38bdf8, #2dd4bf)" }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#020b18" }}>
                  <img src={profile.profileImageUrl} alt={profile.fullName}
                    className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-teal-400"
              style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)" }}>
              {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-sky-50 leading-tight">{profile.fullName}</h3>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-teal-400/80">{profile.position}</span>
          {profile.yearExperience && (
            <span className="text-[11px] text-slate-500">
              {profile.yearExperience} yr{Number(profile.yearExperience) !== 1 ? "s" : ""} exp
            </span>
          )}
        </div>

        {profile.description && (
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{profile.description}</p>
        )}

        {profile.techStack.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-auto pt-1">
            {profile.techStack.slice(0, 4).map(t => (
              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium text-sky-400"
                style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.12)" }}>
                {t}
              </span>
            ))}
            {profile.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-500"
                style={{ background: "rgba(148,163,184,0.04)", border: "1px solid rgba(148,163,184,0.1)" }}>
                +{profile.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex border-t" style={{ borderColor: "rgba(148,163,184,0.08)" }}>
        <button
          onClick={() => onEdit(profile)}
          className="flex-1 py-2.5 text-[11px] font-semibold text-slate-400 hover:text-teal-300 transition"
          style={{ borderRight: "1px solid rgba(148,163,184,0.08)" }}
        >Edit</button>

        {confirmDelete ? (
          <div className="flex flex-1">
            <button
              onClick={() => onDelete(profile.id)}
              className="flex-1 py-2.5 text-[11px] font-semibold text-red-400 hover:text-red-300 transition"
              style={{ borderRight: "1px solid rgba(148,163,184,0.08)" }}
            >Confirm</button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 py-2.5 text-[11px] font-semibold text-slate-500 hover:text-slate-400 transition"
            >Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 py-2.5 text-[11px] font-semibold text-slate-500 hover:text-red-400 transition"
          >Delete</button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AddInfo() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data: Profile[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            fullName: raw.fullName ?? "",
            position: raw.position ?? "",
            description: raw.description ?? "",
            techStack: Array.isArray(raw.techStack) ? raw.techStack : [],
            yearExperience: raw.yearExperience?.toString() ?? "",
            profileImageUrl: raw.profileImageUrl ?? "",
          };
        });
        setProfiles(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProfiles(false);
      }
    };
    fetchProfiles();
  }, []);

  const openAdd = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (profile: Profile) => { setEditTarget(profile); setModalOpen(true); };

  const handleSaved = (saved: Profile) => {
    setProfiles((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      if (exists) return prev.map((p) => (p.id === saved.id ? saved : p));
      return [saved, ...prev];
    });
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "profiles", id));
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020b18 0%, #040f1f 40%, #010a15 100%)" }}>

      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />
      <div className="fixed bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(20,184,166,0.05) 0%, transparent 70%)" }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-teal-400/70" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-400">Admin Panel</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-sky-50">Developer Profiles</h1>
            <p className="text-sm text-slate-500 mt-1.5">
              {loadingProfiles
                ? "Loading..."
                : `${profiles.length} profile${profiles.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide text-[#020b18] transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)", boxShadow: "0 4px 20px rgba(45,212,191,0.25)" }}
          >
            <span className="text-base leading-none">+</span> Add Profile
          </button>
        </div>

        <div className="mb-8 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.2), transparent)" }} />

        {loadingProfiles ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" />
            <span className="text-sm text-slate-500">Loading profiles...</span>
          </div>
        ) : profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)" }}>
              👤
            </div>
            <p className="text-slate-500 text-sm">No profiles yet. Add the first one!</p>
            <button onClick={openAdd}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#020b18] transition hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)", boxShadow: "0 4px 20px rgba(45,212,191,0.2)" }}>
              + Add Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <ProfileModal
          editTarget={editTarget}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}