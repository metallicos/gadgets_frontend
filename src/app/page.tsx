'use client';

import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import ArticleCard from '@/components/ui/ArticleCard';
import { useFeaturedProducts, useFeaturedArticles } from '@/hooks/api';
import Link from 'next/link';

export default function HomePage() {
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const { data: featuredArticles, isLoading: articlesLoading } = useFeaturedArticles();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Discover Amazing Home Gadgets
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Get expert reviews, detailed comparisons, and find the perfect gadgets for your home.
              We help you make informed decisions with honest reviews and practical advice.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Browse Products
              </Link>
              <Link
                href="/articles"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                Read Articles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-600">
                Handpicked gadgets that we highly recommend
              </p>
            </div>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Products →
            </Link>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No featured products</h3>
              <p className="mt-1 text-sm text-gray-500">Featured products will appear here once added.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
              <p className="mt-2 text-gray-600">
                Expert insights and buying guides for home gadgets
              </p>
            </div>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Articles →
            </Link>
          </div>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : featuredArticles && featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No featured articles</h3>
              <p className="mt-1 text-sm text-gray-500">Featured articles will appear here once published.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Stay Updated with Latest Gadgets
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Subscribe to our newsletter and never miss a review or deal.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-md border-0 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-r-md hover:bg-gray-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
