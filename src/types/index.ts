export interface User {
  id: number;
  email: string;
  name: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  roles: string[];
  newsletterOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  parent?: Category;
  children: Category[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price: number;
  rating: number;
  category: Category;
  sku: string;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  reviews: Review[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  author: User;
  category: Category;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  comments: Comment[];
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  user: User;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  product?: Product;
  article?: Article;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Wishlist {
  id: number;
  user: User;
  products: Product[];
  articles: Article[];
}

export interface Newsletter {
  id: number;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  token: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  newsletterOptIn?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
