import {
  getLocalStorageItem,
  checkValidLocalStorage,
} from "../../src/Utils/localStorage";

describe("getLocalStorageItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns null if the item does not exist in localStorage", () => {
    expect(getLocalStorageItem("non-existent-key")).equal(null);
  });

  test("returns the value of the item if it exists in localStorage", () => {
    const key = "existing-key";
    const value = { value: "some-value" };
    localStorage.setItem(key, JSON.stringify(value));

    expect(getLocalStorageItem(key)).equal("some-value");
  });
});

describe("checkValidLocalStorage function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return false if the key does not exist in localStorage", () => {
    expect(checkValidLocalStorage("invalidKey")).equal(false);
  });

  it("should return true if the key exists and the date is within one day of the current date", () => {
    const value = { date: new Date().toISOString() };
    localStorage.setItem("validKey", JSON.stringify(value));

    expect(checkValidLocalStorage("validKey")).equal(true);
  });

  it("should return false if the key exists and the date is more than one day ago", () => {
    const value = { date: new Date(Date.now() - 86400000).toISOString() };
    localStorage.setItem("invalidKey", JSON.stringify(value));

    expect(checkValidLocalStorage("invalidKey")).equal(false);
  });
});
