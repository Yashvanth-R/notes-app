import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className = "", ...props }: Props) {
  return (
    <textarea
      className={["w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none", className].join(" ")}
      rows={6}
      {...props}
    />
  );
}