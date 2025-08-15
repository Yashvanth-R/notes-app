"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import SEO from "@/components/SEO";
import { useAuthStore, withAuthHeaders } from "@/lib/store";
import { api } from "@/lib/api";
import type { Note } from "@/types/note";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  const { token, authFetch } = useAuthStore();
  
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/signin");
      return;
    }

    const fetchNote = async () => {
      try {
        const noteData = await authFetch((t) =>
          api.get<Note>(`/notes/${noteId}`, withAuthHeaders(t)).then(r => r.data)
        );
        setNote(noteData);
        setTitle(noteData.note_title);
        setContent(noteData.note_content);
      } catch (err: any) {
        setError(err?.response?.data?.detail || 'Failed to fetch note');
      } finally {
        setIsLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [token, noteId, router, authFetch]);

  const handleSave = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await authFetch((t) =>
        api.put(`/notes/${noteId}`, {
          note_title: title,
          note_content: content,
        }, withAuthHeaders(t))
      );
      router.push("/");
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#5fb3b3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b7355]">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#5a4a3a] mb-4">Note Not Found</h1>
          <Button onClick={() => router.push("/")} className="bg-[#5fb3b3] hover:bg-[#4fa3a3] text-white">
            Back to Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Edit: ${note.note_title}`}
        description={`Edit your note: ${note.note_title}`}
      />
      
      <div className="min-h-screen bg-[#f5f5dc]">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-[#f0e6d2] border-2 border-[#d0c0a0] rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
                <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
                <div className="w-3 h-3 bg-[#27ca3f] rounded-full border border-[#1aad2b]"></div>
              </div>
              <span className="text-xs text-[#8b7355] font-medium bg-[#e8dcc6] px-2 py-1 rounded">
                Edit Note
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-2">
                  Note Title
                </label>
                <Input
                  type="text"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a4a3a] mb-2">
                  Note Content
                </label>
                <Textarea
                  placeholder="Write your note content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3] resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={loading || !title.trim()}
                  className="flex-1 py-2 text-sm font-medium bg-[#5fb3b3] hover:bg-[#4fa3a3] text-white rounded border-none disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  className="flex-1 py-2 text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white rounded border-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}