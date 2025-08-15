import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuthStore, withAuthHeaders } from '@/lib/store';
import type { Note } from '@/types/note';

export const useNotes = (searchQuery: string = '') => {
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, authFetch } = useAuthStore();

  const fetchNotes = useCallback(async () => {
    if (!token) {
      setData([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const notes = await authFetch((t) => 
        api.get<Note[]>('/notes', { 
          params: { q: searchQuery }, 
          ...withAuthHeaders(t) 
        }).then(r => r.data)
      );
      setData(notes);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to fetch notes');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, searchQuery, authFetch]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const refetch = useCallback(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { data, isLoading, error, refetch };
};

export const useCreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authFetch } = useAuthStore();

  const mutateAsync = async (noteData: { note_title: string; note_content: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authFetch((t) =>
        api.post('/notes', noteData, withAuthHeaders(t)).then(r => r.data)
      );
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.detail || 'Failed to create note';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, isLoading, error };
};

export const useUpdateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authFetch } = useAuthStore();

  const mutateAsync = async ({ 
    noteId, 
    noteData 
  }: { 
    noteId: string; 
    noteData: { note_title?: string; note_content?: string } 
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authFetch((t) =>
        api.put(`/notes/${noteId}`, noteData, withAuthHeaders(t)).then(r => r.data)
      );
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.detail || 'Failed to update note';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, isLoading, error };
};

export const useDeleteNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authFetch } = useAuthStore();

  const mutateAsync = async (noteId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authFetch((t) =>
        api.delete(`/notes/${noteId}`, withAuthHeaders(t)).then(r => r.data)
      );
      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.detail || 'Failed to delete note';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, isLoading, error };
};

export const useNote = (noteId: string) => {
  const [data, setData] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, authFetch } = useAuthStore();

  useEffect(() => {
    if (!token || !noteId) return;

    const fetchNote = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const note = await authFetch((t) =>
          api.get<Note>(`/notes/${noteId}`, withAuthHeaders(t)).then(r => r.data)
        );
        setData(note);
      } catch (err: any) {
        setError(err?.response?.data?.detail || 'Failed to fetch note');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [token, noteId, authFetch]);

  return { data, isLoading, error };
};