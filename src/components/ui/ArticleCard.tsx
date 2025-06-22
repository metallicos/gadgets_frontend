import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { useWishlistStore } from '@/store';
import { useAddToWishlist } from '@/hooks/api';
import { formatDate, stripHtml, truncateText } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { isInWishlist } = useWishlistStore();
  const { addArticle, removeArticle } = useAddToWishlist();
  const inWishlist = isInWishlist(article.id, 'article');

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (inWishlist) {
        await removeArticle.mutateAsync(article.id);
      } else {
        await addArticle.mutateAsync(article.id);
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  const formatDateLocal = (dateString: string) => {
    return formatDate(dateString);
  };

  const getExcerpt = (content: string, length: number = 150) => {
    const text = stripHtml(content);
    return truncateText(text, length);
  };

  return (
    <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover border border-gray-100">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <svg
            className={`h-5 w-5 ${inWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            fill={inWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-semibold rounded-full">
          {article.category.name}
        </div>
        
        <div className="absolute bottom-4 left-4 text-white">
          <time dateTime={article.publishedAt || article.createdAt} className="text-sm font-medium">
            {formatDateLocal(article.publishedAt || article.createdAt)}
          </time>
        </div>
      </div>
      
      <div className="p-6">
        <Link href={`/articles/${article.slug}`} className="block group-hover:text-blue-600 transition-colors duration-200">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-3">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {getExcerpt(article.content)}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">
                {article.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {article.author.name}
              </p>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {article.comments?.length || 0}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium"
              >
                #{tag.name}
              </span>
            ))}
            {article.tags && article.tags.length > 2 && (
              <span className="text-xs text-gray-500 px-3 py-1.5">
                +{article.tags.length - 2} more
              </span>
            )}
          </div>
          
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Read More
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
