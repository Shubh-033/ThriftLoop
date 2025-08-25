import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              Welcome to ThriftLoop
            </h1>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              Your destination for sustainable fashion and unique finds.
              Shop pre-loved items and give them a second life.
            </p>
            <div className="mt-10">
              <Link
                to="/shop"
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Shopping</h3>
              <p className="text-gray-600">
                Support eco-friendly fashion by giving pre-loved items a new home
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Unique Finds</h3>
              <p className="text-gray-600">
                Discover one-of-a-kind pieces that tell their own stories
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                Simple, secure, and seamless shopping experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
