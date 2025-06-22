import api from '@/lib/api';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User, 
  Product, 
  Article, 
  Category,
  PaginatedResponse 
} from '@/types';

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getByCategory: async (categorySlug: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const response = await api.get(`/products/category/${categorySlug}`, { params });
    return response.data;
  },
};

// Articles API
export const articlesApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<Article>> => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Article> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Article> => {
    const response = await api.get(`/articles/slug/${slug}`);
    return response.data;
  },

  getFeatured: async (): Promise<Article[]> => {
    const response = await api.get('/articles/featured');
    return response.data;
  },

  getByCategory: async (categorySlug: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Article>> => {
    const response = await api.get(`/articles/category/${categorySlug}`, { params });
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  getTree: async (): Promise<Category[]> => {
    const response = await api.get('/categories/tree');
    return response.data;
  },
};

// Comments API
export const commentsApi = {
  create: async (data: {
    content: string;
    productId?: number;
    articleId?: number;
  }) => {
    const response = await api.post('/comments', data);
    return response.data;
  },

  getByProduct: async (productId: string) => {
    const response = await api.get(`/comments/product/${productId}`);
    return response.data;
  },

  getByArticle: async (articleId: string) => {
    const response = await api.get(`/comments/article/${articleId}`);
    return response.data;
  },
};

// Reviews API
export const reviewsApi = {
  create: async (data: {
    content: string;
    rating: number;
    productId: number;
  }) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  getByProduct: async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },
};

// Wishlist API
export const wishlistApi = {
  get: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  addProduct: async (productId: number) => {
    const response = await api.post('/wishlist/product', { productId });
    return response.data;
  },

  removeProduct: async (productId: number) => {
    const response = await api.delete(`/wishlist/product/${productId}`);
    return response.data;
  },

  addArticle: async (articleId: number) => {
    const response = await api.post('/wishlist/article', { articleId });
    return response.data;
  },

  removeArticle: async (articleId: number) => {
    const response = await api.delete(`/wishlist/article/${articleId}`);
    return response.data;
  },
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  unsubscribe: async (token: string) => {
    const response = await api.post('/newsletter/unsubscribe', { token });
    return response.data;
  },
};
