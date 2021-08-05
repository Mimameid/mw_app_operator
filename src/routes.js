import DeliveryAreasPage from './pages/DeliveryAreas';
import MenuPage from 'pages/Menu';
import DashboardPanelPage from 'pages/Dashboard';
import RestaurantPage from 'pages/Restaurant';

import { Dashboard, Map, Restaurant, Home } from '@material-ui/icons';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPanelPage, IconComponent: Dashboard },
  { path: '/restaurant/', name: 'Restaurant', Component: RestaurantPage, IconComponent: Home },

  { path: '/menus', name: 'Menü', Component: MenuPage, IconComponent: Restaurant },
  { path: '/areas/', name: 'Liefergebiete', Component: DeliveryAreasPage, IconComponent: Map },
];
export default routes;
