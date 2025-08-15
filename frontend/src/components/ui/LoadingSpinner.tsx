import React from "react";

type Props = {
    size?: "sm" | "md" | "lg";
    className?: string;
};

export default function LoadingSpinner({ size = "md", className = "" }: Props) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <div className={`${sizes[size]} ${className}`}>
            <div className="animate-spin rounded-full border-2 border-slate-200 border-t-blue-500"></div>
        </div>
    );
}