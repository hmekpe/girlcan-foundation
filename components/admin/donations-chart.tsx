"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartPoint = { month: string; total: number };

export function DonationsChart({ data }: { data: ChartPoint[] }) {
  if (data.every((d) => d.total === 0)) {
    return (
      <p className="py-8 text-center text-sm text-ink-500">No donation data to chart yet.</p>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0E2D3" />
          <XAxis dataKey="month" tick={{ fill: "#786B60", fontSize: 12 }} />
          <YAxis tick={{ fill: "#786B60", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#FFFCFA",
              border: "1px solid #F0E2D3",
              borderRadius: "12px",
            }}
          />
          <Bar dataKey="total" fill="#C94A6D" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
