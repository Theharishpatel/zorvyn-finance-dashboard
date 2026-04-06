import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; 
import { UserRole, UserState } from '../types';

interface AuthStore extends UserState {
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      role: "viewer", 
      name: "Harish Patel",
      setRole: (newRole) => set({ role: newRole }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);