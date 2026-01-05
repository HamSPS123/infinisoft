/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { productService } from "../services/productService";
import api from "../config/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { Product, ProductFormData } from "../types/product";

// Define API timeout (10 seconds) based on the memory about socket connection handling
const API_TIMEOUT = 10000;

interface ProductState {
  // State
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  // Actions
  fetchProducts: (filters?: {
    search?: string;
    categoryId?: string;
    partnerId?: string;
    tags?: string[];
  }) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (product: ProductFormData) => Promise<{status: number}>;
  updateProduct: (
    id: string,
    product: ProductFormData
  ) => Promise<{status: number}>;
  deleteProduct: (id: string) => Promise<boolean>;
  setCurrentProduct: (product: Product | null) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  // Initial state
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  openDialog: false,
  // Fetch all products with optional filters
  fetchProducts: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters?.search) {
        params.append('search', filters.search);
      }
      if (filters?.categoryId) {
        params.append('categoryId', filters.categoryId);
      }
      if (filters?.partnerId) {
        params.append('partnerId', filters.partnerId);
      }
      if (filters?.tags && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','));
      }
      
      const queryString = params.toString();
      const url = queryString ? `/products?${queryString}` : '/products';
      
      const products = await api.get<Product[]>(url, {
        timeout: API_TIMEOUT,
      });
      set({ products: products.data, isLoading: false });
    } catch (error) {
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Failed to fetch products";
      console.error("Error fetching products:", error);
      toast.error(errMsg);
      set({
        isLoading: false,
        error: errMsg,
      });
    }
  },
  

  // Fetch a single product by ID
  fetchProductById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const product = await api.get(`/products/${id}`, {
        timeout: API_TIMEOUT,
      });
      set({ currentProduct: product.data, isLoading: false });
    } catch (error) {
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : `Failed to fetch product with ID ${id}`;
      console.error(`Error fetching product with ID ${id}:`, error);
      toast.error(errMsg);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to fetch product with ID ${id}`,
      });
    }
  },

  // Create a new product
  createProduct: async (productData: ProductFormData) => {
    try {
      set({ isLoading: true, error: null });
      const newProduct = await productService.createProduct(productData);
      // Add new product at the beginning (newest first)
      set((state) => ({
        products: [newProduct, ...state.products],
        currentProduct: null,
        isLoading: false,
      }));
      return {status: 201};
    } catch (error: any) {
      console.error("Error creating product:", error);
      set({ isLoading: false });
      // Re-throw the error so the form can catch it
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (id: string, productData: ProductFormData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch(`/products/${id}`, productData);
      if (response.data && response.status === 200) {
        const updatedProduct = response.data;
        // Update the products list and current product
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? updatedProduct : p
          ),
          currentProduct: null,
          isLoading: false,
        }));
        return { status: response.status };
      }
      // If we get here, the response was not as expected
      set({ isLoading: false });
      throw new Error('Unexpected response from server');
    } catch (error: any) {
      console.error(`Error updating product with ID ${id}:`, error);
      set({ isLoading: false });
      // Re-throw the error so the form can catch it
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await productService.deleteProduct(id);
      // Remove the product from the list
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        currentProduct:
          state.currentProduct?.id === id ? null : state.currentProduct,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to delete product with ID ${id}`,
      });
      return false;
    }
  },

  // Set current product
  setCurrentProduct: (product: Product | null) => {
    set({ currentProduct: product });
  },

  // Set open dialog
  setOpenDialog: (open: boolean) => {
    set({ openDialog: open });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
