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
    if (currentPolygons.length > 0) {
      return currentPolygons[0][0].length > 3;
    } else {
      return false;
    }
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

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
