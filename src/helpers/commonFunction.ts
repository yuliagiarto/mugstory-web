export function getSessionStorageOrDefault<T>(key: string, defaultValue?: T) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  let result: T | undefined | null = defaultValue;
  try {
    result = JSON.parse(stored) as T;
  } catch (error) {
    console.error(error);
  }
  return result;
}
