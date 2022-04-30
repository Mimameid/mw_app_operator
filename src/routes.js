import DeliveryAreasPage from './pages/DeliveryAreas';
import ProductsPage from 'pages/Products';
import DashboardPage from 'pages/Dashboard';
import ShopPage from 'pages/Shop';
import DiscountPage from 'pages/Discounts';

import { Dashboard, Map, Percent, Home, LocalOffer } from '@mui/icons-material';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPage, IconComponent: Dashboard },
  { path: '/shop', name: 'Shop', Component: ShopPage, IconComponent: Home },
  { path: '/products', name: 'Angebote', Component: ProductsPage, IconComponent: LocalOffer },
  { path: '/discounts', name: 'Rabatte', Component: DiscountPage, IconComponent: Percent },
  { path: '/areas', name: 'Liefergebiete', Component: DeliveryAreasPage, IconComponent: Map },
];
export default routes;
