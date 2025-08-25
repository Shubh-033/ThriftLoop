import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import { formatIndianPrice } from '../utils/format';

const priceRanges = [
  { min: 0, max: 500, label: 'Under ₹500' },
  { min: 500, max: 1000, label: '₹500 - ₹1,000' },
  { min: 1000, max: 2000, label: '₹1,000 - ₹2,000' },
  { min: 2000, max: 5000, label: '₹2,000 - ₹5,000' },
  { min: 5000, max: null, label: 'Above ₹5,000' },
];

const categories = [
  'Ethnic Wear',
  'Western Wear',
  'Streetwear',
  'Formal Wear',
  'Casual Wear',
  'Accessories',
  'Footwear',
];

const conditions = ['New', 'Like New', 'Good', 'Fair'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const ShopPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-gray-900">Shop</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 md:hidden"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Categories</h3>
                <div className="mt-4 space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategory([...selectedCategory, category]);
                          } else {
                            setSelectedCategory(
                              selectedCategory.filter((c) => c !== category)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Price Range</h3>
                <div className="mt-4 space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPriceRange.includes(range.min)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPriceRange([...selectedPriceRange, range.min]);
                          } else {
                            setSelectedPriceRange(
                              selectedPriceRange.filter((p) => p !== range.min)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Condition</h3>
                <div className="mt-4 space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCondition.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCondition([...selectedCondition, condition]);
                          } else {
                            setSelectedCondition(
                              selectedCondition.filter((c) => c !== condition)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-600">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Size</h3>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        if (selectedSize.includes(size)) {
                          setSelectedSize(selectedSize.filter((s) => s !== size));
                        } else {
                          setSelectedSize([...selectedSize, size]);
                        }
                      }}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        selectedSize.includes(size)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 24 results</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 py-1.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example products - replace with actual data */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <ProductCard
                  key={index}
                  product={{
                    id: `product-${index}`,
                    title: 'Designer Kurti Set',
                    price: 1999,
                    images: ['/images/products/sample.jpg'],
                    size: 'M',
                    condition: 'Like New',
                    seller: {
                      username: 'trendystore',
                      profilePic: '/images/avatars/user.jpg',
                    },
                  }}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button className="rounded-full bg-primary-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed bottom-0 right-0 top-0 w-full max-w-xs bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile filter options - same as desktop but styled for mobile */}
              <div className="mt-6 space-y-6">
                {/* Categories */}
                {/* Price Range */}
                {/* Condition */}
                {/* Size */}
                {/* Copy the filter sections from desktop and adjust styling */}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full rounded-full bg-primary-600 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
