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
 I chose to implement the ItemStore object as an array of Item objects. Using an array allowed me to use array methods such as find an filter for ItemStore's methods. I used the find method for ItemStore methods that looked for only one value in the array (put and get). Find is the best method to use in this case because it terminates after an iteration returns true.
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

/** END SOLUTIONS */

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
