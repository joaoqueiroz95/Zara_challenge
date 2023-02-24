export const getLocalStorageItem = (key: string) => {
  const value = localStorage.getItem(key);

  if (value === null) return null;

  return JSON.parse(value).value;
};

export const checkValidLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value === null) return false;

  const date = new Date(JSON.parse(value).date);
  const diffTime = Math.abs(Date.now() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays < 1;
};

export const saveToLocalStorage = (key: string, value: any) => {
  const currentDate = new Date();

  localStorage.setItem(
    key,
    JSON.stringify({ date: currentDate.toISOString(), value })
  );
};
