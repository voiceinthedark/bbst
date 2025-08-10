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
        if(value === r.key) return
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

  delete(value) {
    // TODO: implement delete method
  }
}

/**
 * @module Tree
 * */
export default Tree;
