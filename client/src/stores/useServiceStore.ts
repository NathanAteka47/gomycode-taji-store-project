import { create } from 'zustand';
import axios from 'axios';

interface Service {
  _id: string;
  title: string;
  description: string;
  iconUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceStore {
  services: Service[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchServices: () => Promise<void>;
  clearError: () => void;
  invalidateCache: () => void;
}

// Cache duration: 10 minutes (services don't change as often)
const CACHE_DURATION = 10 * 60 * 1000;

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchServices: async () => {
    const { lastFetched, services } = get();
    const now = Date.now();

    // Return cached data if it's still valid
    if (lastFetched && services.length > 0 && (now - lastFetched) < CACHE_DURATION) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`);
      
      if (Array.isArray(response.data)) {
        set({
          services: response.data,
          loading: false,
          lastFetched: now,
          error: null
        });
      } else {
        set({
          services: [],
          loading: false,
          error: 'Unexpected response format from server'
        });
      }
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to load services. Please try again later.',
        services: []
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  invalidateCache: () => {
    set({ lastFetched: null });
  }
})); 