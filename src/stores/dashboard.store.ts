import { create } from 'zustand';
import axios from '../config/axios';

// Types for backend data
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?: ProductCategory;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

// Dashboard data types
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalPartners: number;
  totalUsers: number;
  newProductsThisMonth: number;
  newPartnersThisMonth: number;
  newUsersThisMonth: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentProducts: Product[];
  recentPartners: Partner[];
  productCategories: ProductCategory[];
  recentUsers: User[];
}

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

// Default empty dashboard data
const emptyDashboardData: DashboardData = {
  stats: {
    totalProducts: 0,
    totalCategories: 0,
    totalPartners: 0,
    totalUsers: 0,
    newProductsThisMonth: 0,
    newPartnersThisMonth: 0,
    newUsersThisMonth: 0
  },
  recentProducts: [],
  recentPartners: [],
  productCategories: [],
  recentUsers: []
};

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchDashboardData: async () => {
    try {
      set({ loading: true, error: null });
      
      // Fetch data from multiple endpoints in parallel
      const [
        productsResponse,
        categoriesResponse,
        partnersResponse,
        usersResponse
      ] = await Promise.all([
        axios.get('/products'),
        axios.get('/product-categories'),
        axios.get('/partners'),
        axios.get('/users')
      ]);

      // Validate responses
      if (!productsResponse?.data || !Array.isArray(productsResponse.data)) {
        throw new Error('Invalid products data received');
      }
      
      if (!categoriesResponse?.data || !Array.isArray(categoriesResponse.data)) {
        throw new Error('Invalid categories data received');
      }
      
      if (!partnersResponse?.data || !Array.isArray(partnersResponse.data)) {
        throw new Error('Invalid partners data received');
      }
      
      if (!usersResponse?.data || !Array.isArray(usersResponse.data)) {
        throw new Error('Invalid users data received');
      }

      const products = productsResponse.data;
      const categories = categoriesResponse.data;
      const partners = partnersResponse.data;
      const users = usersResponse.data;

      // Calculate stats
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      // Count items created this month
      const newProductsThisMonth = products.filter(
        (product: Product) => new Date(product.createdAt) >= firstDayOfMonth
      ).length;
      
      const newPartnersThisMonth = partners.filter(
        (partner: Partner) => new Date(partner.createdAt) >= firstDayOfMonth
      ).length;
      
      const newUsersThisMonth = users.filter(
        (user: User) => new Date(user.createdAt) >= firstDayOfMonth
      ).length;

      // Add category information to products
      const productsWithCategories = products.map((product: Product) => {
        const category = categories.find((cat: ProductCategory) => cat.id === product.categoryId);
        return { ...product, category };
      });

      // Sort by creation date (newest first)
      const sortByDate = (a: { createdAt: string }, b: { createdAt: string }) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      const recentProducts = [...productsWithCategories].sort(sortByDate).slice(0, 5);
      const recentPartners = [...partners].sort(sortByDate).slice(0, 5);
      const recentUsers = [...users].sort(sortByDate).slice(0, 5);

      // Prepare dashboard data
      const dashboardData: DashboardData = {
        stats: {
          totalProducts: products.length,
          totalCategories: categories.length,
          totalPartners: partners.length,
          totalUsers: users.length,
          newProductsThisMonth,
          newPartnersThisMonth,
          newUsersThisMonth
        },
        recentProducts,
        recentPartners,
        productCategories: categories,
        recentUsers
      };

      set({ data: dashboardData, loading: false });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      set({ 
        error: err instanceof Error ? err.message : 'Failed to load dashboard data', 
        loading: false,
        data: emptyDashboardData // Provide empty data on error for graceful degradation
      });
    }
  }
}));

export default useDashboardStore;
