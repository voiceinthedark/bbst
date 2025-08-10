// @ts-check

import Node from "./Node.js";

/**
 * @class Tree
 * @classdesc A class to hold a binary search tree
 * */
class Tree {
  /** @type {Array} */
  #array;
  /** @type {Node | null} */
  #root;

  /**
   * @constructor
   * @param {Array} array 
   * */
  constructor(array) {
    this.#array = array;
    this.#root = this.buildTree(array)
  }

  get root() {
    return this.#root
  }

  get array() {
    return this.#array
  }

  /**
   * @method to build a bst from the array provided
   * @param {Array} array 
   * @returns {Node | null}
   * */
  buildTree(array) {
    let copy = array.sort()
    let sanitized = Array.from(new Set(copy));

    return this.#bst(sanitized, 0, sanitized.length - 1)
  }

  /**
   * @method to build a search tree
   * @param {Array} arr 
   * @param {number} start 
   * @param {number} end 
   * */
  #bst(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid])
    root.left = this.#bst(arr, start, mid - 1)
    root.right = this.#bst(arr, mid + 1, end)
    return root;
  }

  /**
   * @method prettyPrint to print the bst
   * @param {Node} node 
   * @param {string} [prefix=''] 
   * @param {boolean} [isLeft=true] 
   * */
  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null && node.right !== undefined) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.key}`);
    if (node.left !== null && node.left !== undefined) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  /**
   * @method to return an array of values in preorder
   * @param {Node | null | undefined} root 
   * @param {Array} arr 
   * */
  preorder(root, arr) {
    let array = arr
    if (root === null) return
    array.push(root?.key)
    this.preorder(root?.left, array)
    this.preorder(root?.right, array)
  }

  /**
   * @method to insert a value into the bst
   * @param {*} value 
   * */
  insert(value) {
    if (this.#root) {
      let r = this.#root
      while (r != null) {
        if (value === r.key) return
        if (value > r.key) {
          // go right
          if (r.right) {
            r = r.right
          }
          else {
            r.right = new Node(value)
            return;
          }
        }
        if (value < r.key) {
          // go left
          if (r.left)
            r = r.left
          else {
            r.left = new Node(value)
            return;
          }
        }
      }
    }
  }

  /**
   * @method to search for a key in the tree
   * @param {*} key 
   * @returns {Node | null}
   * */
  search(key) {
    return this.#searchRec(key, this.#root);
  }

  /**
   * @method to search for a key recursively
   * @param {*} key 
   * @param {Node | null | undefined} root 
   * */
  #searchRec(key, root) {
    let r = root;

    if (r === null || r === undefined) return null;
    if (key === r.key) return r
    if (r.key > key)
      return this.#searchRec(key, r.left)
    if (r.key < key)
      return this.#searchRec(key, r.right)
  }

  /**
   * @method to delete a value from the tree
   * @param {*} value 
   * */
  delete(value) {
    this.#root = this.#deleteRec(this.#root, value);
  }

  /**
   * @method helper to delete a value recursively
   * @param {*} value 
   * @param {Node | null | undefined} root 
   * @returns {Node | null | undefined}
   * */
  #deleteRec(root, value) {
    if (root === null || root === undefined) {
      return null; // Node not found
    }

    if (value < root.key) {
      root.left = this.#deleteRec(root?.left, value);
      return root;
    } else if (value > root.key) {
      root.right = this.#deleteRec(root.right, value);
      return root;
    } else {
      // Node found (root.key === value)

      // Case 1: Node with no children or only one child
      if (root.left === null) {
        return root.right; // Replace node with its right child (could be null)
      } else if (root.right === null) {
        return root.left; // Replace node with its left child
      }

      // Case 2: Node with two children
      // Find the in-order successor (smallest in the right subtree)
      let temp = root.right;
      while (temp?.left !== null) {
        temp = temp?.left;
      }

      // Copy the successor's content to this node
      root.key = temp?.key;

      // Delete the in-order successor from the right subtree
      root.right = this.#deleteRec(root.right, temp?.key);
      return root;
    }
  }

  /**
   * @method to traverse the array in BFS and apply a callback on each node
   * @param {Function} callback 
   * */
  levelOrderForEach(callback) {
    if(!callback || typeof callback !== 'function'){
      throw new Error('callback should be a function')
    }

    let q = [] // assign a queue
    let source = this.#root;
    q.push(source) // add element to front
    while(q){ // while q not empty
      let r = q.shift();
      if(!r || r === undefined)
        break
      callback(r);
      if(r?.left)
        q.push(r.left)
      if(r?.right)
        q.push(r.right)
    }
  }
}

/**
 * @module Tree
 * */
export default Tree;
