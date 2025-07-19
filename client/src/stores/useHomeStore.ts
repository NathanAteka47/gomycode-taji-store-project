import { create } from 'zustand';
import axios from 'axios';

interface Package {
  type: 'Regular' | 'Standard' | 'VIP';
  price: number;
  inclusions: string[];
}

interface Home {
  _id: string;
  name: string;
  location: string;
  description: string;
  images: string[];
  packages: Package[];
  createdAt: string;
  updatedAt: string;
}

interface HomeStore {
  homes: Home[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchHomes: () => Promise<void>;
  clearError: () => void;
  invalidateCache: () => void;
}

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const useHomeStore = create<HomeStore>((set, get) => ({
  homes: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchHomes: async () => {
    const { lastFetched, homes } = get();
    const now = Date.now();

    // Return cached data if it's still valid
    if (lastFetched && homes.length > 0 && (now - lastFetched) < CACHE_DURATION) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/homes`);
      
      if (Array.isArray(response.data)) {
        set({
          homes: response.data,
          loading: false,
          lastFetched: now,
          error: null
        });
      } else {
        set({
          homes: [],
          loading: false,
          error: 'Unexpected response format from server'
        });
      }
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to load homes. Please try again later.',
        homes: []
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