'use client';

import { useState } from 'react';
import {useTranslations} from 'next-intl';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { useProducts, useCategories } from '@/hooks/api';

export default function ProductsPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    category: '',
  });

  const { data: productsData, isLoading: productsLoading } = useProducts(filters);
  const { data: categories } = useCategories();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handleCategoryChange = (categorySlug: string) => {
    setFilters(prev => ({ ...prev, category: categorySlug, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-2 text-gray-600">
              Discover amazing home gadgets with expert reviews and ratings
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  defaultValue={filters.search}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : productsData?.data && productsData.data.length > 0 ? (
            <>
              {/* Results Info */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing {((filters.page - 1) * productsData.itemsPerPage) + 1} to{' '}
                  {Math.min(filters.page * productsData.itemsPerPage, productsData.totalItems)} of{' '}
                  {productsData.totalItems} results
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {productsData.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {productsData.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, productsData.totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          filters.page === pageNumber
                            ? 'text-blue-600 bg-blue-50 border border-blue-500'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === productsData.totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filters.search || filters.category
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Products will appear here once added.'}
              </p>
              {(filters.search || filters.category) && (
                <button
                  onClick={() => setFilters({ page: 1, search: '', category: '' })}
                  className="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
