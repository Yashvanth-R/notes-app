import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
  authFetch: <T=any>(fn: (token: string) => Promise<T>) => Promise<T>;
};

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (t) => set({ token: t }),
      logout: () => set({ token: null }),
      authFetch: async (fn) => {
        const t = get().token;
        if (!t) throw new Error("Not authenticated");
        return fn(t);
      }
    }),
    {
      name: "auth-storage",
    }
  )
);

export function withAuthHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}