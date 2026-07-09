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

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  nameOrCompany: string;
  description: string;
  rating: number;
}

interface Review extends FormData {
  id: string;
  profileImageUrl: string;
}

const emptyForm: FormData = {
  nameOrCompany: "",
  description: "",
  rating: 5,
};

// ─── Upload via Next.js API route ─────────────────────────────────────────────
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

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [hovered, setHovered] = useState(0);

  const sizeMap = { sm: 14, md: 22, lg: 28 };
  const px = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            style={{
              background: "none",
              border: "none",
              padding: 1,
              cursor: readonly ? "default" : "pointer",
              lineHeight: 1,
            }}
          >
            <svg
              width={px}
              height={px}
              viewBox="0 0 24 24"
              fill={filled ? "#fbbf24" : "none"}
              stroke={filled ? "#fbbf24" : "rgba(148,163,184,0.3)"}
              strokeWidth="1.8"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ReviewModal({
  editTarget,
  onClose,
  onSaved,
}: {
  editTarget: Review | null;
  onClose: () => void;
  onSaved: (review: Review) => void;
}) {
  const isEdit = !!editTarget;
  const [form, setForm] = useState<FormData>(
    editTarget
      ? {
          nameOrCompany: editTarget.nameOrCompany,
          description: editTarget.description,
          rating: editTarget.rating,
        }
      : emptyForm
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    editTarget?.profileImageUrl ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const update =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.nameOrCompany) {
      setError("Name or Company is required.");
      return;
    }
    if (!form.description) {
      setError("Review description is required.");
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
        await updateDoc(doc(db, "reviews", editTarget.id), {
          nameOrCompany: form.nameOrCompany,
          description: form.description,
          rating: form.rating,
          profileImageUrl,
          updatedAt: serverTimestamp(),
        });
        onSaved({ ...form, id: editTarget.id, profileImageUrl });
      } else {
        const docRef = await addDoc(collection(db, "reviews"), {
          nameOrCompany: form.nameOrCompany,
          description: form.description,
          rating: form.rating,
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl px-8 py-10"
        style={{
          background: "rgba(4,15,31,0.98)",
          border: "1px solid rgba(148,163,184,0.1)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        }}
      >
        {/* Top border accent */}
        <div
          className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(45,212,191,0.6), transparent)",
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition text-sm"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(148,163,184,0.1)",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-teal-400/70" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-400">
              Client Review
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-teal-400/70" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-sky-50">
            {isEdit ? "Edit Review" : "Add Review"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isEdit
              ? "Update the client review"
              : "Fill in the client's information"}
          </p>
        </div>

        {/* Avatar upload */}
        <div className="flex flex-col items-center mb-7 gap-3">
          <div
            className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer overflow-visible"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <div
                  className="absolute -inset-1.5 rounded-full blur-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(45,212,191,0.3))",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full p-0.5"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{ background: "#020b18" }}
                  >
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
                  style={{ background: "rgba(2,11,24,0.65)" }}
                >
                  <span className="text-[10px] text-teal-300 font-semibold">
                    Change
                  </span>
                </div>
              </>
            ) : (
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "2px dashed rgba(45,212,191,0.2)",
                }}
              >
                <span className="text-xl text-teal-400/40">+</span>
                <span className="text-[9px] text-teal-400/40 font-medium tracking-wide">
                  Photo
                </span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-1 rounded-lg text-xs text-teal-400 transition hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(45,212,191,0.2)",
                background: "transparent",
              }}
            >
              Change Photo
            </button>
          )}
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Full Name or Company{" "}
            <span className="text-teal-400 inline">*</span>
            <input
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
              placeholder="e.g. Jane Smith or Acme Corp"
              value={form.nameOrCompany}
              onChange={update("nameOrCompany")}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
            Review <span className="text-teal-400 inline">*</span>
            <textarea
              rows={4}
              maxLength={500}
              className="w-full px-3.5 py-3 rounded-xl text-sm text-sky-100 placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
              placeholder="What did the client say about working with you?"
              value={form.description}
              onChange={update("description")}
            />
            <span className="text-right text-[11px] text-slate-600">
              {form.description.length}/500
            </span>
          </label>

          {/* Star rating */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-slate-400">Rating</span>
            <div
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            >
              <StarRating
                value={form.rating}
                onChange={(v) => setForm((prev) => ({ ...prev, rating: v }))}
                size="lg"
              />
              <span className="text-sm text-amber-400 font-semibold ml-1">
                {form.rating} / 5
              </span>
            </div>
          </div>
        </div>

        {error && (
          <p
            className="mt-4 text-center text-sm text-red-400 rounded-xl px-4 py-2.5"
            style={{
              background: "rgba(248,113,113,0.06)",
              border: "1px solid rgba(248,113,113,0.15)",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide text-[#020b18] transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)",
            boxShadow: "0 4px 24px rgba(45,212,191,0.2)",
          }}
        >
          {loading
            ? isEdit
              ? "Saving changes..."
              : "Saving..."
            : isEdit
            ? "Save Changes →"
            : "Save Review →"}
        </button>
      </div>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({
  review,
  onEdit,
  onDelete,
}: {
  review: Review;
  onEdit: (r: Review) => void;
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(45,212,191,0.35), transparent)",
        }}
      />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Avatar + name row */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            {review.profileImageUrl ? (
              <>
                <div
                  className="absolute -inset-0.5 rounded-full blur-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(45,212,191,0.3))",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full p-0.5"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{ background: "#020b18" }}
                  >
                    <img
                      src={review.profileImageUrl}
                      alt={review.nameOrCompany}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-lg font-bold text-teal-400"
                style={{
                  background: "rgba(45,212,191,0.08)",
                  border: "1px solid rgba(45,212,191,0.2)",
                }}
              >
                {review.nameOrCompany?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-bold text-sky-50 leading-tight truncate">
              {review.nameOrCompany}
            </h3>
            <StarRating value={review.rating} readonly size="sm" />
          </div>
        </div>

        {/* Decorative quote mark */}
        <div
          className="text-3xl leading-none font-serif"
          style={{ color: "rgba(45,212,191,0.2)" }}
        >
          "
        </div>

        <p className="text-[12px] text-slate-400 leading-relaxed -mt-2 line-clamp-4">
          {review.description}
        </p>

        {/* Rating badge */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-400"
            style={{
              background: "rgba(251,191,36,0.07)",
              border: "1px solid rgba(251,191,36,0.15)",
            }}
          >
            ★ {review.rating}.0
          </span>
        </div>
      </div>

      <div
        className="flex border-t"
        style={{ borderColor: "rgba(148,163,184,0.08)" }}
      >
        <button
          onClick={() => onEdit(review)}
          className="flex-1 py-2.5 text-[11px] font-semibold text-slate-400 hover:text-teal-300 transition"
          style={{ borderRight: "1px solid rgba(148,163,184,0.08)" }}
        >
          Edit
        </button>

        {confirmDelete ? (
          <div className="flex flex-1">
            <button
              onClick={() => onDelete(review.id)}
              className="flex-1 py-2.5 text-[11px] font-semibold text-red-400 hover:text-red-300 transition"
              style={{ borderRight: "1px solid rgba(148,163,184,0.08)" }}
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 py-2.5 text-[11px] font-semibold text-slate-500 hover:text-slate-400 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 py-2.5 text-[11px] font-semibold text-slate-500 hover:text-red-400 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Average Stars Display ────────────────────────────────────────────────────
function AverageRating({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;

  return (
    <div className="flex items-center gap-3">
      <StarRating value={Math.round(avg)} readonly size="sm" />
      <span className="text-sm font-bold text-amber-400">{rounded}</span>
      <span className="text-xs text-slate-500">
        ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AddReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const data: Review[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            nameOrCompany: raw.nameOrCompany ?? "",
            description: raw.description ?? "",
            rating: raw.rating ?? 5,
            profileImageUrl: raw.profileImageUrl ?? "",
          };
        });
        setReviews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };
  const openEdit = (review: Review) => {
    setEditTarget(review);
    setModalOpen(true);
  };

  const handleSaved = (saved: Review) => {
    setReviews((prev) => {
      const exists = prev.find((r) => r.id === saved.id);
      if (exists) return prev.map((r) => (r.id === saved.id ? saved : r));
      return [saved, ...prev];
    });
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #020b18 0%, #040f1f 40%, #010a15 100%)",
      }}
    >
      {/* Background effects */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(14,165,233,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(20,184,166,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-teal-400/70" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-400">
                Admin Panel
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-sky-50">
              Client Reviews
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              <p className="text-sm text-slate-500">
                {loadingReviews
                  ? "Loading..."
                  : `${reviews.length} review${reviews.length !== 1 ? "s" : ""} found`}
              </p>
              {!loadingReviews && <AverageRating reviews={reviews} />}
            </div>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide text-[#020b18] transition hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)",
              boxShadow: "0 4px 20px rgba(45,212,191,0.25)",
            }}
          >
            <span className="text-base leading-none">+</span> Add Review
          </button>
        </div>

        <div
          className="mb-8 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(45,212,191,0.2), transparent)",
          }}
        />

        {loadingReviews ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" />
            <span className="text-sm text-slate-500">Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: "rgba(45,212,191,0.06)",
                border: "1px solid rgba(45,212,191,0.15)",
              }}
            >
              ⭐
            </div>
            <p className="text-slate-500 text-sm">
              No reviews yet. Add the first one!
            </p>
            <button
              onClick={openAdd}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#020b18] transition hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #2dd4bf)",
                boxShadow: "0 4px 20px rgba(45,212,191,0.2)",
              }}
            >
              + Add Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <ReviewModal
          editTarget={editTarget}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}