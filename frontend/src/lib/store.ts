import { create } from "zustand";
import { api } from "./api";

type State = {
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
  authFetch: <T=any>(fn: (token: string) => Promise<T>) => Promise<T>;
};

export const useAuthStore = create<State>((set, get) => ({
  token: null,
  setToken: (t) => set({ token: t }),
  logout: () => set({ token: null }),
  authFetch: async (fn) => {
    const t = get().token;
    if (!t) throw new Error("Not authenticated");
    return fn(t);
  }
}));

export function withAuthHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}