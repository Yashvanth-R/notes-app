"use client";
import Link from "next/link";
import Button from "./ui/Button";
import { useAuthStore } from "@/lib/store";

export default function Navbar() {
  const { token, logout } = useAuthStore();
  
  return (
    <nav className="bg-[#5fb3b3] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link 
            href="/" 
            className="text-white text-lg font-semibold hover:text-white/90 transition-colors duration-200"
          >
            Keep Notes
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
            >
              About
            </Link>
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
            >
              Notes
            </Link>
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
            >
              Account
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {!token ? (
              <Link href="/signin">
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-none text-sm px-4 py-1"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Button 
                size="sm" 
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 text-white border-none text-sm px-4 py-1"
              >
                Sign out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}