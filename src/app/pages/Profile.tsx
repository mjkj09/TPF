import { useMemo, useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, MapPin, Save, CalendarDays, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { ContentCard } from '../components/ContentCard';
import { PageLayout } from '../components/PageLayout';
import { Tabs } from '../components/Tabs';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { FormField, inputClassName } from '../components/FormField';
import { cardClass, tabTriggerClass } from '../styles/tokens';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
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
    <PageLayout narrow>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Moje konto</h1>
        <p className="text-gray-600">Zarządzaj swoim profilem i preferencjami</p>
      </div>

      <Tabs.Root defaultValue="profile" className="space-y-6">
        <Tabs.List className={`${cardClass} p-1 inline-flex gap-1`}>
          <Tabs.Trigger value="profile" className={tabTriggerClass}>
            Profil
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications" className={tabTriggerClass}>
            Powiadomienia
          </Tabs.Trigger>
          <Tabs.Trigger value="security" className={tabTriggerClass}>
            Bezpieczeństwo
          </Tabs.Trigger>
          <Tabs.Trigger value="billing" className={tabTriggerClass}>
            Płatności
          </Tabs.Trigger>
        </Tabs.List>

          {/* Profile Tab */}
          <Tabs.Content value="profile">
            <ContentCard>
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
                    <Button variant="secondary" size="sm">
                      Zmień zdjęcie
                    </Button>
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
                      className={inputClassName}
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
                      className={inputClassName}
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
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      defaultValue="+48 123 456 789"
                      className={inputClassName}
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
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="w-4 h-4" />
                    Zapisz zmiany
                  </Button>
                </div>
              </div>
            </ContentCard>
          </Tabs.Content>

          {/* Notifications Tab */}
          <Tabs.Content value="notifications">
            <ContentCard>
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
                  <ToggleSwitch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
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
                    <ToggleSwitch
                      checked={priceAlerts}
                      onCheckedChange={setPriceAlerts}
                      disabled={!emailNotifications}
                    />
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
                    <ToggleSwitch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                      disabled={!emailNotifications}
                    />
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
                    <ToggleSwitch
                      checked={newArrivals}
                      onCheckedChange={setNewArrivals}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="button" onClick={() => toast.success('Zapisano')}>
                  <Save className="w-4 h-4" />
                  Zapisz preferencje
                </Button>
              </div>
            </ContentCard>
          </Tabs.Content>

          {/* Security Tab */}
          <Tabs.Content value="security">
            <ContentCard>
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
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nowe hasło</label>
                      <input
                        type="password"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Potwierdź nowe hasło</label>
                      <input
                        type="password"
                        className={inputClassName}
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
                  <ToggleSwitch
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      if (checked) {
                        toast.success('Aktywowano 2FA');
                      }
                    }}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={() => toast.success('Zaktualizowano')}>
                    <Save className="w-4 h-4" />
                    Zaktualizuj hasło
                  </Button>
                </div>
              </div>
            </ContentCard>
          </Tabs.Content>

          {/* Billing Tab */}
          <Tabs.Content value="billing">
            <ContentCard>
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
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-full text-xs text-gray-400 hover:text-gray-700"
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        >
                          Ustaw jako domyślną
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
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
                      >
                        Usuń
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="button" onClick={() => setAddPaymentOpen(true)}>
                Dodaj metodę płatności
              </Button>

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
                        className={inputClassName}
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
                        className={inputClassName}
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
                          className={inputClassName}
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
                          className={inputClassName}
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
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleAddPaymentOpenChange(false)}
                      >
                        Anuluj
                      </Button>
                      <Button type="submit">Zapisz kartę</Button>
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
            </ContentCard>
          </Tabs.Content>
      </Tabs.Root>
    </PageLayout>
  );
}
