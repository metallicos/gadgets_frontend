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
    <article className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <svg
            className={`h-5 w-5 ${inWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none"
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
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            {article.category.name}
          </span>
          <span className="mx-2">•</span>
          <time dateTime={article.publishedAt || article.createdAt}>
            {formatDateLocal(article.publishedAt || article.createdAt)}
          </time>
        </div>
        
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {getExcerpt(article.content)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">
                  {article.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                {article.author.name}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {article.comments?.length || 0} comments
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {article.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                #{tag.name}
              </span>
            ))}
            {article.tags && article.tags.length > 2 && (
              <span className="text-xs text-gray-500">
                +{article.tags.length - 2} more
              </span>
            )}
          </div>
          
          <Link
            href={`/articles/${article.slug}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
