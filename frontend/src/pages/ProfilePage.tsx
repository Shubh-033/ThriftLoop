import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { PlusIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  condition: string;
  category: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's listings
        const listingsRes = await fetch('/api/products/user/listings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const listingsData = await listingsRes.json();
        setListings(listingsData);

        // Fetch user's purchases
        const purchasesRes = await fetch('/api/orders/user/purchases', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const purchasesData = await purchasesRes.json();
        setPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleMarkAsSold = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}/sold`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        setListings(prevListings =>
          prevListings.map(listing =>
            listing._id === productId
              ? { ...listing, status: 'sold' }
              : listing
          )
        );
      }
    } catch (error) {
      console.error('Error marking product as sold:', error);
    }
  };

  const handleDeleteListing = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        setListings(prevListings =>
          prevListings.filter(listing => listing._id !== productId)
        );
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || '/default-avatar.png'}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/messages"
                className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link
                to="/add-product"
                className="flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tab.Group>
          <Tab.List className="flex space-x-4 rounded-xl bg-white p-1 shadow">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              My Listings
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              My Purchases
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-8">
            <Tab.Panel>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : listings.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-500">You haven't listed any items yet.</p>
                  <Link
                    to="/add-product"
                    className="mt-4 inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add your first product</span>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {listings.map(product => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard
                        product={product}
                        actions={
                          <div className="mt-4 flex space-x-2">
                            {product.status === 'available' && (
                              <button
                                onClick={() => handleMarkAsSold(product._id)}
                                className="flex-1 rounded-lg border border-primary-600 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50"
                              >
                                Mark as Sold
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteListing(product._id)}
                              className="flex-1 rounded-lg border border-red-600 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : purchases.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-500">You haven't made any purchases yet.</p>
                  <Link
                    to="/"
                    className="mt-4 inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <span>Browse products</span>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {purchases.map(product => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProfilePage;
