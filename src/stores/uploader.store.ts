/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../config/axios";
import { toast } from "react-toastify";

interface UploadStore {
  uploads: any[];
  loading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<{ status: number, data: any }>;
  getUploadFile: () => Promise<void>;
}

const useUploadStore = create<UploadStore>((set, get) => ({
  uploads: [],
  loading: false,
  error: null,
  uploadFile: async (file: any) => {
    set({ loading: true });
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      
      // For file uploads, we need to let the browser set the correct content type
      // Don't set Content-Type header manually for multipart/form-data
      const response = await api.post("/uploader", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 201) {
        set({
          uploads: [...get().uploads, response.data],
          loading: false,
          error: null,
        });
        toast.success("File uploaded successfully");
      }
      return { status: response.status, data: response.data };
    } catch (error: any) {
      console.error('Upload error:', error);
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      return { status: error?.response?.status || 500, data: null };
    } finally {
      set({ loading: false });
    }
  },
  getUploadFile: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/uploader");
      if (response.status === 200) {
        set({
          uploads: response.data,
          loading: false,
          error: null,
        });
      }
    } catch (error: any) {
        const errMsg = error?.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUploadStore;
