import store from '../store';

export function getColor() {
  let colors = [
    '#fa9579',
    '#654062',
    '#65d6ce',
    '#f9e0ae',
    '#fc8621',
    '#c24914',
    '#682c0e',
    '#4e8d7c',
    '#045762',
    '#ea97ad',
  ];

  let usedColors = [];
  for (let polygons of store.getState().deliveryZoneState.polygons) {
    usedColors.push(polygons.color);
  }

  for (let color of colors) {
    if (!usedColors.includes(color)) {
      return color;
    }
  }
}
