import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBagIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Sell', href: '/sell' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">ThriftLoop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <Link
              to="/wishlist"
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/chat"
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/profile"
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            >
              <UserCircleIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-gray-700 md:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-gray-200 bg-white py-3"
          >
            <div className="mx-auto max-w-3xl px-4">
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-full border-0 bg-gray-100 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-gray-200 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex items-center space-x-4 border-t border-gray-200 pt-4">
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
