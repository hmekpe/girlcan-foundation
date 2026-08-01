import { getSiteSettings } from "@/lib/site";

type BreakdownItem = {
  label: string;
  pct: number;
  colorClass: string;
};

type FinancialBreakdownProps = {
  variant?: "full" | "condensed";
  className?: string;
};

export async function FinancialBreakdown({
  variant = "full",
  className,
}: FinancialBreakdownProps) {
  const settings = await getSiteSettings([
    "program_cost_pct",
    "operations_pct",
    "reserve_pct",
  ]);

  const programPct = Number(settings.program_cost_pct || 80);
  const operationsPct = Number(settings.operations_pct || 20);
  const reservePct = Number(settings.reserve_pct || 0);

  const items: BreakdownItem[] = [
    { label: "Program delivery", pct: programPct, colorClass: "bg-rose" },
    { label: "Operations & admin", pct: operationsPct, colorClass: "bg-gold" },
    { label: "Reserve & other", pct: reservePct, colorClass: "bg-plum" },
  ].filter(item => item.pct > 0);

  if (variant === "condensed") {
    return (
      <p className={className}>
        <strong className="text-rose">{programPct}%</strong> of every donation goes
        directly to programs.
      </p>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-rose-pale/20 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm font-medium text-text">
              <span>{item.label}</span>
              <span className="text-muted">{item.pct}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${item.colorClass}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
