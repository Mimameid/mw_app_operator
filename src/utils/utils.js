export function wasAreaEdited(areas, activeArea) {
  let currentPolygons = activeArea.areaPolygons;

  // check if the current polygon is an existing one
  let selectedArea = areas.find((area) => area.areaNumber === activeArea.areaNumber);
  if (selectedArea) {
    // Check if arrays are equal
    if (JSON.stringify(selectedArea.areaPolygons) === JSON.stringify(currentPolygons)) {
      return false;
    } else {
      // TODO: see task #e508ja
      return true;
    }
  } else {
    // handle new area
    return currentPolygons[0][0].length > 3;
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
