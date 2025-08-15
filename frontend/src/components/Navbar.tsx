"use client";
import Link from "next/link";
import Button from "./ui/Button";
import { useAuthStore } from "@/lib/store";

export default function Navbar() {
  const { token, logout } = useAuthStore();
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-800">
      <Link href="/" className="font-semibold">Notes</Link>
      <div className="flex items-center gap-2">
        {!token ? (
          <>
            <Link href="/signin"><Button variant="ghost">Sign in</Button></Link>
            <Link href="/signup"><Button>Sign up</Button></Link>
          </>
        ) : (
          <Button variant="ghost" onClick={logout}>Sign out</Button>
        )}
      </div>
    </nav>
  );
}