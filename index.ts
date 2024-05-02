/**
 * Question 1
 *
 * Solution:
 * This code does not work when there are two or more consectutive values in the array that are less than 10.
 * When the program removes a value using the splice method, the index of each array item after the removed value will decrease by one.
 * The index of the iterator then increases and skips the next item in the array.
 * To fix this, the iterator must not increase when it removes a value from the array
 *
 * Remove values less than 10 from an array
 *
 * @param list
 */
export function question1_removeSmallNumbers(list: (number | undefined)[]) {
  for (let i = 0; i < list.length; i++) {
    const n = list[i];
    console.log(n);
    if (n && n < 10) {
      console.log("removing", n);
      list.splice(i, 1);
      // added solution
      i -= 1;
    }
  }
}
