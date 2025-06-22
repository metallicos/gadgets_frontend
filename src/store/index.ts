import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface WishlistState {
  items: (string | number)[];
  addItem: (id: string | number, type: 'product' | 'article') => void;
  removeItem: (id: string | number, type: 'product' | 'article') => void;
  isInWishlist: (id: string | number, type: 'product' | 'article') => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id: string | number, type: 'product' | 'article') => {
        const itemKey = `${type}-${id}`;
        set((state) => ({
          items: [...state.items, itemKey],
        }));
      },
      removeItem: (id: string | number, type: 'product' | 'article') => {
        const itemKey = `${type}-${id}`;
        set((state) => ({
          items: state.items.filter((item) => item !== itemKey),
        }));
      },
      isInWishlist: (id: string | number, type: 'product' | 'article') => {
        const itemKey = `${type}-${id}`;
        return get().items.includes(itemKey);
      },
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: 'light',
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
