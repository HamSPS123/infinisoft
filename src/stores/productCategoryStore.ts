import { create } from "zustand";
import type { Category, CategoryFormData } from "../types/categories.interface";
import { AxiosError } from "axios";
import api from "../config/axios";
import { toast } from "react-toastify";

interface ProductCategoryState {
    categories: Category[];
    currentCategory: Category | null;
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (category: CategoryFormData) => Promise<{status: number}>;
    updateCategory: (id: string, category: CategoryFormData) => Promise<{status: number}>;
    deleteCategory: (id: string) => Promise<void>;
    setCurrentCategory: (category: Category | null) => void;
    clearError: () => void;
}

const useProductCategoryStore = create<ProductCategoryState>((set, get) => ({
    categories: [],
    currentCategory: null,
    isLoading: false,
    error: null,
    fetchCategories: async () => {
        try {
            set({ isLoading: true, error: null });
            const categories = await api.get<Category[]>('/product-categories');
            set({ categories: categories.data, isLoading: false });
        } catch (error) {
            const errMsg =
                error instanceof AxiosError
                    ? error.response?.data?.message
                    : 'Failed to fetch categories';
            console.error('Error fetching categories:', error);
            toast.error(errMsg);
            set({
                isLoading: false,
                error: errMsg,
            });
        }
    },
    createCategory: async (category: CategoryFormData) => {
        try {
            set({ isLoading: true, error: null });
            const newCategory = await api.post<Category>('/product-categories', category);
            const categories = get().categories;
            // Add new category at the beginning (newest first)
            set({ categories: [newCategory.data, ...categories], isLoading: false });
            return { status: 201 };
        } catch (error) {
            console.error('Error creating category:', error);
            set({ isLoading: false });
            throw error;
        }
    },
    updateCategory: async (id: string, category: CategoryFormData) => {
        try {
            set({ isLoading: true, error: null });
            const updatedCategory = await api.patch<Category>(`/product-categories/${id}`, category);
            const categories = get().categories;
            set({ categories: categories.map(c => c.id === id ? updatedCategory.data : c), isLoading: false });
            return { status: 200 };
        } catch (error) {
            console.error('Error updating category:', error);
            set({ isLoading: false });
            throw error;
        }
    },
    deleteCategory: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            await api.delete(`/product-categories/${id}`);
            const categories = get().categories;
            set({ categories: categories.filter(c => c.id !== id), isLoading: false });
            toast.success('Category deleted successfully');
        } catch (error) {
            const errMsg =
                error instanceof AxiosError
                    ? error.response?.data?.message
                    : 'Failed to delete category';
            console.error('Error deleting category:', error);
            toast.error(errMsg);
            set({
                isLoading: false,
                error: errMsg,
            });
        }
    },
    setCurrentCategory: (category: Category | null) => {
        set({ currentCategory: category });
    },
    clearError: () => {
        set({ error: null });
    },
}));

export default useProductCategoryStore;

