// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export function throttle<F extends AnyFunction>(func: F, delay: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttled = function (this: any, ...args: Parameters<F>) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(this, args);
        timeout = null;
      }, delay);
    }
  } as unknown as F;

  return throttled;
}
