/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { User } from "./authTypes";
import api from "../config/axios";
import { toast } from "react-toastify";
import type { UserSchemaType } from "../types/users.interface";

interface UserStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
  createUser: (user: UserSchemaType) => Promise<{status: number}>;
  updateUser: (id: string, user: UserSchemaType) => Promise<{status: number}>;
  deleteUser: (id: string) => Promise<{status: number}>;
}

const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  getUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<User[]>("/users");
      set({ users: response.data });
    } catch (error: any) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to fetch users";
      set({
        error: errMsg,
      });
      toast.error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },
  createUser: async (user: UserSchemaType) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<User>("/users", user);
      // Add new user at the beginning (newest first)
      set({ users: [response.data, ...get().users], isLoading: false });
      return {status: response.status};
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateUser: async (id: string, user: UserSchemaType) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch<User>(`/users/${id}`, user);
      set({ users: get().users.map((u) => (u.id === id ? response.data : u)), isLoading: false });
      return {status: response.status};
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteUser: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.delete<User>(`/users/${id}`);
      if(response.status === 200){
        toast.success("User deleted successfully");
        set({ users: get().users.filter((u) => u.id !== id) });
        return {status: response.status};
      }
      return {status: response.status};
    } catch (error: any) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to delete user";
      set({
        error: errMsg,
      });
      toast.error(errMsg);
      return {status: error.response?.status || 500};
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
