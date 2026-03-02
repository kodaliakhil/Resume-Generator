import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const styles = clsx(
    "rounded-xl px-4 py-2 text-sm font-medium transition",
    variant === "primary" && "bg-accent text-white hover:opcity-90",
    variant === "secondary" && "bg-white/10 text-white hover:bg-white/20",
    variant === "ghost" && "bg-transparent text-white hover:bg-white/10"
  );
  return <button className={styles} {...props} />;
}
