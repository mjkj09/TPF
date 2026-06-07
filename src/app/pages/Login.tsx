import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { ErrorAlert } from '../components/ErrorAlert';
import { FormField, inputClassName } from '../components/FormField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from
    ?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Proszę wypełnić wszystkie pola');
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);

    if (success) {
      navigate(from ?? '/');
    } else {
      setError('Nieprawidłowy email lub hasło');
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Zaloguj się"
      subtitle="Śledź ceny swoich ulubionych zestawów LEGO"
      footer={
        <p className="text-sm text-gray-600">
          Nie masz konta?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Zarejestruj się
          </Link>
        </p>
      }
    >
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" htmlFor="email">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
            placeholder="twoj@email.com"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Hasło" htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClassName}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </FormField>

        <Button type="submit" variant="primary-full" disabled={isLoading}>
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </form>
    </AuthLayout>
  );
}
