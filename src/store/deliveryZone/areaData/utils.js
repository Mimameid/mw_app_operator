import polygonClipping from 'polygon-clipping';

import store from '../../store';

function getColorCreator() {
  let usedColors = [];
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
  return () => {
    if (colors.length < 1) {
      // this doesn't make sense, the use isn't allowed to create more than 11 areas currently
      colors = usedColors.slice();
      usedColors = [];
      for (let area of store.getState().deliveryZone.areaData.areas) {
        const index = colors.indexOf(area.color);
        colors.splice(index, 1);
        usedColors.push(area.color);
      }
    }

    const color = colors.pop();
    usedColors.push(color);
    return color;
  };
}

export const getColor = getColorCreator();

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
