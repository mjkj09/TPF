import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { ErrorAlert } from '../components/ErrorAlert';
import { FormField, inputClassName } from '../components/FormField';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Proszę wypełnić wszystkie pola');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      setIsLoading(false);
      return;
    }

    const success = await register(email, password, name);

    if (success) {
      navigate('/');
    } else {
      setError('Użytkownik z tym adresem email już istnieje');
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Utwórz konto"
      subtitle="Dołącz do społeczności miłośników LEGO"
      footer={
        <p className="text-sm text-gray-600">
          Masz już konto?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Zaloguj się
          </Link>
        </p>
      }
    >
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Imię" htmlFor="name">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClassName}
            placeholder="Jan Kowalski"
            disabled={isLoading}
          />
        </FormField>

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

        <FormField label="Potwierdź hasło" htmlFor="confirmPassword">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClassName}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </FormField>

        <Button type="submit" variant="primary-full" disabled={isLoading}>
          {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
        </Button>
      </form>
    </AuthLayout>
  );
}
