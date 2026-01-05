import api from '../config/axios';
import type { Page, PageFormData, PageListResponse, PageResponse } from '../types/page';

export const pageService = {
  // Get all pages
  getPages: async (): Promise<Page[]> => {
    try {
      const response = await api.get<PageListResponse>('/pages');
      return response.data.pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },

  // Get a single page by ID
  getPageById: async (id: string): Promise<Page> => {
    try {
      const response = await api.get<PageResponse>(`/pages/${id}`);
      return response.data.page;
    } catch (error) {
      console.error(`Error fetching page with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new page
  createPage: async (pageData: PageFormData): Promise<Page> => {
    try {
      const response = await api.post<PageResponse>('/pages', pageData);
      return response.data.page;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },

  // Update an existing page
  updatePage: async (id: string, pageData: PageFormData): Promise<Page> => {
    try {
      const response = await api.patch<PageResponse>(`/pages/${id}`, pageData);
      return response.data.page;
    } catch (error) {
      console.error(`Error updating page with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a page
  deletePage: async (id: string): Promise<void> => {
    try {
      await api.delete(`/pages/${id}`);
    } catch (error) {
      console.error(`Error deleting page with ID ${id}:`, error);
      throw error;
    }
  }
};
