import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "px-3 py-2 rounded text-sm font-medium transition";
  const primary = "bg-blue-600 hover:bg-blue-500 text-white";
  const ghost = "bg-transparent border border-gray-600 hover:bg-gray-800";
  const cls = [base, variant === "primary" ? primary : ghost, className].join(" ");
  return <button className={cls} {...props} />;
}