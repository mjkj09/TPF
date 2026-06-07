import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { TrendingDown } from 'lucide-react';
import { mockProducts } from '@/app/data/mockProducts';
import { homeCategories } from '@/app/data/categories';
import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';
import { PageLayout } from '../components/PageLayout';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { pageContainer } from '../styles/tokens';

const hotDeals = mockProducts.slice(0, 6);

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
    <PageLayout bare>
      <PageHeader innerClassName="py-8">
        <h1 className="text-3xl mb-6 text-gray-900">Znajdź najlepsze ceny na zestawy LEGO</h1>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Szukaj zestawów..."
          size="sm"
        />

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
          {homeCategories.map((category) => (
            <Button key={category} asChild variant="pill">
              <Link to={`/search?category=${encodeURIComponent(category)}`}>{category}</Link>
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className={`${pageContainer} py-8`}>
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl text-gray-900">Gorące okazje</h2>
          <span className="text-sm text-gray-500 ml-2">
            Największe spadki cen w ciągu ostatnich 24h
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((deal) => (
            <ProductCard key={deal.id} product={deal} variant="compact" />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
