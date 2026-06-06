import { createBrowserRouter } from 'react-router';
import Root from './Root';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'product/:id', Component: ProductDetail },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      { path: 'search', Component: SearchResults },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
