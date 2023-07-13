import { getLocalStorageItem, checkValidLocalStorage } from "../src/Utils/localStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("getLocalStorageItem", () => {
  it("returns null if the item does not exist in localStorage", () => {
    expect(getLocalStorageItem("non-existent-key")).toEqual(null);
  });

  it("returns the value of the item if it exists in localStorage", () => {
    const key = "existing-key";
    const value = { value: "some-value" };
    localStorage.setItem(key, JSON.stringify(value));

    expect(getLocalStorageItem(key)).toEqual("some-value");
  });
});

describe("checkValidLocalStorage function", () => {
  it("should return false if the key does not exist in localStorage", () => {
    expect(checkValidLocalStorage("invalidKey")).toEqual(false);
  });

  it("should return true if the key exists and the date is within one day of the current date", () => {
    const value = { date: new Date().toISOString() };
    localStorage.setItem("validKey", JSON.stringify(value));

    expect(checkValidLocalStorage("validKey")).toEqual(true);
  });

  it("should return false if the key exists and the date is more than one day ago", () => {
    const value = { date: new Date(Date.now() - 86400000).toISOString() };
    localStorage.setItem("invalidKey", JSON.stringify(value));

    expect(checkValidLocalStorage("invalidKey")).toEqual(false);
  });
});

class LocalStorageMock {
  private store: Record<string, string>;
  public length: number = 0;
  public key: (index: number) => string | null = (index: number) => {
    return null;
  };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
