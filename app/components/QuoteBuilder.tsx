// C:\xampp\htdocs\PrimeTech Solutions\prime-tech-quotation\app\components\QuoteBuilder.tsx

"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_ORDER,
  DEFAULT_TIMELINE_ID,
  FEATURES,
  Feature,
  FeatureCategory,
  TIMELINE_OPTIONS,
} from "./../lib/features";
import { computeTotals } from "./../lib/pricing";

function formatPHP(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}

const SINGLE_SELECT: FeatureCategory[] = ["Website Type", "Pages", "Design", "CMS"];

const CATEGORY_ICONS: Record<string, string> = {
  "Website Type": "🌐",
  "Pages": "📄",
  "Design": "🎨",
  "CMS": "⚙️",
  "SEO": "🔍",
  "Maintenance": "🔧",
  "Integrations": "🔗",
  "E-Commerce": "🛒",
  "Project Type": "🧭",
  "Event Modules": "🎪",
  "Registration & Payments": "💳",
  "Database & Backend": "🗄️",
  "Authentication & Users": "🔐",
  "Forms & Leads": "✉️",
  "Ecommerce": "🛒",
  "Booking": "📅",
  "Hosting & Support": "🔧",
};

// Plain-language framing for each category so a non-technical client
// understands what they're picking and why it affects the price.
const CATEGORY_HELP: Record<string, string> = {
  "Project Type": "Are we building a marketing website, or a fuller web app / system?",
  "Website Type": "What kind of site or system is this?",
  "Pages": "Roughly how many pages will you need?",
  "Design": "How should it look — a proven template, or something designed from scratch?",
  "CMS": "Will you need to edit content yourself after launch?",
  "Event Modules": "Which sections does your event or conference site need?",
  "Registration & Payments": "Do attendees need to register and pay online?",
  "Database & Backend": "Do you need to store and manage data — listings, records, submissions?",
  "Authentication & Users": "Will people log in, or have different levels of access?",
  "SEO": "How much help do you want showing up in search results?",
  "Forms & Leads": "How do visitors reach you, and where should those leads go?",
  "Ecommerce": "Are you selling products online?",
  "Booking": "Do people need to book appointments or time slots?",
  "Hosting & Support": "Who keeps the site running after launch?",
};

// The flow: required decisions first (one at a time), then timeline,
// then optional add-ons grouped together, then a final review.
type StepDef =
  | { kind: "category"; category: FeatureCategory; title: string }
  | { kind: "timeline" }
  | { kind: "addons" }
  | { kind: "review" };

const STEPS: StepDef[] = [
  { kind: "category", category: "Project Type", title: "What are we building?" },
  { kind: "category", category: "Website Type", title: "What kind of site?" },
  { kind: "category", category: "Pages", title: "How many pages?" },
  { kind: "category", category: "Design", title: "What kind of design?" },
  { kind: "category", category: "CMS", title: "Content management" },
  { kind: "timeline" },
  { kind: "addons" },
  { kind: "review" },
];

