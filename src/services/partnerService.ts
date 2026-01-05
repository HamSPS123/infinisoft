import { toast } from 'react-toastify';
import api from '../config/axios';
import type { Partner, CreatePartnerDto, UpdatePartnerDto, PartnerListResponse, PartnerResponse } from '../types/partner';
import { AxiosError } from 'axios';

// API timeout in milliseconds (10 seconds)
const API_TIMEOUT = 10000;

export const partnerService = {
  // Get all partners
  getPartners: async (): Promise<Partner[]> => {
    try {
      const response = await api.get<PartnerListResponse>('/partners', { 
        timeout: API_TIMEOUT
      });
      
      // Validate response structure
      if (!response.data || !Array.isArray(response.data.partners)) {
        throw new Error('Invalid response format: partners data is missing or not an array');
      }
      
      return response.data.partners;
    } catch (error) {
      console.error('Error fetching partners:', error);
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again later.');
        }
      }
      throw new Error('Failed to fetch partners. Please try again later.');
    }
  },

  // Get a single partner by ID
  getPartnerById: async (id: string): Promise<Partner> => {
    try {
      const response = await api.get<PartnerResponse>(`/partners/${id}`, {
        timeout: API_TIMEOUT
      });
      
      // Validate response structure
      if (!response.data || !response.data.partner) {
        const errMsg = 'Invalid response format: partner data is missing';
        throw new Error(errMsg);
      }
      
      return response.data.partner;
    } catch (error) {
      console.error(`Error fetching partner with ID ${id}:`, error);
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          const errMsg = 'Request timed out. Please try again later.';
          throw new Error(errMsg);
        } else if (error.response?.status === 404) {
          const errMsg = `Partner with ID ${id} not found`;
          throw new Error(errMsg);
        }
      }
      throw new Error(`Failed to fetch partner with ID ${id}. Please try again later.`);
    }
  },

  // Create a new partner
  createPartner: async (partnerData: CreatePartnerDto): Promise<Partner> => {
    try {
      const response = await api.post<PartnerResponse>('/partners', partnerData, {
        timeout: API_TIMEOUT
      });
      
      // Validate response structure
      if (!response.data || !response.data.partner) {
        const errMsg = 'Invalid response format: partner data is missing';
        toast.error(errMsg);
        throw new Error(errMsg);
      }
      toast.success('Partner created successfully');
      return response.data.partner;
    } catch (error) {
      console.error('Error creating partner:', error);
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          const errMsg = 'Request timed out. Please try again later.';
          toast.error(errMsg);
          throw new Error(errMsg);
        } else if (error.response?.status === 400) {
          const errMsg = 'Invalid partner data. Please check your input and try again.';
          toast.error(errMsg);  
          throw new Error(errMsg);
        }
      }
      const errMsg = 'Failed to create partner. Please try again later.';
      toast.error(errMsg);
      throw new Error(errMsg);
    }
  },

  // Update an existing partner
  updatePartner: async (id: string, partnerData: UpdatePartnerDto): Promise<Partner> => {
    try {
      const response = await api.patch<PartnerResponse>(`/partners/${id}`, partnerData, {
        timeout: API_TIMEOUT
      });
      
      // Validate response structure
      if (!response.data || !response.data.partner) {
        const errMsg = 'Invalid response format: partner data is missing';
        throw new Error(errMsg);
      }
      
      return response.data.partner;
    } catch (error) {
      console.error(`Error updating partner with ID ${id}:`, error);
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          const errMsg = 'Request timed out. Please try again later.';
          throw new Error(errMsg);
        } else if (error.response?.status === 404) {
          const errMsg = `Partner with ID ${id} not found`;
          throw new Error(errMsg);
        } else if (error.response?.status === 400) {
          const errMsg = 'Invalid partner data. Please check your input and try again.';
          throw new Error(errMsg);
        }
      }
      const errMsg = `Failed to update partner with ID ${id}. Please try again later.`;
      toast.error(errMsg);
      throw new Error(errMsg);
    }
  },

  // Delete a partner
  deletePartner: async (id: string): Promise<void> => {
    try {
      await api.delete(`/partners/${id}`, {
        timeout: API_TIMEOUT
      });
    } catch (error) {
      console.error(`Error deleting partner with ID ${id}:`, error);
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          const errMsg = 'Request timed out. Please try again later.';
          throw new Error(errMsg);
        } else if (error.response?.status === 404) {
          const errMsg = `Partner with ID ${id} not found`;
          throw new Error(errMsg);
        }
      }
      const errMsg = `Failed to delete partner with ID ${id}. Please try again later.`;
      toast.error(errMsg);
      throw new Error(errMsg);
    }
  }
};
