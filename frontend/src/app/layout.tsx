import "./../styles/globals.css";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Notes App",
  description: "Educational scaffold",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}