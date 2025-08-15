import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({ 
  variant = "primary", 
  size = "md",
  className = "", 
  children,
  disabled,
  ...props 
}: Props) {
  if (className) {
    return (
      <button className={className} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500",
    ghost: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  const cls = [
    baseStyles,
    variants[variant],
    sizes[size]
  ].join(" ");
  
  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  );
}