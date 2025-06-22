'use client';

import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import ArticleCard from '@/components/ui/ArticleCard';
import { useFeaturedProducts, useFeaturedArticles } from '@/hooks/api';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const { data: featuredArticles, isLoading: articlesLoading } = useFeaturedArticles();
  const t = useTranslations('homepage');
  const tCommon = useTranslations('common');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27%23ffffff15%27%3e%3cpath d=%27m0 2 30 30%27/%3e%3cpath d=%27m2 0 30 30%27/%3e%3c/svg%3e')] opacity-20"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Floating Icons Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 animate-bounce delay-300">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  📱
                </div>
              </div>
              <div className="absolute top-32 right-16 animate-bounce delay-700">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  🏠
                </div>
              </div>
              <div className="absolute bottom-32 left-20 animate-bounce delay-1000">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  💡
                </div>
              </div>
              <div className="absolute bottom-40 right-8 animate-bounce delay-500">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  🔌
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {t('hero.title')} <span className="gradient-text">{t('hero.title')}</span>
                <br />
                <span className="text-3xl md:text-5xl text-blue-200">{t('hero.subtitle')}</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-blue-100 max-w-3xl mx-auto">
                {t('hero.description')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="group relative px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                >
                  <span className="relative z-10">{t('hero.exploreButton')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/articles"
                  className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 min-w-[200px]"
                >
                  <span>{t('hero.reviewsButton')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">{t('stats.gadgets')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">{t('stats.reviews')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50k+</div>
              <div className="text-gray-600">{t('stats.users')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">{t('stats.support')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('categories.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('categories.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '💡', titleKey: 'smartLighting.title', descKey: 'smartLighting.description', color: 'bg-yellow-500' },
              { icon: '🏠', titleKey: 'homeSecurity.title', descKey: 'homeSecurity.description', color: 'bg-red-500' },
              { icon: '🌡️', titleKey: 'climateControl.title', descKey: 'climateControl.description', color: 'bg-blue-500' },
              { icon: '🔊', titleKey: 'audioSystems.title', descKey: 'audioSystems.description', color: 'bg-purple-500' },
              { icon: '📺', titleKey: 'entertainment.title', descKey: 'entertainment.description', color: 'bg-green-500' },
              { icon: '🍳', titleKey: 'kitchenTech.title', descKey: 'kitchenTech.description', color: 'bg-orange-500' },
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 card-hover">
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`categories.${category.titleKey}`)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(`categories.${category.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('featuredProducts.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('featuredProducts.description')}
            </p>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 animate-pulse">
                  <div className="p-6 space-y-4">
                    <div className="h-48 bg-gray-300 rounded-xl"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="group">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('featuredProducts.noProducts')}</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {t('featuredProducts.noProductsDescription')}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                {tCommon('viewAll')} {tCommon('products')}
              </Link>
            </div>
          )}
          
          {/* View All Button */}
          {featuredProducts && featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {tCommon('viewAll')} {tCommon('products')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('featuredArticles.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('featuredArticles.description')}
            </p>
          </div>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredArticles && featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 6).map((article) => (
                <div key={article.id} className="group">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('featuredArticles.comingSoon')}</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {t('featuredArticles.comingSoonDescription')}
              </p>
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                {tCommon('viewAll')} {tCommon('articles')}
              </Link>
            </div>
          )}
          
          {/* View All Button */}
          {featuredArticles && featuredArticles.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {tCommon('readMore')} {tCommon('articles')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27%23ffffff10%27%3e%3cpath d=%27m0 2 30 30%27/%3e%3cpath d=%27m2 0 30 30%27/%3e%3c/svg%3e')] opacity-30"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('newsletter.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-6 py-4 rounded-xl border-0 text-gray-900 shadow-lg placeholder:text-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none text-lg"
                />
              </div>
              <button
                type="button"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                {tCommon('subscribe')}
              </button>
            </div>
            
            <p className="text-blue-200 text-sm mt-6">
              {t('newsletter.disclaimer')}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
