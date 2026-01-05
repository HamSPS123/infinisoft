import api from '../config/axios';
import type { Product, ProductFormData } from '../types/product';

// Define API timeout (10 seconds) based on the memory about socket connection handling
const API_TIMEOUT = 10000;

export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products', {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  // Get a single product by ID
  async getProductById(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  // Create a new product
  async createProduct(productData: ProductFormData): Promise<Product> {
    const response = await api.post<Product>('/products', productData, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  // Update an existing product
  async updateProduct(id: string, productData: ProductFormData): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, productData, {
      timeout: API_TIMEOUT
    });
    return response.data;
  },

  // Delete a product
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`, {
      timeout: API_TIMEOUT
    });
  }
};