const ADDON_CATEGORIES: FeatureCategory[] = [
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

const STEP_LABELS = ["Project", "Type", "Pages", "Design", "CMS", "Timeline", "Add-ons", "Review"];

export default function QuoteBuilder() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(["proj-website", "type-corp", "pages-5", "design-existing", "cms-none", "seo-basic"])
  );
  const [timelineId, setTimelineId] = useState<string>(DEFAULT_TIMELINE_ID);
  const [stepIndex, setStepIndex] = useState(0);
  const [openAddon, setOpenAddon] = useState<FeatureCategory | null>("Event Modules");

  const selectedFeatures = useMemo(
    () => FEATURES.filter((f) => selectedIds.has(f.id)),
    [selectedIds]
  );
  const selectedTimeline = useMemo(
    () => TIMELINE_OPTIONS.find((t) => t.id === timelineId) ?? TIMELINE_OPTIONS[0],
    [timelineId]
  );
  const totals = useMemo(
    () => computeTotals(selectedFeatures, selectedTimeline),
    [selectedFeatures, selectedTimeline]
  );

  const grouped = useMemo(() => {
    const map = new Map<FeatureCategory, Feature[]>();
    for (const cat of CATEGORY_ORDER) map.set(cat, []);
    for (const f of FEATURES) map.get(f.category)?.push(f);
    return map;
  }, []);

  function onToggle(feature: Feature) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const isSingle = SINGLE_SELECT.includes(feature.category) || feature.category === "Project Type";
      if (next.has(feature.id)) {
        // Single-select categories always need exactly one answer —
        // clicking the active choice again shouldn't clear it.
        if (isSingle) return prev;
        next.delete(feature.id);
        return next;
      }
      if (isSingle) {
        for (const f of FEATURES) if (f.category === feature.category) next.delete(f.id);
      }
      next.add(feature.id);
      return next;
    });
  }

  function reset() {
    setSelectedIds(
      new Set(["proj-website", "type-corp", "pages-5", "design-existing", "cms-none", "seo-basic"])
    );
    setTimelineId(DEFAULT_TIMELINE_ID);
    setStepIndex(0);
  }

  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  function addonCount(cat: FeatureCategory) {
    return grouped.get(cat)?.filter((f) => selectedIds.has(f.id)).length ?? 0;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">

      {/* ── LEFT: Guided flow ── */}
      <section className="bg-[#0a1535] border border-[#1a2d6b] rounded-2xl overflow-hidden shadow-xl shadow-blue-950/50">
        {/* Header + progress */}
        <div className="px-6 py-5 border-b border-[#1a2d6b] bg-[#0d1a45]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-lg tracking-tight">Build your quote</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs font-semibold text-slate-400 hover:text-cyan-400 border border-[#1a2d6b] hover:border-cyan-500/50 px-4 py-2 rounded-lg transition-all duration-200 uppercase tracking-wider"
            >
              Start over
            </button>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStepIndex(i)}
                className={`h-1.5 flex-1 rounded-full transition-all duration-200 ${
                  i === stepIndex
                    ? "bg-cyan-400"
                    : i < stepIndex
                    ? "bg-cyan-800"
                    : "bg-[#1a2d6b]"
                }`}
                aria-label={`Go to step ${i + 1}: ${STEP_LABELS[i]}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                className={`text-[10px] uppercase tracking-wider ${
                  i === stepIndex ? "text-cyan-400 font-semibold" : "text-slate-600"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Step body */}
        <div className="px-6 py-6 min-h-[360px]">
          {step.kind === "category" && (
            <CategoryStep
              category={step.category}
              title={step.title}
              items={grouped.get(step.category) ?? []}
              selectedIds={selectedIds}
              onToggle={onToggle}
              isSingle={SINGLE_SELECT.includes(step.category) || step.category === "Project Type"}
              icon={CATEGORY_ICONS[step.category] ?? "◆"}
            />
          )}

          {step.kind === "timeline" && (
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-xl leading-none">⏱️</span>
                <h3 className="text-white font-bold text-xl tracking-tight">What's your deadline?</h3>
              </div>
              <p className="text-slate-400 text-sm mb-5">
                Tighter timelines take priority over other work and cost more as a result. Longer,
                multi-month or multi-year engagements don't cost more — they just fit bigger projects.
              </p>

              <div className="grid gap-2.5">
                {TIMELINE_OPTIONS.map((t) => {
                  const checked = t.id === timelineId;
                  const pct = Math.round((t.multiplier - 1) * 100);
                  return (
                    <label
                      key={t.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
                        ${checked
                          ? "border-cyan-500/60 bg-cyan-500/[0.07] shadow-sm shadow-cyan-500/10"
                          : "border-[#1a2d6b] bg-[#0d1a45]/50 hover:border-blue-500/40 hover:bg-[#0d1a45]"
                        }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        checked={checked}
                        onChange={() => setTimelineId(t.id)}
                        className="mt-0.5 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className={`text-sm font-medium ${checked ? "text-white" : "text-slate-300"}`}>
                            {t.name} <span className="text-slate-500 font-normal">· {t.durationLabel}</span>
                          </span>
                          <span className={`text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
                            pct === 0 ? "text-teal-400" : "text-slate-200"
                          }`}>
                            {pct === 0 ? "No rush fee" : `+${pct}% rush fee`}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{t.note}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step.kind === "addons" && (
            <div>
              <h3 className="text-white font-bold text-xl tracking-tight mb-1">Anything else you need?</h3>
              <p className="text-slate-400 text-sm mb-5">
                These are optional. Open a section only if it applies to your project — skip the rest.
              </p>
              <div className="space-y-2.5">
                {ADDON_CATEGORIES.map((cat) => {
                  const items = grouped.get(cat) ?? [];
                  const count = addonCount(cat);
                  const isOpen = openAddon === cat;
                  return (
                    <div
                      key={cat}
                      className="border border-[#1a2d6b] rounded-xl overflow-hidden bg-[#0d1a45]/50"
                    >
                      <button
                        onClick={() => setOpenAddon(isOpen ? null : cat)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base leading-none flex-shrink-0">
                            {CATEGORY_ICONS[cat] ?? "◆"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm">{cat}</p>
                            <p className="text-slate-500 text-xs mt-0.5 truncate">
                              {CATEGORY_HELP[cat]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                          {count > 0 && (
                            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                              {count} added
                            </span>
                          )}
                          <span
                            className={`text-slate-500 text-sm transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▾
                          </span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 grid gap-2.5">
                          {items.map((f) => {
                            const checked = selectedIds.has(f.id);
                            const hasMonthly = (f.monthly ?? 0) > 0;
                            return (
                              <label
                                key={f.id}
                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                                  ${checked
                                    ? "border-cyan-500/60 bg-cyan-500/[0.07]"
                                    : "border-[#1a2d6b] bg-[#0a1535] hover:border-blue-500/40"
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => onToggle(f)}
                                  className="mt-0.5 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline justify-between gap-3">
                                    <span className={`text-sm font-medium ${checked ? "text-white" : "text-slate-300"}`}>
                                      {f.name}
                                    </span>
                                    <span className="text-sm font-semibold whitespace-nowrap flex-shrink-0 text-slate-200">
                                      {f.price > 0 ? `+${formatPHP(f.price)}` : ""}
                                      {hasMonthly ? `${f.price > 0 ? " + " : ""}${formatPHP(f.monthly!)}/mo` : ""}
                                    </span>
                                  </div>
                                  {f.note && (
                                    <p className="text-xs text-slate-500 mt-1 leading-snug">{f.note}</p>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step.kind === "review" && (
            <div>
              <h3 className="text-white font-bold text-xl tracking-tight mb-1">Review your quote</h3>
              <p className="text-slate-400 text-sm mb-5">
                Here's everything you've selected. Go back to any step to change something.
              </p>
              <ul className="space-y-2.5">
                {selectedFeatures.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-[#111f4d]">
                    <div className="min-w-0">
                      <span className="text-slate-300 text-sm">{f.name}</span>
                      <span className="text-slate-600 text-xs ml-2">{f.category}</span>
                    </div>
                    <span className="text-slate-400 text-xs whitespace-nowrap flex-shrink-0">
                      {f.price > 0 ? `+${formatPHP(f.price)}` : ""}
                      {(f.monthly ?? 0) > 0 ? ` +${formatPHP(f.monthly!)}/mo` : ""}
                      {f.price === 0 && (f.monthly ?? 0) === 0 ? "Included" : ""}
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 py-1.5 border-b border-[#111f4d]">
                  <div className="min-w-0">
                    <span className="text-slate-300 text-sm">
                      Timeline: {selectedTimeline.name} ({selectedTimeline.durationLabel})
                    </span>
                    <span className="text-slate-600 text-xs ml-2">Deadline</span>
                  </div>
                  <span className="text-slate-400 text-xs whitespace-nowrap flex-shrink-0">
                    {totals.rushFee > 0 ? `+${formatPHP(totals.rushFee)}` : "No rush fee"}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="px-6 py-4 border-t border-[#1a2d6b] bg-[#0d1a45] flex items-center justify-between">
          <button
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 ${
              isFirst
                ? "text-slate-700 cursor-not-allowed"
                : "text-slate-300 hover:text-white border border-[#1a2d6b] hover:border-cyan-500/50"
            }`}
          >
            ← Back
          </button>
          <p className="text-slate-500 text-xs hidden sm:block">
            Running total: <span className="text-cyan-400 font-semibold">{formatPHP(totals.oneTimeTotal)}</span>
            {totals.monthlyTotal > 0 && (
              <span className="text-teal-400 font-semibold"> + {formatPHP(totals.monthlyTotal)}/mo</span>
            )}
          </p>
          {!isLast ? (
            <button
              onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
              className="text-sm font-bold px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white transition-all duration-200 shadow-lg shadow-blue-900/40"
            >
              Next →
            </button>
          ) : (
            <span className="text-cyan-400 text-sm font-semibold">All set ✓</span>
          )}
        </div>
      </section>

      {/* ── RIGHT: Quote Summary (always visible) ── */}
      <aside className="lg:sticky lg:top-20 bg-[#0a1535] border border-[#1a2d6b] rounded-2xl overflow-hidden shadow-xl shadow-blue-950/50">

        <div className="bg-gradient-to-r from-[#0d1a45] to-[#0a1535] px-6 py-5 border-b border-[#1a2d6b]">
          <h2 className="text-white font-bold text-lg tracking-tight">Your estimate</h2>
          <p className="text-slate-500 text-xs mt-0.5">Updates as you go — nothing's final yet</p>
        </div>

        <div className="px-6 py-5 border-b border-[#111f4d]">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#0d1a45] to-[#0a1535] border border-[#1a2d6b] rounded-xl p-4">
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">One-time</p>
              <p className="text-2xl font-black text-cyan-400 leading-tight">{formatPHP(totals.oneTimeTotal)}</p>
            </div>
            <div className="bg-gradient-to-br from-[#0d1a45] to-[#0a1535] border border-[#1a2d6b] rounded-xl p-4">
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">Monthly</p>
              <p className="text-2xl font-black text-teal-400 leading-tight">
                {formatPHP(totals.monthlyTotal)}
                <span className="text-sm font-medium text-slate-500">/mo</span>
              </p>
            </div>
          </div>

          {totals.rushFee > 0 && (
            <div className="mt-3 flex items-center justify-between bg-cyan-500/[0.06] border border-cyan-500/20 rounded-lg px-3 py-2">
              <span className="text-xs text-cyan-300">
                Includes {selectedTimeline.name.toLowerCase()} rush fee (+{totals.rushFeePercent}%)
              </span>
              <span className="text-xs font-semibold text-cyan-300">+{formatPHP(totals.rushFee)}</span>
            </div>
          )}

          <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">
            * Estimate only. Final pricing may vary based on scope, content, and integrations.
          </p>
        </div>

        <div className="px-6 py-5 border-b border-[#111f4d] max-h-72 overflow-y-auto">
          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Included in quote
          </h3>
          <ul className="space-y-2.5">
            {selectedFeatures.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <span className="text-slate-300 text-sm truncate">{f.name}</span>
                </div>
                <span className="text-slate-500 text-xs whitespace-nowrap flex-shrink-0">
                  {f.price > 0 ? `+${formatPHP(f.price)}` : ""}
                  {(f.monthly ?? 0) > 0 ? ` +${formatPHP(f.monthly!)}/mo` : ""}
                  {f.price === 0 && (f.monthly ?? 0) === 0 ? "Included" : ""}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                <span className="text-slate-300 text-sm truncate">
                  Timeline: {selectedTimeline.name}
                </span>
              </div>
              <span className="text-slate-500 text-xs whitespace-nowrap flex-shrink-0">
                {totals.rushFee > 0 ? `+${formatPHP(totals.rushFee)}` : "Included"}
              </span>
            </li>
          </ul>
        </div>

        <div className="px-6 py-5 grid gap-3">
          <button
            onClick={() => window.print()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 hover:-translate-y-0.5"
          >
            Download / Print Estimate
          </button>
          <button className="w-full border border-[#1a2d6b] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 bg-[#0d1a45]/50 hover:bg-cyan-500/[0.06]">
            Send Inquiry →
          </button>
        </div>
      </aside>

    </div>
  );
}

function CategoryStep({
  category,
  title,
  items,
  selectedIds,
  onToggle,
  isSingle,
  icon,
}: {
  category: FeatureCategory;
  title: string;
  items: Feature[];
  selectedIds: Set<string>;
  onToggle: (f: Feature) => void;
  isSingle: boolean;
  icon: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-xl leading-none">{icon}</span>
        <h3 className="text-white font-bold text-xl tracking-tight">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm mb-5">{CATEGORY_HELP[category]}</p>

      <div className="grid gap-2.5">
        {items.map((f) => {
          const checked = selectedIds.has(f.id);
          const hasMonthly = (f.monthly ?? 0) > 0;

          return (
            <label
              key={f.id}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
                ${checked
                  ? "border-cyan-500/60 bg-cyan-500/[0.07] shadow-sm shadow-cyan-500/10"
                  : "border-[#1a2d6b] bg-[#0d1a45]/50 hover:border-blue-500/40 hover:bg-[#0d1a45]"
                }`}
            >
              <input
                type={isSingle ? "radio" : "checkbox"}
                name={isSingle ? category : f.id}
                checked={checked}
                onChange={() => onToggle(f)}
                className="mt-0.5 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm font-medium ${checked ? "text-white" : "text-slate-300"}`}>
                    {f.name}
                  </span>
                  <span className={`text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
                    f.price === 0 && !hasMonthly
                      ? "text-teal-400"
                      : hasMonthly && f.price === 0
                      ? "text-cyan-400"
                      : "text-slate-200"
                  }`}>
                    {f.price > 0
                      ? `+${formatPHP(f.price)}`
                      : hasMonthly
                      ? `${formatPHP(f.monthly!)}/mo`
                      : "Included"}
                    {f.price > 0 && hasMonthly ? ` + ${formatPHP(f.monthly!)}/mo` : ""}
                  </span>
                </div>
                {f.note && <p className="text-xs text-slate-500 mt-1 leading-snug">{f.note}</p>}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}