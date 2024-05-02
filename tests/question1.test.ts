import { describe, expect, test } from "vitest";
import { question1_removeSmallNumbers } from "../index";

describe("Question 1", () => {
  test("[1, 10, 3, 21] results in [10, 21]", () => {
    let list = [1, 10, 3, 21];
    question1_removeSmallNumbers(list);
    expect(list).toEqual([10, 21]);
  });

  test("[undefined, 100, undefined] results in [undefined, 100, undefined]", () => {
    let list = [undefined, 100, undefined];
    question1_removeSmallNumbers(list);
    expect(list).toEqual([undefined, 100, undefined]);
  });

  test("[-1, 5, undefined] reults in [undefined]", () => {
    let list = [-1, 5, undefined];
    question1_removeSmallNumbers(list);
    expect(list).toEqual([undefined]);
  });

  test("[] results in []", () => {
    let list = [] as (number | undefined)[];
    question1_removeSmallNumbers(list);
    expect(list).toEqual([]);
  });
});
