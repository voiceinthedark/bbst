// @ts-check
import Node from "./Node.js";

/**
 * @class LinkedList
 * @classdesc A linked list class to hold a list of nodes
 * */
class LinkedList {
  /** @type {Node| null | undefined} */
  #currentNode;
  /** @type {number} */
  #size;
  /** @type {Node | null | undefined} */
  #head;
  /** @type {Node | null | undefined} */
  #tail;

  constructor() {
    this.#currentNode = null;
    this.#size = 0
    this.#head = null
    this.#tail = null
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head
  }

  get tail() {
    return this.#tail
  }

  get currentNode() {
    return this.#currentNode
  }

  /**
     * @method to add a value to the front of the list
     * @param {string} key 
     * @param {number} hash 
     * */
  append(key, hash) {
    const newNode = new Node(key, null, hash);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      if (this.#tail) {
        this.#tail.nextNode = newNode; // Link the old tail to the new node
        this.#tail = newNode; // Update the tail to the new node
      }

    }
    this.#size++;
    this.#currentNode = this.#tail; // Keep currentNode pointing to the last added element if it serves a purpose
  }

  /**
   * @method to add a value to the front of the list
   * @param {string} key 
   * @param {number} hash 
   * */
  prepend(key, hash) {
    if (!this.#head) {
      this.append(key, hash);
    } else {
      const prevNode = this.#head;
      this.#head = new Node(key, prevNode, hash);
      this.#size++
    }
  }

  /**
   * @method to get the node value
   * @param {any} key 
   * @returns {Node |null | undefined}
   * */
  get(key) {

    // get the index of the node
    let idx = this.find(key);
    if(!idx) return null;
    let current = this.#head
    if (idx === 0) {
      return current;
    }
    let i = 0;
    while (i < idx) {
      current = current?.nextNode
      i++
    }
    return current;
  }

  /** 
   * @method to get the node at the index
   * @param {number} index
   * @returns {Node | null | undefined}
   * */
  at(index) {
    if (index < 0 || index >= this.#size) {
      return null; // Or throw new Error('Index out of bounds');
    }

    let current = this.#head;
    let i = 0;
    while (i < index) {
      current = current?.nextNode;
      i++;
    }
    return current;
  }

  /** 
   * @method to remove and return the last element in the list
   * @returns {Node | null | undefined}
   * */
  pop() {
    if (!this.#head) {
      // Return null or throw an error consistently for an empty list
      // throw new Error('The list is empty');
      return null;
    }

    const valueToReturn = this.#tail; // Get the value of the last node before removal

    if (this.#size === 1) {
      // If there's only one node, clear the list
      this.#head = null;
      this.#tail = null;
      this.#currentNode = null; // Clear if it's meant to reflect list state
    } else {
      let current = this.#head;
      // Traverse until 'current' is the node BEFORE the tail
      while (current?.nextNode !== this.#tail) {
        current = current?.nextNode;
      }
      // 'current' is now the second-to-last node
      current.nextNode = null; // Disconnect the old tail
      this.#tail = current; // Update the tail to the second-to-last node
      this.#currentNode = this.#tail; // Keep currentNode pointing to the new tail if needed
    }
    this.#size--;
    return valueToReturn;
  }

  /**
   * @method to check whether a value exists in the list
   * @param {any} key 
   * @returns {boolean}
   * */
  contains(key) {
    if (!this.#head) {
      return false;
    } else {
      this.#currentNode = this.#head
      if (this.#currentNode) {
        while (this.#currentNode !== null) {
          // console.log(`node: ${this.#currentNode?.value}`)
          if (this.#currentNode?.key === key) {
            return true
          }
          this.#currentNode = this.#currentNode?.nextNode
        }
      }
    }
    return false
  }

  /** search the linked list for the val and return the index or null
   * @param {any} key 
   * @returns {any}
   * */
  find(key) {
    if (!this.#head) {
      return null
    }
    let current = this.#head;
    let i = 0;
    while (current !== null) {
      if (current.key === key) {
        return i
      }
      current = current.nextNode;
      i++
    }
    return null;
  }

  /**
   * @method to insert a node value at index location
   * @param {string} key 
   * @param {number} index
   * @param {number} hash 
   * */
  insertAt(key, index, hash) {
    // 1. Handle invalid index (negative or beyond the current size)
    if (index < 0 || index > this.#size) {
      return;
    }

    // 2. Handle insertion at the beginning (index 0) - delegate to prepend
    if (index === 0) {
      this.prepend(key, hash);
      return;
    }

    // 3. Handle insertion at the end (index === size) - delegate to append
    if (index === this.#size) {
      this.append(key, hash);
      return;
    }

    // 4. Handle insertion in the middle
    let current = this.#head;
    let previous = null;
    let i = 0;

    // Traverse to the node BEFORE the desired insertion index
    while (i < index) {
      previous = current;
      current = current?.nextNode; // `current` will be the node *at* the index
      i++;
    }

    // Create the new node, linking it to the node that was originally at `index`
    const newNode = new Node(key, current, hash);

    // Link the previous node to the new node
    if (previous) {
      previous.nextNode = newNode;
    }

    this.#size++;
  }

  /**
   * @method to remove the node at index
   * @param {number} index 
   * @returns {string | null | undefined}
   * */
  removeAt(index) {
    if (!this.#head)
      return null

    if (index < 0 || index > this.#size) {
      return null
    }

    if (index === 0) {
      const prevNode = this.#head
      this.#head = this.#head.nextNode;
      this.#size--
      return prevNode.key;
    }

    if (index > 0) {
      // get the previous to last node
      let current = this.#head
      let previous = null;
      let i = 0
      while (i < index) {
        previous = current;
        current = current.nextNode;
        i++
      }
      previous.nextNode = current.nextNode;
      this.#size--
      return current.key;
    }

  }

  /**
   * @method to return the keys in the nodelist
   * @returns {Array}
   * */
  keys() {
    let array = [];
    if (this.#head) {
      let current = this.#head
      array.push(current?.key);
      while (current.nextNode != null) {
        current = current.nextNode
        array.push(current.key)
      }
    }
    return array
  }

  /**
   * @method to return a string representation of the linked list
   * */
  toString() {
    if (!this.#head)
      return 'null'
    let current = this.#head;
    let str = '';
    while (current !== null) {
      str += `( ${current.key} ) -> `
      current = current.nextNode;
    }
    str += 'null'
    return str;
  }

}

/** @module LinkedList */
export default LinkedList;
