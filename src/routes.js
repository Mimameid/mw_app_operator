import DeliveryZones from './components/DeliveryZones/DeliveryZones';
import Menu from './components/Menu/Menu';
import DashboardPanel from './components/Dashboard/Dashboard';

import { Dashboard, Map, RestaurantMenu } from '@material-ui/icons';

const routes = [
  { path: '/', exact: true, name: 'Dashboard', Component: DashboardPanel, IconComponent: Dashboard },
  { path: '/menu', name: 'Menü', Component: Menu, IconComponent: RestaurantMenu },
  { path: '/deliveryZone/', name: 'Liefergebiete', Component: DeliveryZones, IconComponent: Map },
];
export default routes;
