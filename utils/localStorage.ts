interface Storage {
  getItem<T>(key: string, namespace: string): T | null;
  setItem<T>(key: string, value: T, namespace: string): void;
  removeItem(key: string, namespace: string): void;
}

export const LocalStorage: Storage = {
  getItem<T>(key: string, namespace: string): T | null {
    const value = window.localStorage.getItem(`${namespace}.${key}`);
    return value ? JSON.parse(value) : null;
  },

  setItem<T>(key: string, value: T, namespace: string): void {
    window.localStorage.setItem(`${namespace}.${key}`, JSON.stringify(value));
  },

  removeItem(key: string, namespace: string): void {
    window.localStorage.removeItem(`${namespace}.${key}`);
  },
};
