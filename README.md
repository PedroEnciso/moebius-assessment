# Moebius Solutions Coding Assessment

This repo contains my solutions to the Moebius Solutions coding assessment. I wrote my automated tests with vitest (instructions to run them below) and show my solutions here as well as in index.ts.

## My solutions

### Question 1

This code does not work when there are two or more consectutive values in the array that are less than 10.
When the program removes a value using the splice method, the index of each array item after the removed value will decrease by one.
The index of the iterator then increases and skips the next item in the array.

To fix this, the iterator must not increase when it removes a value from the array.

```typescript
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
```

### Question 2

I chose to implement the ItemStore class as an array of Item objects. Using an array allows me to use array methods such as find and filter for ItemStore's methods. I use the find method for ItemStore methods that look for only one value in the array (put and get). The find method is the best method to use in this case because it terminates after an iteration returns true.

I use the filter method for the dropByTag method because it is necessary to iterate over every item in the array.

```typescript
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
```

### Question 3

This exception occurs because the DOM element referenced by `document.getElementById('app-container')` has not loaded at the time that the line of javascript executes. This could be due to a script tag above the desired HTML element, or dependent resources that take time to load such as images, stylesheets, fonts, etc.

Calling the `ReactDOM.render` function in an on 'load' event listener guarantees that the DOM and its dependencies are fully loaded before the javascript function is called.

### Question 4

Bug1's rating method was returning itself instead of the `_rating` property. To fix this bug, it must return `this._rating`

```typescript
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
```

### Question 5

 The output of the code is:\
`orig and modified are the same`\
`orig.prop1 is m1`\
`orig.prop1 is m1`\
`orig.prop1 is m2`

The second `console.log` was skipped because the spread operator creates a copy of the object that is spread, so `orig` and `modified` are no longer pointing to the same object and are no longer strictly equal to each other.

### Bonus
 The secret message is:
```
 Congratulations, you solved the bonus question!

                                   .''.
       .''.      .        *''*    :_\/_:     .
      :_\/_:   _\(/_  .:.*_\/_*   : /\ :  .'.:.'.
  .''.: /\ :   ./)\   ':'* /\ * :  '..'.  -=:o:=-
 :_\/_:'.:::.    ' *''*    * '.'/.' _\(/_'.':'.'
 : /\ : :::::     *_\/_*     -= o =-  /)\    '
  '..'  ':::'     * /\ *     .'/.'.   '
                   *..*         :
```
My solution:

```typescript
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
```

## Running the tests

1. Clone the project locally
2. Run `npm install` in your terminal
3. Run `npm run test` to run the tests
