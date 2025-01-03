import { useCallback } from "react";

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  defaults?: T; // Default properties to initialize missing values dynamically
};

export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): {
  get: () => T;
  set: (value: Partial<T>) => void;
  remove: () => void;
} {
  const { serializer = JSON.stringify, deserializer = JSON.parse, defaults } = options;

  const get = useCallback((): T => {
    if (typeof window === "undefined") return defaults as T;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return defaults as T;

      const parsed = deserializer(item);
      return { ...defaults, ...parsed }; // Merge defaults with stored values
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaults as T;
    }
  }, [key, deserializer, defaults]);

  const set = useCallback(
    (value: Partial<T>) => {
      if (typeof window === "undefined") return;

      try {
        const current = get();
        const updatedValue = { ...current, ...value }; // Merge existing with new values
        window.localStorage.setItem(key, serializer(updatedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, get]
  );

  const remove = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { get, set, remove };
}
