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
    console.log(now, lastCall, delay);
    console.log('hitti');
    lastCall = now;
    // eslint-disable-next-line consistent-return
    return fn(...args);
  };
};
