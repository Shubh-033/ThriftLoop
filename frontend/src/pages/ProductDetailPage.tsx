import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatIndianPrice } from '../utils/format';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={images[mainImage]}
          alt="Product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              mainImage === index
                ? 'ring-2 ring-primary-500 ring-offset-2'
                : 'ring-1 ring-gray-200'
            }`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Example product data - replace with actual data from API
  const product = {
    id: '1',
    title: 'Designer Anarkali Suit',
    price: 3499,
    description: 'Beautiful designer Anarkali suit in royal blue color with golden embroidery. Worn only once for a wedding function. In excellent condition.',
    category: 'Ethnic Wear',
    condition: 'Like New',
    size: 'M',
    brand: 'Designer Brand',
    color: 'Royal Blue',
    images: [
      '/images/products/anarkali1.jpg',
      '/images/products/anarkali2.jpg',
      '/images/products/anarkali3.jpg',
      '/images/products/anarkali4.jpg',
    ],
    seller: {
      id: 'seller1',
      username: 'fashionista_delhi',
      profilePic: '/images/avatars/seller.jpg',
      rating: 4.8,
      totalSales: 45,
      joinedDate: '2023-01-15',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Back button */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product gallery */}
          <ImageGallery images={product.images} />

          {/* Product info */}
          <div className="mt-8 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-primary-500"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-6 w-6 text-primary-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                {formatIndianPrice(product.price)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Free shipping across India
              </p>
            </div>

            {/* Product metadata */}
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm font-medium text-gray-500">Condition</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.condition}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm font-medium text-gray-500">Size</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.size}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm font-medium text-gray-500">Brand</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.brand}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm font-medium text-gray-500">Color</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.color}
                  </p>
                </div>
              </div>
            </div>

            {/* Product description */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Seller info */}
            <div className="mt-8 rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={product.seller.profilePic}
                  alt={product.seller.username}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {product.seller.username}
                  </h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {product.seller.rating} ★
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {product.seller.totalSales} sales
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Link
                  to={`/chat/${product.seller.id}`}
                  className="flex items-center justify-center space-x-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span>Chat with Seller</span>
                </Link>
                <button
                  onClick={() => {
                    // Share functionality
                  }}
                  className="flex items-center justify-center space-x-2 rounded-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
