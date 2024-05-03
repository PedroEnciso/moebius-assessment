import { describe, test, expect } from "vitest";
import { question4 } from "..";

describe("Question 4", () => {
  test("Returns the string 'Rating is null'", () => {
    expect(question4()).toBe("Rating is null");
  });
});
