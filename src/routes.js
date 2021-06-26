import DeliveryAreas from './pages/DeliveryAreas';
import Menu from 'pages/Menu';
import DashboardPanel from 'pages/Dashboard';

import { Dashboard, Map, RestaurantMenu } from '@material-ui/icons';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPanel, IconComponent: Dashboard },
  { path: '/menus', name: 'Menü', Component: Menu, IconComponent: RestaurantMenu },
  { path: '/areas/', name: 'Liefergebiete', Component: DeliveryAreas, IconComponent: Map },
];
export default routes;
