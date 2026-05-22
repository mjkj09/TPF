import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, TrendingDown } from 'lucide-react';

const categories = ['Technic', 'Star Wars', 'City', 'Icons', 'Creator', 'Friends'];

const hotDeals = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R',
    number: '42210',
    image: 'https://images.unsplash.com/photo-1768029630578-c9e70bccac90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 1899,
    newPrice: 1499,
    discount: 21,
    series: 'Technic'
  },
  {
    id: 2,
    name: 'Millennium Falcon',
    number: '75192',
    image: 'https://images.unsplash.com/photo-1616646131606-473894f0fed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 3999,
    newPrice: 3199,
    discount: 20,
    series: 'Star Wars'
  },
  {
    id: 3,
    name: 'Police Station',
    number: '60316',
    image: 'https://images.unsplash.com/photo-1759663176274-6d3fa700b87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 899,
    newPrice: 649,
    discount: 28,
    series: 'City'
  },
  {
    id: 4,
    name: 'Taj Mahal',
    number: '21056',
    image: 'https://images.unsplash.com/photo-1776212642413-82b859d7ac71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 499,
    newPrice: 379,
    discount: 24,
    series: 'Icons'
  },
  {
    id: 5,
    name: 'Porsche 911 RSR',
    number: '42160',
    image: 'https://images.unsplash.com/photo-1741745880109-7c1744ca0ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 1599,
    newPrice: 1199,
    discount: 25,
    series: 'Technic'
  },
  {
    id: 6,
    name: 'AT-AT Walker',
    number: '75313',
    image: 'https://images.unsplash.com/photo-1518457032933-2da6b92f088e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    oldPrice: 2999,
    newPrice: 2399,
    discount: 20,
    series: 'Star Wars'
  }
];

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
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-48 object-cover"
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
                  <span className="text-2xl text-red-600">{deal.newPrice} zł</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}