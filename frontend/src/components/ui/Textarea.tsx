import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({ 
  className = "", 
  label, 
  error, 
  rows = 4,
  ...props 
}: Props) {
  const textareaStyles = className || [
    " px-3 py-2 rounded border transition-colors duration-200",
    "bg-white border-gray-300",
    "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    "text-gray-700 placeholder-gray-400",
    "resize-none",
    error && "border-red-300 focus:border-red-500 focus:ring-red-500"
  ].filter(Boolean).join(" ");

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={textareaStyles}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}