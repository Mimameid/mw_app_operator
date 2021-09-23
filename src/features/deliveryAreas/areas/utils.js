import polygonClipping from 'polygon-clipping';

const _colors = [
  '#c566ee',
  '#01afe3',
  '#ff4d49',
  '#d7c930',
  '#e92199',
  '#745300',
  '#762caa',
  '#ffa952',
  '#00b6aa',
  '#a11c28',
  '#0055cf',
];
let availableColors = [];
let usedColors = [];

function resetColors() {
  availableColors = [..._colors];
  usedColors = [];
}

function getColor(areas) {
  if (availableColors.length < 1) {
    // this doesn't make sense, the use isn't allowed to create more than 11 areas currently
    availableColors = usedColors.slice();
    usedColors = [];
    for (let area of areas) {
      const index = availableColors.indexOf(area.color);
      availableColors.splice(index, 1);
      usedColors.push(area.color);
    }
  }

  const color = availableColors.pop();
  usedColors.push(color);
  return color;
}

export const colors = { getColor, resetColors };

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

export function getCenter(area) {
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (const polygon of area) {
    for (const ring of polygon) {
      for (const vertex of ring) {
        sumX += vertex[0];
        sumY += vertex[1];
        count++;
      }
    }
  }
  return [sumX / count, sumY / count];
}
