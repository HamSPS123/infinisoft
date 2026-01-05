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

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    try {
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

      // Prepare dashboard data
      return {
        stats: {
          totalProducts: products.length,
          totalCategories: categories.length,
          totalPartners: partners.length,
          totalUsers: users.length,
          newProductsThisMonth,
          newPartnersThisMonth,
          newUsersThisMonth
        },
        recentProducts: products.slice(0, 5).map((product: Product) => {
          // Find category for each product
          const category = categories.find((cat: ProductCategory) => cat.id === product.categoryId);
          return {
            ...product,
            category
          };
        }),
        recentPartners: partners.slice(0, 5),
        productCategories: categories,
        recentUsers: users.slice(0, 5)
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}

export default new DashboardService();
