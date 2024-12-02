/**
 * implement debounce function
 * explain: `func` will be called after `delay` ms. if `func` is called again before `delay` ms, the timer will be reset
 * @example
 * // after 1s, print 'hello'
 * // However, if `printHello` is called again before 1s, the timer will be reset
 * const printHello = () => console.log('hello')
 * const debouncedFn = debounce(printHello, 1000)
 * debouncedFn()
 * debouncedFn() // timer reset to 1s
 * 
 * @param {function} func
 * @param {number} delay
 * @returns {function}
 */
function debounce(func, delay) {
  // your code here
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func()
        }, delay);
    };
}

const printHello = () => console.log('hello');
const dbF = debounce(printHello, 1000);
dbF();
dbF();
dbF();

/**
 * implement throttle function
 * explain: `func` will be called every `delay` ms. if `func` is called again before `delay` ms, the call will be ignored
 * @example
 * // after 1s, print 'hello'
 * // However, if `printHello` is called again before 1s, the call will be ignored
 * const printHello = () => console.log('hello')
 * const throttledFn = throttle(printHello, 1000)
 * throttledFn()
 * throttledFn() // ignored
 * 
 * @param {function} func
 * @param {number} delay
 * @returns {function}
 */
function throttle(func, delay) {
  // your code here
    let lastCall = 0;
    return () => {
        const now = Date.now();
        if(now - lastCall >= delay) {
            func();
            lastCall = now;
        }
    }
}

const tF = throttle(printHello, 1000);
tF();
tF();
tF();

setTimeout(() => {
    tF();
}, 1000);
