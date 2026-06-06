import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { btnPrimary, navLinkClass, navLinkClassMobile } from '../styles/tokens';
import logo from '@/assets/images/logo.png';

interface HeaderProps {
  currentView: 'home' | 'product' | 'watchlist' | 'search' | 'profile' | 'login' | 'register';
}

export default function Header({ currentView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src={logo} alt="LEGO Tracker" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-4 ml-auto">
            <Link to="/search" className={navLinkClass(currentView === 'search')}>
              Odkrywaj
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/wishlist"
                  className={`flex items-center gap-2 ${navLinkClass(currentView === 'watchlist')}`}
                >
                  <Heart className="w-4 h-4" />
                  Lista życzeń
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 ${navLinkClass(currentView === 'profile')}`}
                  >
                    <User className="w-4 h-4" />
                    {user?.name}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Mój profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Wyloguj się
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={navLinkClass(currentView === 'login')}>
                  Zaloguj się
                </Link>
                <Link
                  to="/register"
                  className={`${btnPrimary} px-4 py-2 ${
                    currentView === 'register' ? 'bg-blue-600' : ''
                  }`}
                >
                  Zarejestruj się
                </Link>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClassMobile(currentView === 'search')}
              >
                Odkrywaj
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 ${navLinkClassMobile(currentView === 'watchlist')}`}
                  >
                    <Heart className="w-4 h-4" />
                    Lista życzeń
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 ${navLinkClassMobile(currentView === 'profile')}`}
                  >
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-left text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Wyloguj się
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={navLinkClassMobile(currentView === 'login')}
                  >
                    Zaloguj się
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${navLinkClassMobile(currentView === 'register')} bg-blue-500 text-white hover:bg-blue-600 ${
                      currentView === 'register' ? 'bg-blue-600' : ''
                    }`}
                  >
                    Zarejestruj się
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
