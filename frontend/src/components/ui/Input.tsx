import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export default function Input({
  className = "",
  label,
  error,
  icon,
  ...props
}: Props) {
  const inputStyles = className || [
    "w-full px-3 py-2 rounded border transition-colors duration-200",
    "bg-white border-gray-300",
    "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    "text-gray-700 placeholder-gray-400",
    error && "border-red-300 focus:border-red-500 focus:ring-red-500",
    icon && "pl-10"
  ].filter(Boolean).join(" ");

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={inputStyles}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}