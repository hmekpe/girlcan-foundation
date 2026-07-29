import {
  BookOpen,
  Crown,
  Globe,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  Megaphone,
  School,
  Sparkle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Crown,
  Handshake,
  Sparkles,
  Megaphone,
  Globe2,
  School,
  Sparkle,
  BookOpen,
  Globe,
  Lightbulb,
};

export function getProgramIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Heart;
}
