/**
 * Question 1
 *
 * Solution:
 This code does not work when there are two or more consectutive values in the array that are less than 10.
 When the program removes a value using the splice method, the index of each array item after the removed value will decrease by one.
 The index of the iterator then increases and skips the next item in the array.
 To fix this, the iterator must not increase when it removes a value from the array
 *
 * Remove values less than 10 from an array
 *
 * @param list
 */
export function question1_removeSmallNumbers(list: (number | undefined)[]) {
  for (let i = 0; i < list.length; i++) {
    const n = list[i];
    if (n && n < 10) {
      console.log("removing", n);
      list.splice(i, 1);
      // added solution
      i -= 1;
    }
  }
}

/**
 * Question 2
 *
 I chose to implement the ItemStore class as an array of Item objects. Using an array allowed me to use array methods such as find an filter for ItemStore's methods. I used the find method for ItemStore methods that looked for only one value in the array (put and get). Find is the best method to use in this case because it terminates after an iteration returns true.
  I used the filter method for the dropByTag method because it is necessary to iterate over every item in the array.
 */

export class Item {
  constructor(id: string, tag: string) {
    this.id = id;
    this.tag = tag;
  }
}

export class ItemStore {
  items: Item[] = [];

  put(item: Item) {
    const existingItem = this.items.find(
      (storeItem) => storeItem.id === item.id
    );

    if (existingItem) {
      // item with item.id exists in this.items, replace existing item
      existingItem.tag = item.tag;
    } else {
      this.items.push(item);
    }
  }

  get(id: string) {
    if (this.items.length === 0) return null;
    const item = this.items.find((item) => {
      return item.id === id;
    });
    if (!item) {
      return null;
    } else {
      return item;
    }
  }

  dropAllByTag(tag: string) {
    this.items = this.items.filter((item) => item.tag !== tag);
  }

  size() {
    return this.items.length;
  }
}

/**
 * Question 3
 * 
 This exception occurs because the DOM element refernced by document.getElementById('app-container') has not loaded at the time that the line of javascript executes. This could be due to a script tag above the desired HTML element, or dependent resources that take time to load such as images, stylesheets, fonts, etc.
 Calling the ReactDOM.render function in an on 'load' event listener guaruntees that the DOM and its dependencies are fully loaded before the javascript function is called.
 */

/**
 * Question 4
 * 
 Bug1's rating method was returning itself instead of the _rating property. To fix this bug, you have to return this._rating
 *
 */

class Bug1 {
  _rating: number | null = null;

  rating() {
    // solution: this.rating => this._rating
    return this._rating;
  }
}

export function question4() {
  const bug = new Bug1();
  return `Rating is ${bug.rating()}`;
}

/**
 * Question 5
 *
 * What is the output?

 The output of the code is:
 orig and modified are the same
 orig.prop1 is m1
 orig.prop1 is m1
 orig.prop1 is m2

 * There are two nearly identical blocks of code:

```ts
    if (orig === modified) {
        console.log('orig and modified are the same')
    }
```

* and

```ts
    if (orig === modified) {
        console.log('orig and modified are still the same')
    }
```

* If one or either of the `console.log` lines was skipped,
* explain why. 

The second console.log was skipped because the spread operator creates a copy of the object that is spread, so orig and modified are no longer pointing to the same object and are no longer strictly equal to each other. 
 */

/**
 * BONUS
 * 
 The secret message is:

 Congratulations, you solved the bonus question!

                                   .''.
       .''.      .        *''*    :_\/_:     .
      :_\/_:   _\(/_  .:.*_\/_*   : /\ :  .'.:.'.
  .''.: /\ :   ./)\   ':'* /\ * :  '..'.  -=:o:=-
 :_\/_:'.:::.    ' *''*    * '.'/.' _\(/_'.':'.'
 : /\ : :::::     *_\/_*     -= o =-  /)\    '
  '..'  ':::'     * /\ *     .'/.'.   '
                   *..*         :
 */

export function decrypt(message: string) {
  let buff = Buffer.from(message, "base64");
  let encryptedText = buff.toString("ascii");
  const secret = xorBytes(encryptedText.split(""));
  return secret;
}

export function xorBytes(textArray: string[]) {
  const key = "MOEBIUS".split("");
  let keyCounter = 0;
  const answerArray: string[] = [];
  textArray.forEach((char) => {
    if (keyCounter === key.length) {
      keyCounter = 0;
    }
    const asciiNumber = char.charCodeAt(0) ^ key[keyCounter].charCodeAt(0);
    answerArray.push(String.fromCharCode(asciiNumber));
    keyCounter++;
  });
  return answerArray.join("");
}

const message = decrypt(
  "DiArJTs0JzgjJDYgOj0+Y2U7JiBzPiApNCwxczknIGIrOj04PGUzPDAgOSYqLGhfWW1vZWJpdXNtb2ViaXVzbW9lYml1c21vZWJpdXNtb2ViaXVzY2hibEN1c21vZWJpe3RqYWViaXVzbWFlYml1c21vZWhucnltb2VicwoPYhB/Yml1c21hT2JpdXNtb38dFXoMd29lYhYJe2IQZWJnb31nEBltFn9zbW9/YmYJc3dvZWxue2ljaGtIaXV9amhreGl6D211ZWJpe3xkE2ViaXJpamVlbRV1eW11ZWJue31qYWViZGhpInV4b0N1aRITah1zcn13dX9saXVzbWhlaG5yeW1vZWJjdXRjaGpsbnUMEWdqHW57dHdoa2VDdWltYBlic3Vpd3V/eGl1c21vbx0Vegxnb2ViaXV+cG8qYnR4c21gbB5pdXNtaE9iaXJ9Y2hlYm5vaXdoZWJpdXNnb2oeaX9zbW9lYmdyfGNoa2JpdXRHb2ViaXVzbW9lYml1c21vZWJpdXljYW9iaXVzbW9lYmlvWQ=="
);
console.log(message);

/***** END SOLUTIONS *****/

export interface Item {
  id: string;
  tag: string;
}

export interface ItemStore {
  /**
   * Adds an {@link Item} to the store, replacing any existing item with the
   * same {@link Item#id} value.
   */
  put: (item: Item) => void;

  /**
   * Retrieves the {@link Item} with the given {@link Item#id} value, or
   * null if no such {@link Item} exists in the store.
   */
  get: (id: string) => Item | null;

  /**
   * Delete all {@link Item}s with the specified tag.
   */
  dropAllByTag: (tag: string) => void;

  /**
   * Returns the number of Items in the store
   */
  size: () => number;
}
