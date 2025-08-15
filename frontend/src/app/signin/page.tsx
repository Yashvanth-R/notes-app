"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setToken = useAuthStore(s => s.setToken);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/signin", { user_email: email, password });
      setToken(res.data.access_token);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to sign in");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-3">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit">Continue</Button>
    </form>
  );
}