import { useMemo, useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, MapPin, Save } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [newArrivals, setNewArrivals] = useState(true);

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
                    className={`relative w-11 h-6 rounded-full transition-colors ${
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

                {/* Price Alerts */}
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <Bell className="w-5 h-5" />
                      Alerty cenowe
                    </div>
                    <p className="text-sm text-gray-600">Powiadomienia gdy cena spadnie poniżej progu</p>
                  </div>
                  <Switch.Root
                    checked={priceAlerts}
                    onCheckedChange={setPriceAlerts}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      priceAlerts ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
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
                    <div className="text-gray-900 mb-1">Cotygodniowe podsumowanie</div>
                    <p className="text-sm text-gray-600">Otrzymuj zestawienie najlepszych ofert co tydzień</p>
                  </div>
                  <Switch.Root
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      weeklyDigest ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
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
                    <div className="text-gray-900 mb-1">Nowe premiery</div>
                    <p className="text-sm text-gray-600">Powiadomienia o nowych zestawach LEGO</p>
                  </div>
                  <Switch.Root
                    checked={newArrivals}
                    onCheckedChange={setNewArrivals}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      newArrivals ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <Switch.Thumb
                      className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                        newArrivals ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </Switch.Root>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
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
                <div>
                  <h3 className="text-gray-900 mb-2">Uwierzytelnianie dwuskładnikowe (2FA)</h3>
                  <p className="text-sm text-gray-600 mb-4">Dodaj dodatkową warstwę zabezpieczeń do swojego konta</p>
                  <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    Włącz 2FA
                  </button>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
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
                {/* Saved Card */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-900">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500">Wygasa 12/26</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Domyślna</span>
                    <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      Usuń
                    </button>
                  </div>
                </div>
              </div>

              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Dodaj metodę płatności
              </button>

              {/* Billing History */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg text-gray-900 mb-4">Historia transakcji</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-gray-900">Premium Plan - Miesięczny</div>
                      <div className="text-sm text-gray-500">15 marca 2026</div>
                    </div>
                    <div className="text-gray-900">49,99 zł</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-gray-900">Premium Plan - Miesięczny</div>
                      <div className="text-sm text-gray-500">15 lutego 2026</div>
                    </div>
                    <div className="text-gray-900">49,99 zł</div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
