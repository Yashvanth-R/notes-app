"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useAuthStore, withAuthHeaders } from "@/lib/store";
import { api } from "@/lib/api";
import type { Note } from "@/types/note";

export default function HomePage() {
  const { token, authFetch } = useAuthStore();
  const [notes, setNotes] = useState<Note[]>([]);
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = async () => {
    if (!token) return setNotes([]);
    const res = await authFetch((t) => api.get<Note[]>("/notes", { params: { q }, ...withAuthHeaders(t) }).then(r => r.data));
    setNotes(res);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [token]);

  const onCreate = async () => {
    if (!token) return;
    await authFetch((t) => api.post("/notes", { note_title: title, note_content: content }, withAuthHeaders(t)));
    setTitle(""); setContent("");
    await load();
  };

  const onDelete = async (id: string) => {
    if (!token) return;
    await authFetch((t) => api.delete(`/notes/${id}`, withAuthHeaders(t)));
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Your Notes</h1>

      {!token && <p className="text-sm text-gray-400">Sign in to view and create notes.</p>}

      {token && (
        <div className="space-y-2 border border-gray-800 p-3 rounded">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex items-center gap-2">
            <Button onClick={onCreate}>Create</Button>
            <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
            <Button variant="ghost" onClick={load}>Search</Button>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {notes.map(n => (
          <li key={n.note_id} className="border border-gray-800 p-3 rounded">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-medium">{n.note_title}</h3>
                <p className="text-sm text-gray-400">{new Date(n.last_update).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => onDelete(n.note_id)}>Delete</Button>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{n.note_content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}