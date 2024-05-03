import { describe, test, expect } from "vitest";
import { decrypt, xorBytes } from "..";

describe("Bonus", () => {
  test("HiYoMiUwcyQ8ZSAsIScoPWU2ITQ9bSwqLzk5NjVh is decrypted to Simple is better than complex.", () => {
    expect(decrypt("HiYoMiUwcyQ8ZSAsIScoPWU2ITQ9bSwqLzk5NjVh")).toBe(
      "Simple is better than complex."
    );
  });

  test("xorBytes works as intended", () => {
    expect(xorBytes("PEDRO".split(""))).toBe("\x1D\n\x01\x10\x06");
  });
  expect(
    xorBytes([
      "\x1E",
      "&",
      "(",
      "2",
      "%",
      "0",
      "s",
      "$",
      "<",
      "e",
      " ",
      ",",
      "!",
      "'",
      "(",
      "=",
      "e",
      "6",
      "!",
      "4",
      "=",
      "m",
      ",",
      "*",
      "/",
      "9",
      "9",
      "6",
      "5",
      "a",
    ])
  ).toBe("Simple is better than complex.");
});
