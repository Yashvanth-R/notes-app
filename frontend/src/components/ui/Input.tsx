import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={["w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none", className].join(" ")}
      {...props}
    />
  );
}