import { Link, useParams } from 'react-router';
import { Heart, Bell, ChevronLeft, X, Mail, Zap, Check, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { getMockProductById, mockProducts } from '@/app/data/mockProducts';
import { getMockGallery } from '@/app/data/getMockImage';
import { getShopLogo } from '@/app/data/getShopLogo';

const priceHistory = [
  { date: '10.2025', price: 1699 },
  { date: '11.2025', price: 1749 },
  { date: '12.2025', price: 1899 },
  { date: '01.2026', price: 1799 },
  { date: '02.2026', price: 1650 },
  { date: '03.2026', price: 1599 },
  { date: '04.2026', price: 1499 }
];

const stores = [
  { id: 1, name: 'LEGO.com', logo: 'LEGO.png', price: 1499, availability: 'Dostępny', stock: 'Wysyłka 24h' },
  { id: 2, name: 'Allegro', logo: 'ALLEGRO.png', price: 1549, availability: 'Dostępny', stock: 'Wysyłka 2-3 dni' },
  { id: 3, name: 'Empik', logo: 'EMPIK.png', price: 1599, availability: 'Dostępny', stock: 'Wysyłka 24h' },
  { id: 4, name: 'MediaMarkt', logo: 'MEDIAMARKT.png', price: 1649, availability: 'Dostępny', stock: 'Odbiór w sklepie' },
  { id: 5, name: 'Euro RTV AGD', logo: 'RTVEUROAGD.jpg', price: 1699, availability: 'Ostatnie sztuki', stock: 'Wysyłka 24h' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = getMockProductById(Number(id)) ?? mockProducts[0];
  const images = getMockGallery(product.gallery ?? [product.image]);
  const CURRENT_PRICE = product.price;
  const discount =
    product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;
  const lowestStorePrice = Math.min(...stores.map((store) => store.price));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  // --- Modal state ---
  const [modalOpen, setModalOpen] = useState(false);
  const [threshold, setThreshold] = useState(String(Math.round(CURRENT_PRICE * 0.9)));
  const [emailAlert, setEmailAlert] = useState(true);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Zamknięcie przez Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Focus na input po otwarciu
  useEffect(() => {
    if (modalOpen) {
      setSaved(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [modalOpen]);

  const thresholdNum = Number(threshold);
  const saving = thresholdNum > 0 ? CURRENT_PRICE - thresholdNum : 0;
  const savingPct = thresholdNum > 0 ? Math.round((saving / CURRENT_PRICE) * 100) : 0;

  const applyPreset = (pct: number) => {
    setThreshold(String(Math.round(CURRENT_PRICE * (1 - pct / 100))));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setModalOpen(false), 1200);
  };

  // Scroll do sekcji ofert jeśli URL zawiera hash #store-offers
  useEffect(() => {
    if (window.location.hash === '#store-offers') {
      const el = document.getElementById('store-offers');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Powrót do listy
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square w-full mb-4 rounded-lg shadow-md bg-gray-50 overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square w-full rounded-md overflow-hidden bg-gray-50 cursor-pointer transition-opacity hover:opacity-75 ${
                    selectedImageIndex === idx ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:aspect-square md:min-h-0">
            <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col min-h-0 overflow-hidden">
              <div className="shrink-0">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {product.series}
                </span>
                <h1 className="text-2xl md:text-3xl text-gray-900 mt-3 mb-1">{product.name}</h1>
                <div className="text-sm text-gray-600">
                  Numer zestawu: <span className="text-gray-900 font-medium">#{product.number}</span>
                </div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col justify-center border-y border-gray-100 my-4 px-1">
                <div className="text-base text-gray-500 mb-3">Aktualna najniższa cena</div>
                <div className="flex items-end gap-4 flex-wrap">
                  <span className="text-5xl md:text-6xl text-red-600 leading-none font-semibold tracking-tight">
                    {product.price.toLocaleString('pl-PL')} zł
                  </span>
                  {discount > 0 && (
                    <span className="text-xl md:text-2xl text-gray-400 line-through pb-1">
                      {product.oldPrice.toLocaleString('pl-PL')} zł
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex items-center gap-2 mt-4 text-base text-red-600">
                    <TrendingDown className="w-5 h-5 shrink-0" />
                    <span className="font-medium">-{discount}% od ceny katalogowej</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <div className="text-sm text-gray-500">Grupa wiekowa</div>
                  <div className="text-gray-900">{product.ageRange}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Liczba elementów</div>
                  <div className="text-gray-900">{product.pieces.toLocaleString('pl-PL')} szt.</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-green-600">{product.availability}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Data premiery</div>
                  <div className="text-gray-900">03.2024</div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 mt-4 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm">
                  <Heart className="w-4 h-4" />
                  Dodaj do obserwowanych
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm"
                >
                  <Bell className="w-4 h-4" />
                  Ustaw alert cenowy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl text-gray-900 mb-6">Historia cen (ostatnie 6 miesięcy)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelStyle={{ color: '#374151' }}
              />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Najniższa cena</div>
              <div className="text-xl text-green-600">1,499 zł</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Najwyższa cena</div>
              <div className="text-xl text-gray-900">1,899 zł</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Średnia cena</div>
              <div className="text-xl text-gray-900">1,685 zł</div>
            </div>
          </div>
        </div>

        {/* Store Offers */}
        <div id="store-offers" className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl text-gray-900 mb-6">Oferty sklepów</h2>

          {/* Desktop Layout */}
          <div className="hidden md:block space-y-3">
            {stores.map((store) => {
              const isBestPrice = store.price === lowestStorePrice;

              return (
                <div
                  key={store.id}
                  className={`relative flex items-center justify-between p-4 rounded-lg transition-colors ${
                    isBestPrice
                      ? 'border-2 border-green-500 bg-green-50 shadow-sm'
                      : 'border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {isBestPrice && (
                    <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                      Najlepsza cena
                    </span>
                  )}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      <img
                        src={getShopLogo(store.logo)}
                        alt={store.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-gray-900">{store.name}</div>
                      <div className="text-sm text-gray-500">{store.stock}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-sm text-gray-500">Dostępność</div>
                      <div className="text-gray-900">{store.availability}</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl ${isBestPrice ? 'text-green-600 font-semibold' : 'text-gray-900'}`}>
                        {store.price} zł
                      </div>
                    </div>

                    <button
                      className={`px-6 py-2 text-white rounded-lg transition-colors whitespace-nowrap ${
                        isBestPrice
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      Idź do sklepu
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">
            {stores.map((store) => {
              const isBestPrice = store.price === lowestStorePrice;

              return (
                <div
                  key={store.id}
                  className={`relative p-4 rounded-lg ${
                    isBestPrice
                      ? 'border-2 border-green-500 bg-green-50 shadow-sm'
                      : 'border border-gray-200'
                  }`}
                >
                  {isBestPrice && (
                    <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                      Najlepsza cena
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      <img
                        src={getShopLogo(store.logo)}
                        alt={store.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{store.name}</div>
                      <div className="text-sm text-gray-500">{store.stock}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600">{store.availability}</div>
                    <div className={`text-2xl ${isBestPrice ? 'text-green-600 font-semibold' : 'text-gray-900'}`}>
                      {store.price} zł
                    </div>
                  </div>

                  <button
                    className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
                      isBestPrice
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Idź do sklepu
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========== MODAL ALERTU CENOWEGO ========== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ animation: 'modalIn 0.2s ease-out' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-gray-900">Alert cenowy</div>
                  <div className="text-xs text-gray-500">Nissan Skyline GT-R · #42210</div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Aktualna cena */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-500">Aktualna cena</span>
                <span className="text-gray-900">{CURRENT_PRICE.toLocaleString('pl-PL')} zł</span>
              </div>

              {/* Próg alertu */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Powiadom mnie, gdy cena spadnie poniżej
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="number"
                      min={1}
                      max={CURRENT_PRICE - 1}
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      className="w-full px-4 py-3 pr-14 border-2 border-gray-200 focus:border-yellow-400 rounded-xl outline-none transition-colors text-gray-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">zł</span>
                  </div>
                </div>

                {/* Podgląd oszczędności */}
                {thresholdNum > 0 && thresholdNum < CURRENT_PRICE && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-green-600">
                    <Zap className="w-3.5 h-3.5" />
                    Oszczędzasz {saving.toLocaleString('pl-PL')} zł ({savingPct}% taniej)
                  </div>
                )}
                {thresholdNum >= CURRENT_PRICE && thresholdNum > 0 && (
                  <div className="mt-2 text-sm text-red-500">
                    Próg musi być niższy niż aktualna cena
                  </div>
                )}
              </div>

              {/* Szybkie presety */}
              <div>
                <div className="text-xs text-gray-500 mb-2">Szybkie presety</div>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => applyPreset(pct)}
                      className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 transition-colors text-gray-700"
                    >
                      -{pct}%
                    </button>
                  ))}
                  <button
                    onClick={() => setThreshold(String(Math.min(...priceHistory.map(p => p.price))))}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors text-gray-700"
                  >
                    Min. historyczna
                  </button>
                </div>
              </div>

              {/* Powiadomienie e-mail */}
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-800">Powiadomienie e-mail</div>
                    <div className="text-xs text-gray-500">Wyślemy wiadomość gdy cena spadnie</div>
                  </div>
                </div>
                <button
                  onClick={() => setEmailAlert(!emailAlert)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${emailAlert ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailAlert ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleSave}
                disabled={thresholdNum <= 0 || thresholdNum >= CURRENT_PRICE}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white transition-all ${
                  saved
                    ? 'bg-green-500'
                    : thresholdNum > 0 && thresholdNum < CURRENT_PRICE
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Zapisano!
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    Zapisz alert
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}