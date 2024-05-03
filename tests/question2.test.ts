import { describe, test, expect, expectTypeOf, beforeEach } from "vitest";
import { ItemStore } from "../index";
import type { ItemStore as ItemStoreInterface } from "../index";

describe("Question 2", () => {
  let store: ItemStoreInterface;
  describe("put method", () => {
    beforeEach(() => {
      store = new ItemStore();
    });

    test("is a function", () => {
      expect(typeof store.put).toBe("function");
    });

    test("adds an item to the internal store", () => {
      store.put({ id: "1", tag: "test" });
      expect(store.size()).toBe(1);
      expect(store.get("1")).toEqual({ id: "1", tag: "test" });
    });

    test("adds only one item of the same id to the store", () => {
      store.put({ id: "1", tag: "test" });
      store.put({ id: "2", tag: "hello" });
      store.put({ id: "3", tag: "bye" });
      store.put({ id: "1", tag: "test 2" });
      expect(store.size()).toBe(3);
      expect(store.get("1")).toEqual({ id: "1", tag: "test 2" });
    });
  });

  describe("get method", () => {
    beforeEach(() => {
      store = new ItemStore();
    });

    test("is a function", () => {
      expect(typeof store.put).toBe("function");
    });

    test("returns the correct item", () => {
      store.put({ id: "1", tag: "test" });
      store.put({ id: "2", tag: "hello" });
      expect(store.get("1")).toEqual({ id: "1", tag: "test" });
      store.put({ id: "2", tag: "replaced" });
      expect(store.get("2")).toEqual({ id: "2", tag: "replaced" });
    });

    test("returns null when no id matches", () => {
      expect(store.get("1")).toBeNull();
      store.put({ id: "1", tag: "test" });
      store.put({ id: "2", tag: "hello" });
      expect(store.get("0")).toBeNull();
    });
  });

  describe("dropAllByTag method", () => {
    beforeEach(() => {
      store = new ItemStore();
    });

    test("is a function", () => {
      expect(typeof store.dropAllByTag).toBe("function");
      store.put({ id: "1", tag: "test" });
      const result = store.dropAllByTag("test");
      expect(result).toBe(undefined);
    });

    test("removes all items with the tag", () => {
      store.put({ id: "1", tag: "test" });
      store.put({ id: "2", tag: "test 2" });
      store.put({ id: "3", tag: "test 3" });
      store.dropAllByTag("test");
      expect(store.size()).toBe(2);
      expect(store.get("1")).toBeNull();
      store.put({ id: "4", tag: "test 2" });
      store.put({ id: "5", tag: "test 2" });
      store.dropAllByTag("test 2");
      expect(store.size()).toBe(1);
      expect(store.get("2")).toBeNull();
      expect(store.size()).toBe(1);
    });

    test("is case sensitive", () => {
      store.put({ id: "1", tag: "test" });
      store.dropAllByTag("Test");
      expect(store.get("1")).toEqual({ id: "1", tag: "test" });
    });
  });

  describe("size method", () => {
    beforeEach(() => {
      store = new ItemStore();
    });

    test("is a function, returns a number", () => {
      expect(typeof store.size).toBe("function");
      expect(typeof store.size()).toBe("number");
    });

    test("returns 0 when items is empty", () => {
      expect(store.size()).toBe(0);
      store.put({ id: "1", tag: "test" });
      store.dropAllByTag("test");
      expect(store.size()).toBe(0);
    });

    test("returns the correct size", () => {
      store.put({ id: "1", tag: "test" });
      store.put({ id: "1", tag: "test 2" });
      expect(store.size()).toBe(1);
      store.put({ id: "2", tag: "item 2" });
      expect(store.size()).toBe(2);
    });
  });
});
