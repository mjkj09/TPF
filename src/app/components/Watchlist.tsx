import { Link } from 'react-router';
import { ChevronLeft, Bell, TrendingDown, TrendingUp, Minus, ExternalLink } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

const watchedSets = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R',
    number: '42210',
    image: 'https://images.unsplash.com/photo-1768029630578-c9e70bccac90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    currentPrice: 1499,
    alertThreshold: 1400,
    priceChange: -21,
    changeType: 'down',
    autoBuy: false,
    series: 'Technic',
    bestStore: 'LEGO.com',
    bestStoreLogo: '🏪',
  },
  {
    id: 2,
    name: 'Millennium Falcon',
    number: '75192',
    image: 'https://images.unsplash.com/photo-1616646131606-473894f0fed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    currentPrice: 3199,
    alertThreshold: 2999,
    priceChange: -20,
    changeType: 'down',
    autoBuy: true,
    series: 'Star Wars',
    bestStore: 'Allegro',
    bestStoreLogo: '🛒',
  },
  {
    id: 3,
    name: 'Taj Mahal',
    number: '21056',
    image: 'https://images.unsplash.com/photo-1776212642413-82b859d7ac71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    currentPrice: 379,
    alertThreshold: 350,
    priceChange: -24,
    changeType: 'down',
    autoBuy: false,
    series: 'Icons',
    bestStore: 'LEGO.com',
    bestStoreLogo: '🏪',
  },
  {
    id: 4,
    name: 'Police Station',
    number: '60316',
    image: 'https://images.unsplash.com/photo-1759663176274-6d3fa700b87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    currentPrice: 649,
    alertThreshold: 600,
    priceChange: 0,
    changeType: 'stable',
    autoBuy: false,
    series: 'City',
    bestStore: 'Empik',
    bestStoreLogo: '📚',
  },
  {
    id: 5,
    name: 'Porsche 911 RSR',
    number: '42160',
    image: 'https://images.unsplash.com/photo-1741745880109-7c1744ca0ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    currentPrice: 1199,
    alertThreshold: 1100,
    priceChange: -25,
    changeType: 'down',
    autoBuy: true,
    series: 'Technic',
    bestStore: 'MediaMarkt',
    bestStoreLogo: '📺',
  }
];

export default function Watchlist() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Powrót
          </Link>
          <h1 className="text-3xl text-gray-900">Moja Lista życzeń</h1>
          <p className="text-gray-600 mt-2">Obserwowane zestawy i alerty cenowe</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Na liście życzeń</div>
            <div className="text-3xl text-gray-900">{watchedSets.length}</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Aktywne alerty</div>
            <div className="text-3xl text-blue-600">3</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Autozakup włączony</div>
            <div className="text-3xl text-green-600">2</div>
          </div>
        </div>

        {/* Watched Sets List - Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Zestaw</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Seria</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Aktualna cena</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Próg alertu</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Zmiana</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Autozakup</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {watchedSets.map((set) => (
                  <tr key={set.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={set.image}
                          alt={set.name}
                          className="w-20 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="text-gray-900">{set.name}</div>
                          <div className="text-sm text-gray-500">#{set.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {set.series}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg text-gray-900">{set.currentPrice} zł</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-yellow-500" />
                        <input
                          type="number"
                          value={set.alertThreshold}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-gray-900"
                          readOnly
                        />
                        <span className="text-gray-600">zł</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {set.changeType === 'down' && (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingDown className="w-4 h-4" />
                          <span>{set.priceChange}%</span>
                        </div>
                      )}
                      {set.changeType === 'up' && (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>+{set.priceChange}%</span>
                        </div>
                      )}
                      {set.changeType === 'stable' && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Minus className="w-4 h-4" />
                          <span>0%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Switch.Root
                          checked={set.autoBuy}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            set.autoBuy ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <Switch.Thumb
                            className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                              set.autoBuy ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </Switch.Root>
                        {set.autoBuy && (
                          <span className="text-xs text-green-600">Włączony</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/product/${set.id}#store-offers`}
                        className="flex flex-col items-start gap-0.5 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm group"
                      >
                        <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                          Zobacz ofertę
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs text-gray-400">{set.bestStoreLogo} {set.bestStore} · {set.currentPrice} zł</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Watched Sets List - Mobile Cards */}
        <div className="md:hidden space-y-4">
          {watchedSets.map((set) => (
            <div key={set.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-4 mb-4">
                <img
                  src={set.image}
                  alt={set.name}
                  className="w-24 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {set.series}
                  </span>
                  <h3 className="text-gray-900 mt-1">{set.name}</h3>
                  <div className="text-sm text-gray-500">#{set.number}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aktualna cena</span>
                  <span className="text-lg text-gray-900">{set.currentPrice} zł</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Próg alertu</span>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-900">{set.alertThreshold} zł</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Zmiana ceny</span>
                  {set.changeType === 'down' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingDown className="w-4 h-4" />
                      <span>{set.priceChange}%</span>
                    </div>
                  )}
                  {set.changeType === 'up' && (
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{set.priceChange}%</span>
                    </div>
                  )}
                  {set.changeType === 'stable' && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Minus className="w-4 h-4" />
                      <span>0%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Autozakup</span>
                  <div className="flex items-center gap-2">
                    <Switch.Root
                      checked={set.autoBuy}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        set.autoBuy ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <Switch.Thumb
                        className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          set.autoBuy ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </Switch.Root>
                    {set.autoBuy && (
                      <span className="text-xs text-green-600">Włączony</span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to={`/product/${set.id}#store-offers`}
                className="w-full mt-4 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Zobacz ofertę — {set.bestStoreLogo} {set.bestStore}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <div className="text-sm text-blue-900 mb-1">Jak działają alerty?</div>
              <div className="text-sm text-blue-700">
                Otrzymasz powiadomienie e-mail, gdy cena zestawu spadnie poniżej ustawionego progu.
                Z funkcją Autozakup możesz automatycznie złożyć zamówienie w najlepszym sklepie.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}