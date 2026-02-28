import { Feature, FeatureCategory } from "./features";

export type QuoteTotals = {
  oneTimeTotal: number;
  monthlyTotal: number;
  oneTimeItems: Array<{ name: string; price: number; category: FeatureCategory }>;
  monthlyItems: Array<{ name: string; monthly: number; category: FeatureCategory }>;
};

export function computeTotals(selected: Feature[]): QuoteTotals {
  const oneTimeItems = selected
    .filter((f) => f.price > 0)
    .map((f) => ({ name: f.name, price: f.price, category: f.category }));

  const monthlyItems = selected
    .filter((f) => (f.monthly ?? 0) > 0)
    .map((f) => ({ name: f.name, monthly: f.monthly!, category: f.category }));

  const oneTimeTotal = oneTimeItems.reduce((sum, x) => sum + x.price, 0);
  const monthlyTotal = monthlyItems.reduce((sum, x) => sum + x.monthly, 0);

  return { oneTimeTotal, monthlyTotal, oneTimeItems, monthlyItems };
}

// Optional: enforce single-choice categories (radio groups)
const SINGLE_SELECT: FeatureCategory[] = ["Website Type", "Pages", "Design", "CMS"];

export function toggleFeature(
  currentSelectedIds: Set<string>,
  feature: Feature
): Set<string> {
  const next = new Set(currentSelectedIds);

  const isSelected = next.has(feature.id);

  if (isSelected) {
    next.delete(feature.id);
    return next;
  }

  // If feature belongs to a single-select category, remove others in that category
  if (SINGLE_SELECT.includes(feature.category)) {
    // We'll rely on caller to pass full feature list and clear category there if needed.
    next.add(feature.id);
    return next;
  }

  next.add(feature.id);
  return next;
}