import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: LucideIcon;
  tone?: "gold" | "rose";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-xl",
  lg: "h-16 w-16 rounded-xl",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-7 w-7",
};

export function IconBadge({
  icon: Icon,
  tone = "gold",
  size = "md",
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizes[size],
        tone === "gold"
          ? "bg-gold-light/30 text-gold"
          : "bg-rose-pale text-rose",
        className
      )}
    >
      <Icon className={iconSizes[size]} strokeWidth={1.75} aria-hidden />
    </div>
  );
}
