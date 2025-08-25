import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import RatingDisplay from '../components/RatingDisplay';
import { formatCurrency } from '../utils/format';
import { useAuth } from '../context/AuthContext';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  size: string;
  condition: string;
  brand?: string;
  seller: {
    _id: string;
    name: string;
    avatar: string;
    ratings?: {
      seller: {
        rating: number;
        count: number;
      };
    };
  };
  status: 'available' | 'sold' | 'reserved';
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      // Check if product is in user's wishlist
      if (user) {
        const wishlistRes = await fetch('/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const wishlistData = await wishlistRes.json();
        setIsWishlisted(wishlistData.products.includes(id));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      // Redirect to login
      return;
    }

    try {
      const method = isWishlisted ? 'DELETE' : 'POST';
      const response = await fetch(`/api/wishlist/${id}`, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg ${
                    activeImage === index
                      ? 'ring-2 ring-primary-500'
                      : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {product.category}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {product.size}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {product.condition}
                </span>
              </div>
              {product.brand && (
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 whitespace-pre-wrap text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.seller.name}
                    </h3>
                    {product.seller.ratings?.seller && (
                      <RatingDisplay
                        rating={product.seller.ratings.seller.rating}
                        count={product.seller.ratings.seller.count}
                        size="sm"
                        type="seller"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 border-t border-gray-200 pt-6">
              {user && user._id !== product.seller._id && (
                <>
                  <Link
                    to={`/messages/${product.seller._id}?product=${product._id}`}
                    className="flex-1 rounded-lg bg-primary-600 py-3 text-center font-medium text-white hover:bg-primary-700"
                  >
                    <ChatBubbleLeftIcon className="mr-2 inline-block h-5 w-5" />
                    Chat with Seller
                  </Link>
                  <button
                    onClick={toggleWishlist}
                    className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-50"
                  >
                    {isWishlisted ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
