import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useWishlistStore } from '@/store';
import { useAddToWishlist } from '@/hooks/api';
import { formatPrice, truncateText } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist } = useWishlistStore();
  const { addProduct, removeProduct } = useAddToWishlist();
  const inWishlist = isInWishlist(product.id, 'product');

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (inWishlist) {
        await removeProduct.mutateAsync(product.id);
      } else {
        await addProduct.mutateAsync(product.id);
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
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
        {!product.isActive && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {truncateText(product.description, 100)}
            </p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {renderStars(Math.round(product.rating))}
            <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">
            {product.reviews?.length || 0} reviews
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/products/${product.id}`}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 rounded-md transition-colors"
            >
              View Details
            </Link>
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Buy Now
            </a>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span>SKU: {product.sku}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {product.category.name}
          </span>
        </div>
      </div>
    </div>
  );
}
