import DeliveryAreasPage from './pages/DeliveryAreas';
import OfferPage from 'pages/Offer';
import DashboardPage from 'pages/Dashboard';
import ShopPage from 'pages/Shop';
import DiscountPage from 'pages/Discount';

import { Dashboard, Map, Restaurant, Home, LocalOffer } from '@mui/icons-material';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPage, IconComponent: Dashboard },
  { path: '/shop', name: 'Shop', Component: ShopPage, IconComponent: Home },
  { path: '/offers', name: 'Speisekarte', Component: OfferPage, IconComponent: Restaurant },
  { path: '/discounts', name: 'Angebote', Component: DiscountPage, IconComponent: LocalOffer },
  { path: '/areas', name: 'Liefergebiete', Component: DeliveryAreasPage, IconComponent: Map },
];
export default routes;
