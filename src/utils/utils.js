export function wasPolygonEdited(deliveryZoneState) {
  let currentPolygon = deliveryZoneState.areaPolygons[deliveryZoneState.selectedPolygonIndex];
  if (currentPolygon[0].length < 3) {
    return false;
  }

  // check if the current polygon is an existing one
  let selectedArea = deliveryZoneState.areas.find((area) => area.areaNumber === deliveryZoneState.areaNumber);
  if (selectedArea) {
    // Check if arrays are equal
    if (
      JSON.stringify(selectedArea.areaPolygons[deliveryZoneState.selectedPolygonIndex]) ===
      JSON.stringify(currentPolygon)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

export const debounce = (func, wait, immediate) => {
  let timeout;
  return (...myArgs) => {
    const context = this;
    const args = myArgs;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    // eslint-disable-next-line consistent-return
    return fn(...args);
  };
};
