import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    size: string;
    condition: string;
    seller: {
      username: string;
      profilePic: string;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Link
                to={`/product/${product.id}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50"
              >
                View Details
              </Link>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`rounded-full ${
                  isFavorite ? 'bg-primary-500 text-white' : 'bg-white text-gray-900'
                } p-2 shadow-sm transition-colors hover:bg-primary-500 hover:text-white`}
              >
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        <div className="absolute left-4 top-4 flex space-x-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
            {product.condition}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
            {product.size}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <div className="mt-1 flex items-center space-x-2">
            <img
              src={product.seller.profilePic}
              alt={product.seller.username}
              className="h-5 w-5 rounded-full"
            />
            <p className="text-sm text-gray-500">{product.seller.username}</p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
