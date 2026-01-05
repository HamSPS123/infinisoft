/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { partnerService } from "../services/partnerService";
import type {
  Partner,
  CreatePartnerDto,
  UpdatePartnerDto,
} from "../types/partner";
import api from "../config/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface PartnerState {
  // State
  partners: Partner[];
  currentPartner: Partner | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPartners: (filters?: {
    search?: string;
    categoryId?: string;
    tags?: string[];
  }) => Promise<void>;
  fetchPartnerById: (id: string) => Promise<void>;
  createPartner: (partner: CreatePartnerDto) => Promise<{status: number}>;
  updatePartner: (
    id: string,
    partner: UpdatePartnerDto
  ) => Promise<{status: number}>;
  deletePartner: (id: string) => Promise<boolean>;
  setCurrentPartner: (partner: Partner | null) => void;
  clearError: () => void;
}

export const usePartnerStore = create<PartnerState>((set) => ({
  // Initial state
  partners: [],
  currentPartner: null,
  isLoading: false,
  error: null,

  // Fetch all partners with optional filters
  fetchPartners: async (filters) => {
    try {
      const API_TIMEOUT = 10000;
      set({ isLoading: true, error: null });
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters?.search) {
        params.append('search', filters.search);
      }
      if (filters?.categoryId) {
        params.append('categoryId', filters.categoryId);
      }
      if (filters?.tags && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','));
      }
      
      const queryString = params.toString();
      const url = queryString ? `/partners?${queryString}` : '/partners';
      
      const partners = await api.get<Partner[]>(url, {
        timeout: API_TIMEOUT,
      });
      set({ partners: partners.data, isLoading: false });
    } catch (error) {
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Failed to fetch partners";
      console.error("Error fetching partners:", error);
      toast.error(errMsg);
      set({
        isLoading: false,
        error: errMsg,
      });
    }
  },

  // Fetch a single partner by ID
  fetchPartnerById: async (id: string) => {
    try {
      const API_TIMEOUT = 10000;
      set({ isLoading: true, error: null });
      const partner = await api.get(`/partners/${id}`, {
        timeout: API_TIMEOUT,
      });
      console.log(partner);
      set({ currentPartner: partner.data, isLoading: false });
    } catch (error) {
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : `Failed to fetch partner with ID ${id}`;
      console.error(`Error fetching partner with ID ${id}:`, error);
      toast.error(errMsg);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to fetch partner with ID ${id}`,
      });
    }
  },

  // Create a new partner
  createPartner: async (partnerData: CreatePartnerDto) => {
    try {
      set({ isLoading: true, error: null });
      const newPartner = await partnerService.createPartner(partnerData);
      // Add new partner at the beginning (newest first)
      set((state) => ({
        partners: [newPartner, ...state.partners],
        currentPartner: null,
        isLoading: false,
      }));
      return {status: 201};
    } catch (error: any) {
      console.error("Error creating partner:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to create partner",
      });
      return {status: error.response?.status || 500};
    }
  },

  // Update an existing partner
  updatePartner: async (id: string, partnerData: UpdatePartnerDto) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch(`/partners/${id}`, partnerData);
      if (response.data && response.status === 200) {
        const updatedPartner = response.data;
        // Update the partners list and current partner
        set((state) => ({
          partners: state.partners.map((p) =>
            p.id === id ? updatedPartner : p
          ),
          currentPartner: null,
          isLoading: false,
        }));
        return { status: response.status };
      }
      // If we get here, the response was not as expected
      return { status: 500 };
    } catch (error: any) {
      console.error(`Error updating partner with ID ${id}:`, error);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to update partner with ID ${id}`,
      });
      return {status: error.response?.status || 500};
    }
  },

  // Delete a partner
  deletePartner: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await partnerService.deletePartner(id);
      // Remove the partner from the list
      set((state) => ({
        partners: state.partners.filter((p) => p.id !== id),
        currentPartner:
          state.currentPartner?.id === id ? null : state.currentPartner,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      console.error(`Error deleting partner with ID ${id}:`, error);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to delete partner with ID ${id}`,
      });
      return false;
    }
  },

  // Set current partner
  setCurrentPartner: (partner: Partner | null) => {
    set({ currentPartner: partner });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
