import { Link } from 'react-router';
import { MockProduct } from '../data/mockProducts';
import { getMockImage } from '../data/getMockImage';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: MockProduct;
  variant?: 'compact' | 'full';
}

export function ProductCard({ product, variant = 'full' }: ProductCardProps) {
  const hasDiscount = product.oldPrice > product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left"
    >
      <div className="relative">
        <ImageWithFallback
          src={getMockImage(product.image)}
          alt={product.name}
          className="w-full h-48 object-contain bg-gray-50 p-4"
        />
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.series}</div>
        <h3 className="text-gray-900 mb-1">{product.name}</h3>
        <div className={`text-sm text-gray-600 ${variant === 'full' ? 'mb-2' : 'mb-3'}`}>
          #{product.number}
        </div>

        {variant === 'full' && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>{product.ageRange}</span>
            <span>•</span>
            <span>{product.pieces} szt.</span>
          </div>
        )}

        <div className="flex items-end gap-3">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{product.oldPrice} zł</span>
          )}
          <span
            className={`text-2xl ${variant === 'compact' && hasDiscount ? 'text-red-600' : 'text-gray-900'}`}
          >
            {product.price} zł
          </span>
        </div>
      </div>
    </Link>
  );
}
