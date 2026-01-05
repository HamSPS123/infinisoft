import { create } from "zustand";

interface ProductFormState {
  // Dialog state
  isOpen: boolean;
  mode: "create" | "edit";
  productId: string | null;
  
  // Actions
  openCreateDialog: () => void;
  openEditDialog: (productId: string) => void;
  closeDialog: () => void;
  setProductId: (id: string | null) => void;
}

export const useProductFormStore = create<ProductFormState>((set) => ({
  // Initial state
  isOpen: false,
  mode: "create",
  productId: null,

  // Open dialog in create mode
  openCreateDialog: () => {
    set({ isOpen: true, mode: "create", productId: null });
  },

  // Open dialog in edit mode with a specific product ID
  openEditDialog: (productId: string) => {
    set({ isOpen: true, mode: "edit", productId });
  },

  // Close the dialog
  closeDialog: () => {
    set({ isOpen: false });
  },

  // Set product ID
  setProductId: (id: string | null) => {
    set({ productId: id });
  },
}));
