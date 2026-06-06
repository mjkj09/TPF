import { useMemo, useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, MapPin, Save, CalendarDays, Sparkles } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useAuth } from '../contexts/AuthContext';

type PaymentMethod = {
  id: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
};

const initialPaymentMethods: PaymentMethod[] = [
  { id: '1', last4: '4242', expiry: '12/26', isDefault: true },
];

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

const billingHistory = [
  { name: 'Nissan Skyline GT-R', number: '42210', date: '15 marca 2026', price: 1499 },
  { name: 'Millennium Falcon', number: '75192', date: '28 lutego 2026', price: 3199 },
  { name: 'Police Station', number: '60316', date: '12 lutego 2026', price: 649 },
  { name: 'Porsche 911 RSR', number: '42096', date: '3 stycznia 2026', price: 1199 },
];

export default function Profile() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [newArrivals, setNewArrivals] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const resetPaymentForm = () => {
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setCardholderName('');
    setSetAsDefault(false);
  };

  const handleAddPaymentOpenChange = (open: boolean) => {
    setAddPaymentOpen(open);
    if (!open) {
      resetPaymentForm();
    }
  };

  const handleAddPaymentMethod = (event: React.FormEvent) => {
    event.preventDefault();

    const digits = cardNumber.replace(/\D/g, '');
    const expiryMatch = expiry.match(/^(\d{2})\/(\d{2})$/);
    const month = expiryMatch ? Number(expiryMatch[1]) : 0;

    if (digits.length !== 16) {
      toast.error('Podaj prawidłowy 16-cyfrowy numer karty');
      return;
    }

    if (!expiryMatch || month < 1 || month > 12) {
      toast.error('Podaj datę ważności w formacie MM/RR');
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error('Podaj prawidłowy kod CVV');
      return;
    }

    if (!cardholderName.trim()) {
      toast.error('Podaj imię i nazwisko na karcie');
      return;
    }

    const last4 = digits.slice(-4);
    const newMethod: PaymentMethod = {
      id: crypto.randomUUID(),
      last4,
      expiry,
      isDefault: setAsDefault || paymentMethods.length === 0,
    };

    setPaymentMethods((current) => {
      const updated = setAsDefault || current.length === 0
        ? current.map((method) => ({ ...method, isDefault: false }))
        : current;

      return [...updated, newMethod];
    });

    toast.success('Metoda płatności została dodana');
    handleAddPaymentOpenChange(false);
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((current) =>
      current.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
    toast.success('Domyślna metoda płatności została zmieniona');
  };

  const displayName = user?.name ?? 'Użytkownik';
  const displayEmail = user?.email ?? '';
  const displayInitials = useMemo(() => {
    return displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }, [displayName]);

  const signedUpLabel = useMemo(() => {
    if (!user?.createdAt) {
      return 'Członek od niedawna';
    }

    const createdAt = new Date(user.createdAt);

    if (Number.isNaN(createdAt.getTime())) {
      return 'Członek od niedawna';
    }

    return `Członek od ${createdAt.toLocaleDateString('pl-PL', {
      month: 'long',
      year: 'numeric',
    })}`;
  }, [user?.createdAt]);

  const nameParts = displayName.split(' ');
  const firstName = nameParts[0] ?? '';
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Moje konto</h1>
          <p className="text-gray-600">Zarządzaj swoim profilem i preferencjami</p>
        </div>

        <Tabs.Root defaultValue="profile" className="space-y-6">
          {/* Tabs Navigation */}
          <Tabs.List className="bg-white rounded-lg p-1 shadow-sm border inline-flex gap-1">
            <Tabs.Trigger
              value="profile"
              className="px-6 py-2 rounded-md text-sm text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Profil
            </Tabs.Trigger>
            <Tabs.Trigger
              value="notifications"
              className="px-6 py-2 rounded-md text-sm text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Powiadomienia
            </Tabs.Trigger>
            <Tabs.Trigger
              value="security"
              className="px-6 py-2 rounded-md text-sm text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Bezpieczeństwo
            </Tabs.Trigger>
            <Tabs.Trigger
              value="billing"
              className="px-6 py-2 rounded-md text-sm text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
            >
              Płatności
            </Tabs.Trigger>
          </Tabs.List>

          {/* Profile Tab */}
          <Tabs.Content value="profile">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-6">Informacje osobiste</h2>

              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
                    {displayInitials || 'U'}
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{displayName}</h3>
                    <p className="text-sm text-gray-500 mb-3">{signedUpLabel}</p>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
                      Zmień zdjęcie
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Imię
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nazwisko
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={displayEmail}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      defaultValue="+48 123 456 789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adres
                    </label>
                    <input
                      type="text"
                      defaultValue="ul. Przykładowa 123, 00-001 Warszawa"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Save className="w-4 h-4" />
                    Zapisz zmiany
                  </button>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Notifications Tab */}
          <Tabs.Content value="notifications">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-2">Preferencje powiadomień</h2>
              <p className="text-sm text-gray-600 mb-6">Wybierz, jak chcesz otrzymywać powiadomienia</p>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <Mail className="w-5 h-5" />
                      Powiadomienia email
                    </div>
                    <p className="text-sm text-gray-600">Otrzymuj powiadomienia na swoją skrzynkę email</p>
                  </div>
                  <Switch.Root
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <Switch.Thumb
                      className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                        emailNotifications ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </Switch.Root>
                </div>

                <div
                  className={`space-y-0 transition-opacity ${!emailNotifications ? 'opacity-50' : ''}`}
                  aria-disabled={!emailNotifications}
                >
                  {/* Price Alerts */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div>
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          emailNotifications ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        <Bell className="w-5 h-5" />
                        Alerty cenowe
                      </div>
                      <p className={`text-sm ${emailNotifications ? 'text-gray-600' : 'text-gray-400'}`}>
                        Powiadomienia gdy cena spadnie poniżej progu
                      </p>
                    </div>
                    <Switch.Root
                      checked={priceAlerts}
                      onCheckedChange={setPriceAlerts}
                      disabled={!emailNotifications}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        emailNotifications ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${priceAlerts && emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <Switch.Thumb
                        className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          priceAlerts ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </Switch.Root>
                  </div>

                  {/* Weekly Digest */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div>
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          emailNotifications ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        <CalendarDays className="w-5 h-5" />
                        Cotygodniowe podsumowanie
                      </div>
                      <p className={`text-sm ${emailNotifications ? 'text-gray-600' : 'text-gray-400'}`}>
                        Otrzymuj zestawienie najlepszych ofert co tydzień
                      </p>
                    </div>
                    <Switch.Root
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                      disabled={!emailNotifications}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        emailNotifications ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${weeklyDigest && emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <Switch.Thumb
                        className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          weeklyDigest ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </Switch.Root>
                  </div>

                  {/* New Arrivals */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          emailNotifications ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                        Nowe premiery
                      </div>
                      <p className={`text-sm ${emailNotifications ? 'text-gray-600' : 'text-gray-400'}`}>
                        Powiadomienia o nowych zestawach LEGO
                      </p>
                    </div>
                    <Switch.Root
                      checked={newArrivals}
                      onCheckedChange={setNewArrivals}
                      disabled={!emailNotifications}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        emailNotifications ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${newArrivals && emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <Switch.Thumb
                        className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          newArrivals ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </Switch.Root>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => toast.success('Zapisano')}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Zapisz preferencje
                </button>
              </div>
            </div>
          </Tabs.Content>

          {/* Security Tab */}
          <Tabs.Content value="security">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-6">Bezpieczeństwo konta</h2>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="pb-6 border-b">
                  <div className="flex items-center gap-2 text-gray-900 mb-4">
                    <Shield className="w-5 h-5" />
                    Zmień hasło
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Obecne hasło</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nowe hasło</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Potwierdź nowe hasło</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-2">Uwierzytelnianie dwuskładnikowe (2FA)</h3>
                    <p className="text-sm text-gray-600">
                      Dodaj dodatkową warstwę zabezpieczeń do swojego konta
                    </p>
                  </div>
                  <Switch.Root
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      if (checked) {
                        toast.success('Aktywowano 2FA');
                      }
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      twoFactorEnabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <Switch.Thumb
                      className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </Switch.Root>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => toast.success('Zaktualizowano')}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Zaktualizuj hasło
                  </button>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Billing Tab */}
          <Tabs.Content value="billing">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-6">Metody płatności</h2>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-900">•••• •••• •••• {method.last4}</div>
                        <div className="text-sm text-gray-500">Wygasa {method.expiry}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault ? (
                        <span className="inline-flex h-8 items-center px-3 text-xs text-green-700 bg-green-100 rounded-full">
                          Domyślna
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          className="inline-flex h-8 items-center px-3 text-xs text-gray-400 border border-gray-200 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
                        >
                          Ustaw jako domyślną
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethods((current) => {
                            const filtered = current.filter((item) => item.id !== method.id);
                            if (filtered.length === 0) {
                              return filtered;
                            }
                            if (method.isDefault) {
                              return filtered.map((item, index) => ({
                                ...item,
                                isDefault: index === 0,
                              }));
                            }
                            return filtered;
                          });
                          toast.success('Metoda płatności została usunięta');
                        }}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setAddPaymentOpen(true)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Dodaj metodę płatności
              </button>

              <Dialog open={addPaymentOpen} onOpenChange={handleAddPaymentOpenChange}>
                <DialogContent className="sm:max-w-md bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Dodaj metodę płatności</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Wprowadź dane karty, aby zapisać ją na koncie.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                    <div>
                      <label htmlFor="cardholder-name" className="block text-sm text-gray-700 mb-2">
                        Imię i nazwisko na karcie
                      </label>
                      <input
                        id="cardholder-name"
                        type="text"
                        value={cardholderName}
                        onChange={(event) => setCardholderName(event.target.value)}
                        placeholder="Jan Kowalski"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="card-number" className="block text-sm text-gray-700 mb-2">
                        Numer karty
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="card-expiry" className="block text-sm text-gray-700 mb-2">
                          Data ważności
                        </label>
                        <input
                          id="card-expiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={expiry}
                          onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                          placeholder="MM/RR"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-cvv" className="block text-sm text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          id="card-cvv"
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          value={cvv}
                          onChange={(event) => setCvv(event.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setAsDefault}
                        onChange={(event) => setSetAsDefault(event.target.checked)}
                        className="size-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Ustaw jako domyślną metodę płatności</span>
                    </label>

                    <DialogFooter className="gap-2 sm:gap-0">
                      <button
                        type="button"
                        onClick={() => handleAddPaymentOpenChange(false)}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        Anuluj
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Zapisz kartę
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Billing History */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg text-gray-900 mb-4">Historia transakcji</h3>
                <div className="space-y-3">
                  {billingHistory.map((transaction) => (
                    <div
                      key={`${transaction.number}-${transaction.date}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="text-gray-900">
                          {transaction.name}{' '}
                          <span className="text-gray-500">#{transaction.number}</span>
                        </div>
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </div>
                      <div className="text-gray-900 whitespace-nowrap">
                        {transaction.price.toLocaleString('pl-PL')} zł
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
