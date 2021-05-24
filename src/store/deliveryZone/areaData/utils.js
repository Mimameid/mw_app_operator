import polygonClipping from 'polygon-clipping';

import store from '../../store';

export function getColor() {
  let colors = [
    '#2f4f4f',
    '#8b4513',
    '#ff69b4',
    '#000080',
    '#eee8aa',
    '#00ffff',
    '#6495ed',
    '#228b22',
    '#ffd700',
    '#ff00ff',
    '#ff0000',
  ];

  let usedColors = [];
  for (let area of store.getState().deliveryZone.areaData.areas) {
    usedColors.push(area.color);
  }

  for (let color of colors) {
    if (!usedColors.includes(color)) {
      return color;
    }
  }
}

export function getDifference(areas, activeArea) {
  if (areas.length < 1) {
    // convert to linear ring
    return activeArea.areaPolygons;
  }

  // create polygon feature (geojson format) of array of linear rings
  let selectedPolygon = activeArea.areaPolygons;

  for (let i = 0; i < areas.length; i++) {
    if (areas[i].areaNumber !== activeArea.areaNumber) {
      selectedPolygon = polygonClipping.difference(selectedPolygon, areas[i].areaPolygons);

      if (!selectedPolygon.length) {
        if (polygonClipping.intersection(selectedPolygon, areas[i].areaPolygons)) {
          // TODO: polygon was drawn entirely inside of another polygon, what to do?
        }
      }
    }
  }
  return selectedPolygon;
}
