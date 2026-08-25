// Shared design tokens for forms and buttons. Every form/list in the app
// should build its inputs and buttons from these instead of hand-styling
// new ones, so spacing/height/radius/color stay consistent as the app grows.

export const labelClass = "text-xs font-medium text-neutral-500";

export const inputClass =
  "h-8 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonTone = "brand" | "neutral" | "destructive";
type ButtonSize = "sm" | "md";

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xs",
  md: "h-8 px-5 text-sm",
};

const filledClass: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    brand: "bg-green-400 text-neutral-900 hover:bg-green-300",
    neutral: "bg-neutral-800 text-white hover:bg-neutral-700",
    destructive: "bg-red-500 text-white hover:bg-red-400",
  },
  secondary: {
    brand: "border border-green-500 bg-white text-green-700 hover:bg-green-50",
    neutral: "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50",
    destructive: "border border-red-300 bg-white text-red-600 hover:bg-red-50",
  },
  tertiary: {
    brand: "text-green-700 hover:text-green-900",
    neutral: "text-neutral-500 hover:text-neutral-800",
    destructive: "text-red-400 hover:text-red-600",
  },
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  tone: ButtonTone = "brand",
  size: ButtonSize = "md"
) {
  if (variant === "tertiary") {
    const textSize = size === "sm" ? "text-xs" : "text-sm";
    return `${textSize} font-medium transition ${filledClass.tertiary[tone]}`;
  }
  return `inline-flex items-center justify-center rounded-lg font-medium transition ${sizeClass[size]} ${filledClass[variant][tone]}`;
}
