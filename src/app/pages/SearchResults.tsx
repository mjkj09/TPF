import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { mockProducts } from '@/app/data/mockProducts';
import { seriesOptions } from '@/app/data/categories';
import { Button } from '../components/Button';
import { ContentCard } from '../components/ContentCard';
import { PageHeader } from '../components/PageHeader';
import { PageLayout } from '../components/PageLayout';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { cardClass, pageContainer } from '../styles/tokens';
const ageOptions = ['Wszystkie', '4+', '6+', '7+', '10+', '16+', '18+'];
const priceRanges = [
  { label: 'Wszystkie', min: 0, max: Infinity },
  { label: 'Do 500 zł', min: 0, max: 500 },
  { label: '500 - 1000 zł', min: 500, max: 1000 },
  { label: '1000 - 2000 zł', min: 1000, max: 2000 },
  { label: '2000 - 4000 zł', min: 2000, max: 4000 },
  { label: 'Powyżej 4000 zł', min: 4000, max: Infinity }
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSeries, setSelectedSeries] = useState('Wszystkie');
  const [selectedAge, setSelectedAge] = useState('Wszystkie');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && seriesOptions.includes(category)) {
      setSelectedSeries(category);
    }
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.number.includes(searchQuery);

    const matchesSeries = selectedSeries === 'Wszystkie' || product.series === selectedSeries;
    const matchesAge = selectedAge === 'Wszystkie' || product.ageRange === selectedAge;

    const priceRange = priceRanges[selectedPriceRange];
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesSeries && matchesAge && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const clearFilters = () => {
    setSelectedSeries('Wszystkie');
    setSelectedAge('Wszystkie');
    setSelectedPriceRange(0);
  };

  const activeFiltersCount =
    (selectedSeries !== 'Wszystkie' ? 1 : 0) +
    (selectedAge !== 'Wszystkie' ? 1 : 0) +
    (selectedPriceRange !== 0 ? 1 : 0);

  return (
    <PageLayout bare>
      <PageHeader innerClassName="py-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Wyszukaj po nazwie lub numerze katalogowym..."
          size="md"
        />
      </PageHeader>

      <div className={`${pageContainer} py-6`}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className={`${cardClass} p-6 sticky top-20`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg text-gray-900">Filtry</h2>
                {activeFiltersCount > 0 && (
                  <Button variant="link" onClick={clearFilters}>
                    Wyczyść
                  </Button>
                )}
              </div>

              {/* Series Filter */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 mb-3">Seria</h3>
                <div className="space-y-2">
                  {seriesOptions.map((series) => (
                    <label key={series} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="series"
                        checked={selectedSeries === series}
                        onChange={() => setSelectedSeries(series)}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-sm text-gray-700">{series}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Filter */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 mb-3">Grupa wiekowa</h3>
                <div className="space-y-2">
                  {ageOptions.map((age) => (
                    <label key={age} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="age"
                        checked={selectedAge === age}
                        onChange={() => setSelectedAge(age)}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-sm text-gray-700">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm text-gray-700 mb-3">Cena</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === idx}
                        onChange={() => setSelectedPriceRange(idx)}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters Button */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="justify-between px-4 py-3"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filtry
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </Button>

              {filtersOpen && (
                <div className={`mt-4 ${cardClass} p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-gray-900">Filtry</h2>
                    <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
                      <X className="w-5 h-5 text-gray-500" />
                    </Button>
                  </div>

                  {/* Mobile Filters Content (same as desktop) */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-700 mb-2">Seria</h3>
                      <select
                        value={selectedSeries}
                        onChange={(e) => setSelectedSeries(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                      >
                        {seriesOptions.map((series) => (
                          <option key={series} value={series}>{series}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-700 mb-2">Grupa wiekowa</h3>
                      <select
                        value={selectedAge}
                        onChange={(e) => setSelectedAge(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                      >
                        {ageOptions.map((age) => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-700 mb-2">Cena</h3>
                      <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                      >
                        {priceRanges.map((range, idx) => (
                          <option key={idx} value={idx}>{range.label}</option>
                        ))}
                      </select>
                    </div>

                    <Button variant="secondary" fullWidth onClick={clearFilters}>
                      Wyczyść filtry
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                Znaleziono <span className="text-gray-900">{sortedProducts.length}</span> zestawów
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
              >
                <option value="popular">Najpopularniejsze</option>
                <option value="price-asc">Cena: od najniższej</option>
                <option value="price-desc">Cena: od najwyższej</option>
                <option value="name">Nazwa: A-Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <ContentCard className="p-12 text-center">
                <p className="text-gray-500">Nie znaleziono zestawów spełniających kryteria</p>
              </ContentCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="full" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}