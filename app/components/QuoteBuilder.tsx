"use client";

import { useMemo, useState } from "react";
import { CATEGORY_ORDER, FEATURES, Feature, FeatureCategory } from "../lib/features";
import { computeTotals } from "../lib/pricing";

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
};

export default function QuoteBuilder() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(["type-corp", "pages-5", "design-template", "cms-none", "seo-basic"])
  );

  const selectedFeatures = useMemo(
    () => FEATURES.filter((f) => selectedIds.has(f.id)),
    [selectedIds]
  );
  const totals = useMemo(() => computeTotals(selectedFeatures), [selectedFeatures]);

  const grouped = useMemo(() => {
    const map = new Map<FeatureCategory, Feature[]>();
    for (const cat of CATEGORY_ORDER) map.set(cat, []);
    for (const f of FEATURES) map.get(f.category)?.push(f);
    return map;
  }, []);

  function onToggle(feature: Feature) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(feature.id)) {
        next.delete(feature.id);
        return next;
      }
      if (SINGLE_SELECT.includes(feature.category)) {
        for (const f of FEATURES) if (f.category === feature.category) next.delete(f.id);
      }
      next.add(feature.id);
      return next;
    });
  }

  function reset() {
    setSelectedIds(new Set(["type-corp", "pages-5", "design-template", "cms-none", "seo-basic"]));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">

      {/* ── LEFT: Feature Picker ── */}
      <section className="bg-[#0a1535] border border-[#1a2d6b] rounded-2xl overflow-hidden shadow-xl shadow-blue-950/50">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a2d6b] bg-[#0d1a45]">
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight">Configure Package</h2>
            <p className="text-slate-500 text-xs mt-0.5">Select what your project needs</p>
          </div>
          <button
            onClick={reset}
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 border border-[#1a2d6b] hover:border-cyan-500/50 px-4 py-2 rounded-lg transition-all duration-200 uppercase tracking-wider"
          >
            Reset
          </button>
        </div>

        <div className="divide-y divide-[#111f4d]">
          {CATEGORY_ORDER.map((cat) => {
            const items = grouped.get(cat) ?? [];
            const isSingle = SINGLE_SELECT.includes(cat);
            const icon = CATEGORY_ICONS[cat] ?? "◆";

            return (
              <div key={cat} className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{icon}</span>
                    <span className="text-white font-semibold text-sm tracking-wide uppercase">
                      {cat}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-[#0d1a45] border border-[#1a2d6b] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {isSingle ? "Pick one" : "Pick any"}
                  </span>
                </div>

                <div className="grid gap-2.5">
                  {items.map((f) => {
                    const checked = selectedIds.has(f.id);
                    const hasMonthly = (f.monthly ?? 0) > 0;

                    return (
                      <label
                        key={f.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          checked
                            ? "border-cyan-500/60 bg-cyan-500/[0.07] shadow-sm shadow-cyan-500/10"
                            : "border-[#1a2d6b] bg-[#0d1a45]/50 hover:border-blue-500/40 hover:bg-[#0d1a45]"
                        }`}
                      >
                        <input
                          type={isSingle ? "radio" : "checkbox"}
                          name={isSingle ? cat : f.id}
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
                          {f.note && (
                            <p className="text-xs text-slate-500 mt-1 leading-snug">{f.note}</p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── RIGHT: Quote Summary ── */}
      <aside className="sticky top-20 bg-[#0a1535] border border-[#1a2d6b] rounded-2xl overflow-hidden shadow-xl shadow-blue-950/50">
        <div className="bg-gradient-to-r from-[#0d1a45] to-[#0a1535] px-6 py-5 border-b border-[#1a2d6b]">
          <h2 className="text-white font-bold text-lg tracking-tight">Your Estimate</h2>
          <p className="text-slate-500 text-xs mt-0.5">Real-time pricing breakdown</p>
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
          <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">
            * Estimate only. Final pricing may vary based on scope, content, and integrations.
          </p>
        </div>

        <div className="px-6 py-5 border-b border-[#111f4d]">
          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Included in Quote
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
                  {f.price === 0 && (f.monthly ?? 0) === 0 ? "—" : ""}
                </span>
              </li>
            ))}
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