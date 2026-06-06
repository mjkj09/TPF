import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, TrendingDown } from 'lucide-react';
import { mockProducts } from '@/app/data/mockProducts';
import { getMockImage } from '@/app/data/getMockImage';

const categories = ['Technic', 'Star Wars', 'City', 'Icons', 'Creator', 'Friends'];

const hotDeals = mockProducts.slice(0, 6).map((product) => ({
  ...product,
  discount: Math.round((1 - product.price / product.oldPrice) * 100),
}));

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl mb-6 text-gray-900">Znajdź najlepsze ceny na zestawy LEGO</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-3xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj zestawów..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </form>

          {/* Categories */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/search?category=${encodeURIComponent(category)}`}
                className="px-6 py-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full whitespace-nowrap transition-colors text-gray-700"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl text-gray-900">Gorące okazje</h2>
          <span className="text-sm text-gray-500 ml-2">Największe spadki cen w ciągu ostatnich 24h</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((deal) => (
            <Link
              key={deal.id}
              to={`/product/${deal.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left"
            >
              <div className="relative">
                <img
                  src={getMockImage(deal.image)}
                  alt={deal.name}
                  className="w-full h-48 object-contain bg-gray-50 p-4"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full">
                  -{deal.discount}%
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{deal.series}</div>
                <h3 className="text-gray-900 mb-1">{deal.name}</h3>
                <div className="text-sm text-gray-600 mb-3">#{deal.number}</div>

                <div className="flex items-end gap-3">
                  <span className="text-sm text-gray-400 line-through">{deal.oldPrice} zł</span>
                  <span className="text-2xl text-red-600">{deal.price} zł</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}