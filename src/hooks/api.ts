import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  productsApi, 
  articlesApi, 
  categoriesApi, 
  authApi, 
  commentsApi, 
  reviewsApi,
  wishlistApi,
  newsletterApi
} from '@/services/api';
import { useAuthStore } from '@/store';

// Auth hooks
export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
    },
  });
};

// Products hooks
export const useProducts = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.getFeatured,
  });
};

export const useProductsByCategory = (categorySlug: string, params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug, params],
    queryFn: () => productsApi.getByCategory(categorySlug, params),
    enabled: !!categorySlug,
  });
};

// Articles hooks
export const useArticles = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articlesApi.getAll(params),
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.getById(id),
    enabled: !!id,
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['article', 'slug', slug],
    queryFn: () => articlesApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: articlesApi.getFeatured,
  });
};

export const useArticlesByCategory = (categorySlug: string, params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['articles', 'category', categorySlug, params],
    queryFn: () => articlesApi.getByCategory(categorySlug, params),
    enabled: !!categorySlug,
  });
};

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });
};

export const useCategoryTree = () => {
  return useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: categoriesApi.getTree,
  });
};

// Comments hooks
export const useProductComments = (productId: string) => {
  return useQuery({
    queryKey: ['comments', 'product', productId],
    queryFn: () => commentsApi.getByProduct(productId),
    enabled: !!productId,
  });
};

export const useArticleComments = (articleId: string) => {
  return useQuery({
    queryKey: ['comments', 'article', articleId],
    queryFn: () => commentsApi.getByArticle(articleId),
    enabled: !!articleId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: commentsApi.create,
    onSuccess: (_, variables) => {
      if (variables.productId) {
        queryClient.invalidateQueries({
          queryKey: ['comments', 'product', variables.productId.toString()],
        });
      }
      if (variables.articleId) {
        queryClient.invalidateQueries({
          queryKey: ['comments', 'article', variables.articleId.toString()],
        });
      }
    },
  });
};

// Reviews hooks
export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => reviewsApi.getByProduct(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', 'product', variables.productId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', variables.productId.toString()],
      });
    },
  });
};

// Wishlist hooks
export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.get,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return {
    addProduct: useMutation({
      mutationFn: wishlistApi.addProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      },
    }),
    removeProduct: useMutation({
      mutationFn: wishlistApi.removeProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      },
    }),
    addArticle: useMutation({
      mutationFn: wishlistApi.addArticle,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      },
    }),
    removeArticle: useMutation({
      mutationFn: wishlistApi.removeArticle,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      },
    }),
  };
};

// Newsletter hooks
export const useNewsletter = () => {
  return {
    subscribe: useMutation({
      mutationFn: newsletterApi.subscribe,
    }),
    unsubscribe: useMutation({
      mutationFn: newsletterApi.unsubscribe,
    }),
  };
};
