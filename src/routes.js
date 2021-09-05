import DeliveryAreasPage from './pages/DeliveryAreas';
import MenuPage from 'pages/Menu';
import DashboardPage from 'pages/Dashboard';
import ShopPage from 'pages/Shop';
import DiscountPage from 'pages/Discount';

import { Dashboard, Map, Restaurant, Home, LocalOffer } from '@material-ui/icons';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPage, IconComponent: Dashboard },
  { path: '/shop', name: 'Shop', Component: ShopPage, IconComponent: Home },
  { path: '/menus', name: 'Menü', Component: MenuPage, IconComponent: Restaurant },
  { path: '/discount', name: 'Angebote', Component: DiscountPage, IconComponent: LocalOffer },
  { path: '/areas', name: 'Liefergebiete', Component: DeliveryAreasPage, IconComponent: Map },
];
export default routes;
