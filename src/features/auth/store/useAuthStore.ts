import { create } from 'zustand';
import { UserRole, UserState } from '../types';

interface AuthStore extends UserState {
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: "viewer", // Initial state
  name: "Harish Patel",
  setRole: (newRole) => set({ role: newRole }),
}));