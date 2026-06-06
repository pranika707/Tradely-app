import {
  Sprout,
  Globe,
  Flame,
  LineChart,
  Shield,
  Brain,
  Gamepad2,
  Trophy,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

// Maps module.id → lucide icon, so module displays show clean SVG icons
// instead of emojis.
export const moduleIcons: Record<string, LucideIcon> = {
  basics: Sprout,
  markets: Globe,
  candles: Flame,
  charts: LineChart,
  risk: Shield,
  psychology: Brain,
  simulator: Gamepad2,
  tips: Trophy,
};

export function getModuleIcon(id: string): LucideIcon {
  return moduleIcons[id] ?? BookOpen;
}
