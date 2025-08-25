import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';

const categories = [
  {
    name: 'Ethnic Wear',
    image: '/images/categories/ethnic.jpg',
    href: '/shop/ethnic',
  },
  {
    name: 'Western Wear',
    image: '/images/categories/western.jpg',
    href: '/shop/western',
  },
  {
    name: 'Streetwear',
    image: '/images/categories/street.jpg',
    href: '/shop/street',
  },
  {
    name: 'Accessories',
    image: '/images/categories/accessories.jpg',
    href: '/shop/accessories',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative flex h-full items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl px-4"
          >
            <h1 className="font-display text-4xl font-bold text-white sm:text-6xl">
              Discover Unique Fashion at
              <span className="text-primary-400"> Thrift Prices</span>
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Join the sustainable fashion movement. Buy and sell pre-loved clothing
              that tells a story.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/shop"
                className="rounded-full bg-primary-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                Start Shopping
              </Link>
              <Link
                to="/sell"
                className="rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Start Selling
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-4 text-gray-600">
              Explore our curated collection of pre-loved fashion
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Link to={category.href} className="block aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900">
                Trending Now
              </h2>
              <p className="mt-2 text-gray-600">
                Popular items that are making waves
              </p>
            </div>
            <Link
              to="/shop"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <span>View all</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Example trending products - replace with actual data */}
            {[1, 2, 3, 4].map((index) => (
              <ProductCard
                key={index}
                product={{
                  id: `trend-${index}`,
                  title: 'Vintage Denim Jacket',
                  price: 1499,
                  images: ['/images/products/sample.jpg'],
                  size: 'M',
                  condition: 'Like New',
                  seller: {
                    username: 'fashionista',
                    profilePic: '/images/avatars/user.jpg',
                  },
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 p-2.5 text-primary-600">
                {/* Add icon */}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                Authentic Products
              </h3>
              <p className="mt-2 text-gray-600">
                Every item is verified for authenticity and quality
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 p-2.5 text-primary-600">
                {/* Add icon */}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                Secure Payments
              </h3>
              <p className="mt-2 text-gray-600">
                Safe and secure payment options for peace of mind
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 p-2.5 text-primary-600">
                {/* Add icon */}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                Sustainable Fashion
              </h3>
              <p className="mt-2 text-gray-600">
                Join us in reducing fashion waste and promoting sustainability
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
