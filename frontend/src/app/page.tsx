"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import SEO from "@/components/SEO";
import { useAuthStore, withAuthHeaders } from "@/lib/store";
import { api } from "@/lib/api";
import type { Note } from "@/types/note";

export default function HomePage() {
  const { token, authFetch } = useAuthStore();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    if (!token) {
      setNotes([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await authFetch((t) => 
        api.get<Note[]>('/notes', { 
          params: { q: searchQuery }, 
          ...withAuthHeaders(t) 
        }).then(r => r.data)
      );
      setNotes(response);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token, searchQuery]);

  const handleCreateNote = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await authFetch((t) =>
        api.post('/notes', { note_title: title, note_content: content }, withAuthHeaders(t))
      );
      
      setTitle("");
      setContent("");
      setShowCreateForm(false);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await authFetch((t) =>
          api.delete(`/notes/${noteId}`, withAuthHeaders(t))
        );
        await fetchNotes();
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  if (!token) {
    return (
      <>
        <SEO 
          title="Welcome to Keep Notes"
          description="A beautiful, modern note-taking application. Sign in to start creating and managing your notes."
        />
        <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-[#f0e6d2] border-2 border-[#d0c0a0] rounded-lg shadow-lg p-8">
              <div className="w-20 h-20 bg-[#5fb3b3] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-semibold text-[#5a4a3a] mb-4">
                Welcome to Keep Notes
              </h1>
              <p className="text-[#8b7355] mb-6">
                Sign in to start creating and managing your notes.
              </p>
              
              <div className="flex space-x-3">
                <Link href="/signin" className="flex-1">
                  <Button className="w-full py-2 text-sm font-medium bg-[#5fb3b3] hover:bg-[#4fa3a3] text-white rounded border-none">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full py-2 text-sm font-medium bg-[#f4a460] hover:bg-[#e09650] text-white rounded border-none">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Your Notes Dashboard"
        description="Manage and organize your personal notes with Keep Notes."
      />
      
      <div className="min-h-screen bg-[#f5f5dc]">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#5a4a3a] mb-2">Your Notes</h1>
            <div className="w-16 h-0.5 bg-[#5fb3b3] mx-auto"></div>
          </div>
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
            />
          </div>

          <div className="text-center">
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-2 text-sm font-medium bg-[#5fb3b3] hover:bg-[#4fa3a3] text-white rounded border-none"
            >
              {showCreateForm ? "Cancel" : "Create New Note"}
            </Button>
          </div>
          {showCreateForm && (
            <div className="max-w-2xl mx-auto bg-[#f0e6d2] border-2 border-[#d0c0a0] rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#5a4a3a] mb-4">Create New Note</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Title</label>
                  <Input
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a4a3a] mb-1">Content</label>
                  <Textarea
                    placeholder="Write your note content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 bg-white border border-[#d0c0a0] rounded text-[#5a4a3a] focus:outline-none focus:border-[#5fb3b3] focus:ring-1 focus:ring-[#5fb3b3] resize-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleCreateNote}
                    disabled={loading || !title.trim()}
                    className="flex-1 py-2 text-sm font-medium bg-[#5fb3b3] hover:bg-[#4fa3a3] text-white rounded border-none disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </Button>
                  <Button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 py-2 text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white rounded border-none"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#f0e6d2] border-2 border-[#d0c0a0] rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#5a4a3a]">My Notes</h2>
              <span className="text-sm text-[#8b7355] bg-[#e8dcc6] px-3 py-1 rounded-full">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-[#5fb3b3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#8b7355]">Loading notes...</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#d0c0a0] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#5a4a3a] mb-2">No notes yet</h3>
                <p className="text-[#8b7355]">Create your first note to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                  <div
                    key={note.note_id}
                    className="bg-white border border-[#d0c0a0] rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base font-semibold text-[#5a4a3a] flex-1 mr-2 line-clamp-2">
                        {note.note_title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Link href={`/notes/${note.note_id}/edit`}>
                          <Button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded border-none text-xs">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDeleteNote(note.note_id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded border-none text-xs flex-shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <p className="text-[#8b7355] text-sm mb-4 line-clamp-4 whitespace-pre-wrap">
                      {note.note_content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#8b7355] pt-2 border-t border-[#e8dcc6]">
                      <span className="bg-[#f8f6f0] px-2 py-1 rounded">
                        {new Date(note.last_update).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="bg-[#f8f6f0] px-2 py-1 rounded">
                        {new Date(note.last_update).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}