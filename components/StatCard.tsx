import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: React.ElementType;
  accent: string;
}

export default function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  accent,
}: StatCardProps) {
  return (
    <div className="bg-[#0f1724] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          {label}
        </span>

        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon size={15} />
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold text-white tracking-tight font-mono">
          {value}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          {changeType === "up" ? (
            <ArrowUpRight size={13} className="text-emerald-400" />
          ) : changeType === "down" ? (
            <ArrowDownRight size={13} className="text-red-400" />
          ) : null}

          <span
            className={`text-xs font-medium ${
              changeType === "up"
                ? "text-emerald-400"
                : changeType === "down"
                ? "text-red-400"
                : "text-zinc-500"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}