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
    "fundraising_pct",
  ]);

  const programPct = Number(settings.program_cost_pct || 78);
  const operationsPct = Number(settings.operations_pct || 14);
  const fundraisingPct = Number(settings.fundraising_pct || 8);

  const items: BreakdownItem[] = [
    { label: "Program delivery", pct: programPct, colorClass: "bg-rose" },
    { label: "Operations & admin", pct: operationsPct, colorClass: "bg-gold" },
    { label: "Fundraising", pct: fundraisingPct, colorClass: "bg-plum-deep" },
  ];

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
          <div key={item.label} className="rounded-2xl border border-rose-pale bg-cream p-5">
            <div className="flex items-center justify-between text-sm font-medium text-text">
              <span>{item.label}</span>
              <span>{item.pct}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-rose-pale">
              <div
                className={`h-full rounded-full ${item.colorClass}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
