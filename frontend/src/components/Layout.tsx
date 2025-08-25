import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                ThriftLoop
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Home
                </Link>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Shop
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/cart" className="text-gray-600 hover:text-gray-900 p-2">
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
              {user ? (
                <div className="ml-4 flex items-center">
                  <Link to="/profile" className="text-gray-600 hover:text-gray-900 p-2">
                    <UserCircleIcon className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="ml-4 text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
