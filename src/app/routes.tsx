import { createBrowserRouter } from 'react-router';
import Root from './Root';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import Watchlist from './components/Watchlist';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'wishlist', Component: Watchlist },
      { path: 'search', Component: SearchResults },
      { path: 'profile', Component: Profile },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: '*', Component: NotFound },
    ],
  },
]);