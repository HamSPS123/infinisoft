/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { Customer, CustomerSchemaType } from "../types/customers.interface";
import api from "../config/axios";
import { toast } from "react-toastify";

interface CustomerStore {
    customers: Customer[];
    customer: Customer | null;
    loading: boolean;
    error: string | null;
    getCustomers: () => Promise<void>;
    getCustomer: (id: string) => Promise<void>;
    createCustomer: (customer: CustomerSchemaType) => Promise<{status: number}>;
    updateCustomer: (id: string, customer: CustomerSchemaType) => Promise<{status: number}>;
    deleteCustomer: (id: string) => Promise<void>;
}

const useCustomerStore = create<CustomerStore>((set, get) => ({
    customers: [],
    customer: null,
    loading: false,
    error: null,
    getCustomers: async () => {
        try {
            set({ loading: true });
            const response = await api.get('/customers');
            set({ customers: response.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
            set({ loading: false });
        }
    },
    getCustomer: async (id: string) => {
        try {
            set({ loading: true });
            const response = await api.get(`/customers/${id}`);
            if(response.status === 200) {
                set({ customer: response.data });
            }else{
                toast.error('Failed to fetch customer');
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            set({ loading: false });
        }
    },
    createCustomer: async (customer: CustomerSchemaType) => {
        try {
            set({ loading: true });
            const response = await api.post('/customers', customer);
            // Add new customer at the beginning (newest first)
            set({ customers: [response.data, ...get().customers], loading: false });
            return {status: response.status};
        } catch (error: any) {
            set({ loading: false });
            throw error;
        }
    },
    updateCustomer: async (id: string, customer: CustomerSchemaType) => {
        try {
            set({ loading: true });
            const response = await api.patch(`/customers/${id}`, customer);
            set({ customers: get().customers.map((c) => (c.id === id ? response.data : c)), loading: false });
            return {status: response.status};
        } catch (error: any) {
            set({ loading: false });
            throw error;
        }
    },
    deleteCustomer: async (id: string) => {
        try {
            set({ loading: true });
            const response = await api.delete(`/customers/${id}`);
            if(response.status === 200) {
                toast.success('Customer deleted successfully');
                set({ customers: get().customers.filter((c) => c.id !== id) });
            }else{
                toast.error('Failed to delete customer');
            }
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            set({ loading: false });
        }
    },
}))

export default useCustomerStore
    