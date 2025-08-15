"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); setError(null);
    try {
      await api.post("/auth/signup", { user_name: name, user_email: email, password });
      setMessage("Account created! You can sign in now.");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to sign up");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-3">
      <h1 className="text-xl font-semibold">Create your account</h1>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <p className="text-green-400 text-sm">{message}</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit">Create account</Button>
    </form>
  );
}