import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Bell, TrendingDown, TrendingUp, Minus, ExternalLink, Trash2, Pencil } from 'lucide-react';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Button';
import { ContentCard } from '../components/ContentCard';
import { PageHeader } from '../components/PageHeader';
import { PageLayout } from '../components/PageLayout';
import { StatCard } from '../components/StatCard';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { Checkbox } from '../components/ui/checkbox';
import { cardClass, pageContainer } from '../styles/tokens';
import { getMockProductById } from '@/app/data/mockProducts';
import { getMockImage } from '@/app/data/getMockImage';

function getRemovalMessage(count: number): string {
  if (count === 1) return 'Usunięto 1 zestaw z listy życzeń';
  if (count >= 2 && count <= 4) return `Usunięto ${count} zestawy z listy życzeń`;
  return `Usunięto ${count} zestawów z listy życzeń`;
}

const watchlistCheckboxClass =
  'size-5 rounded-md border-2 border-gray-300 bg-white shadow-sm data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white hover:border-blue-400 transition-colors';

const initialWatchedSets = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R',
    number: '42210',
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
  const [watchedSets, setWatchedSets] = useState(initialWatchedSets);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected = watchedSets.length > 0 && selectedIds.length === watchedSets.length;

  const toggleEditing = () => {
    setIsEditing((editing) => {
      if (editing) setSelectedIds([]);
      return !editing;
    });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : watchedSets.map((set) => set.id));
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    const count = selectedIds.length;
    setWatchedSets((sets) => sets.filter((set) => !selectedIds.includes(set.id)));
    setSelectedIds([]);
    toast.success(getRemovalMessage(count));

    if (count === watchedSets.length) {
      setIsEditing(false);
    }
  };

  const toggleAutoBuy = (id: number, enabled: boolean) => {
    setWatchedSets((sets) =>
      sets.map((set) => (set.id === id ? { ...set, autoBuy: enabled } : set)),
    );
  };

  const activeAlertsCount = watchedSets.length;
  const autoBuyCount = watchedSets.filter((set) => set.autoBuy).length;

  return (
    <PageLayout bare>
      <PageHeader>
        <BackLink className="mb-4" />
        <h1 className="text-3xl text-gray-900">Moja Lista życzeń</h1>
        <p className="text-gray-600 mt-2">Obserwowane zestawy i alerty cenowe</p>
      </PageHeader>

      <div className={`${pageContainer} py-8`}>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Na liście życzeń" value={watchedSets.length} />
          <StatCard
            label="Aktywne alerty"
            value={activeAlertsCount}
            valueClassName="text-blue-600"
          />
          <StatCard
            label="Autozakup włączony"
            value={autoBuyCount}
            valueClassName="text-green-600"
          />
        </div>

        {watchedSets.length === 0 ? (
          <ContentCard className="p-12 text-center">
            <p className="text-gray-600 mb-4">Twoja lista życzeń jest pusta.</p>
            <Button asChild variant="primary" size="lg">
              <Link to="/search">Przeglądaj zestawy</Link>
            </Button>
          </ContentCard>
        ) : (
          <>
        <div className="flex justify-end gap-2 mb-4">
          {isEditing && (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Usuń{selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}
            </Button>
          )}
          <Button
            type="button"
            variant={isEditing ? 'dark' : 'outline'}
            size="sm"
            onClick={toggleEditing}
          >
            <Pencil className="w-4 h-4" />
            {isEditing ? 'Gotowe' : 'Edytuj listę'}
          </Button>
        </div>

        {/* Watched Sets List - Desktop Table */}
        <div className={`hidden md:block ${cardClass} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <colgroup>
                {isEditing && <col style={{ width: '4.5rem' }} />}
                <col style={{ width: isEditing ? '24%' : '28%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: isEditing ? '14%' : '16%' }} />
              </colgroup>
              <thead className="bg-gray-50 border-b">
                <tr>
                  {isEditing && (
                    <th className="px-3 py-4 align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={toggleSelectAll}
                          aria-label="Zaznacz wszystkie"
                          className={watchlistCheckboxClass}
                        />
                      </div>
                    </th>
                  )}
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Zestaw</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Seria</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Aktualna cena</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Próg alertu</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Zmiana</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Autozakup</th>
                  <th className="px-4 py-4 text-left text-sm text-gray-600">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {watchedSets.map((set) => (
                  <tr key={set.id} className="hover:bg-gray-50">
                    {isEditing && (
                      <td className="px-3 py-4 align-middle">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selectedIds.includes(set.id)}
                            onCheckedChange={() => toggleSelect(set.id)}
                            aria-label={`Zaznacz ${set.name}`}
                            className={watchlistCheckboxClass}
                          />
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={getMockImage(getMockProductById(set.id)?.image ?? 'placeholder.svg')}
                          alt={set.name}
                          className="w-16 h-14 shrink-0 object-contain rounded bg-gray-50"
                        />
                        <div className="min-w-0">
                          <div className="text-gray-900 truncate">{set.name}</div>
                          <div className="text-sm text-gray-500">#{set.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                        {set.series}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <div className="text-lg text-gray-900">{set.currentPrice} zł</div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Bell className="w-4 h-4 shrink-0 text-yellow-500" />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={set.alertThreshold}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-900 text-sm"
                          readOnly
                        />
                        <span className="text-sm text-gray-600">zł</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
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
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-2">
                        <ToggleSwitch
                          checked={set.autoBuy}
                          onCheckedChange={(checked) => toggleAutoBuy(set.id, checked)}
                          color="green"
                        />
                        <span className={`text-xs w-14 ${set.autoBuy ? 'text-green-600' : 'invisible'}`}>
                          Włączony
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <Link
                        to={`/product/${set.id}#store-offers`}
                        className="inline-flex flex-col items-start gap-0.5 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm group"
                      >
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          Zobacz ofertę
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs text-gray-400 truncate max-w-full">
                          {set.bestStoreLogo} {set.bestStore} · {set.currentPrice} zł
                        </span>
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
              <div className="flex gap-4 mb-4 items-center">
                {isEditing && (
                  <Checkbox
                    checked={selectedIds.includes(set.id)}
                    onCheckedChange={() => toggleSelect(set.id)}
                    aria-label={`Zaznacz ${set.name}`}
                    className={watchlistCheckboxClass}
                  />
                )}
                <img
                  src={getMockImage(getMockProductById(set.id)?.image ?? 'placeholder.svg')}
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
                    <ToggleSwitch
                      checked={set.autoBuy}
                      onCheckedChange={(checked) => toggleAutoBuy(set.id, checked)}
                      color="green"
                    />
                    {set.autoBuy && (
                      <span className="text-xs text-green-600">Włączony</span>
                    )}
                  </div>
                </div>
              </div>

              <Button asChild variant="primary" fullWidth className="mt-4 py-2.5">
                <Link to={`/product/${set.id}#store-offers`}>
                  <ExternalLink className="w-4 h-4" />
                  <span>Zobacz ofertę — {set.bestStoreLogo} {set.bestStore}</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
          </>
        )}

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
    </PageLayout>
  );
}