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
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover border border-gray-100">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
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
        
        {!product.isActive ? (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-full">
            Out of Stock
          </div>
        ) : (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-semibold rounded-full">
            {product.category.name}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <Link href={`/products/${product.id}`} className="block group">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {truncateText(product.description, 100)}
          </p>
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(Math.round(product.rating))}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            SKU: {product.sku}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-center hover:scale-105"
          >
            View Details
          </Link>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl transition-all duration-200 text-center hover:scale-105 shadow-lg"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
