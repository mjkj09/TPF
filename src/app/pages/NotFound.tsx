import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/Button';
import { LegoLogo } from '../components/LegoLogo';
import { PageLayout } from '../components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout centered>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <LegoLogo size="lg" className="gap-2" />
        </div>
        <h1 className="text-6xl text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Nie znaleziono strony</p>
        <Button asChild variant="primary" size="lg">
          <Link to="/">
            <Home className="w-5 h-5" />
            Powrót do strony głównej
          </Link>
        </Button>
      </div>
    </PageLayout>
  );
}
