"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      await api.post("/auth/signup", { user_name: username, user_email: email, password });
      setMessage("Account created successfully! You can now sign in.");
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl w-[400px] sm:w-[450px] md:w-[500px] lg:w-[1120px]">
        <div className="bg-[#f0e6d2] border-2 border-[#d0c0a0] rounded-lg shadow-lg p-6 relative">
          <div className="flex items-center justify-between mb-4 p-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
              <div className="w-3 h-3 bg-[#27ca3f] rounded-full border border-[#1aad2b]"></div>
            </div>
            <span className="text-xs text-[#8b7355] font-medium bg-[#e8dcc6] px-2 py-1 rounded">Signup</span>
          </div>
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-[#5a4a3a] mb-3">Sign up</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Username</label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] text-sm focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] text-sm focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] text-sm focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] text-sm focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
              />
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded p-2">
                <p className="text-green-600 text-xs">{message}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-2">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}
            <div className="flex space-x-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 text-sm font-medium bg-[#4ade80] hover:bg-[#22c55e] text-white rounded border-none shadow-sm"
              >
                {loading ? "Creating..." : "Register"}
              </Button>
              
              <Link href="/signin" className="flex-1">
                <Button
                  type="button"
                  className="w-full py-2 text-sm font-medium bg-[#f4a460] hover:bg-[#e09650] text-white rounded border-none shadow-sm"
                >
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-[#8b7355]">
            <Link href="/" className="hover:text-[#5a4a3a]">Homepage</Link>
            <span className="mx-1">/</span>
            <span>Signup Page</span>
          </p>
        </div>
      </div>
    </div>
  );
}