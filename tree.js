// @ts-check

import Node from "./Node.js";

/**
 * @class Tree
 * @classdesc A class to hold a binary search tree
 * */
class Tree {
  /** @type {Array} */
  #array;
  /** @type {Node | null | undefined} */
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
    let copy = array.sort((a, b) => a - b)
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
   * @param {Node | null | undefined} [node=this.#root] 
   * @param {string} [prefix=''] 
   * @param {boolean} [isLeft=true] 
   * */
  prettyPrint(node = this.#root, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
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
   * @method to traverse the tree in BFS and apply a callback on each node
   * @param {Function} callback 
   * */
  levelOrderForEach(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('callback should be a function')
    }

    let q = [] // assign a queue
    let source = this.#root;
    q.push(source) // add element to front
    while (q) { // while q not empty
      let r = q.shift();
      if (!r || r === undefined)
        break
      callback(r);
      if (r?.left)
        q.push(r.left)
      if (r?.right)
        q.push(r.right)
    }
  }

  /**
   * @method to traverse the tree inorder and apply callback on each node
   * @param {Function} callback 
   * */
  inorderForEach(callback) {
    let r = this.#root
    if (!r) return
    this.#inorderRec(r.left, callback)
    callback(r)
    this.#inorderRec(r.right, callback);
  }

  /**
   * @method helper in order method
   * @param {Node | null | undefined} root 
   * @param {Function} func 
   * */
  #inorderRec(root, func) {
    if (root === null || root === undefined)
      return
    if (root?.left)
      this.#inorderRec(root.left, func)
    func(root)
    if (root?.right)
      this.#inorderRec(root.right, func)
  }

  /**
   * @method to traverse the tree in preorder and apply callback on each node
   * @param {Function} callback 
   * */
  preorderForEach(callback) {
    if (typeof callback !== 'function')
      throw new Error('only a function is acceptable as callback')
    let r = this.#root
    if (!r)
      return
    callback(r)
    this.#preorderRec(r?.left, callback)
    this.#preorderRec(r?.right, callback)
  }

  /**
   * @method helper to traverse the tree in preorder and apply callback on each node
   * @param {Node|null|undefined} root 
   * @param {Function} func 
   * */
  #preorderRec(root, func) {
    if (root === null || root === undefined) {
      return; // Base case: stop if the node is null
    }
    func(root)
    if (root?.left)
      this.#preorderRec(root.left, func)
    if (root?.right)
      this.#preorderRec(root.right, func)
  }

  /**
   * @method to traverse the tree in post order and apply a callback to each node
   * @param {Function} callback 
   * */
  postorderForEach(callback) {
    if (typeof callback !== 'function')
      throw new Error('only a function is acceptable as callback')
    let r = this.#root
    if (!r)
      return
    this.#postorderRec(r.left, callback)
    this.#postorderRec(r.right, callback)
    callback(r)
  }

  /**
   * @method helper for the post order traversal
   * @param {Node| null| undefined} root 
   * @param {Function} func 
   * */
  #postorderRec(root, func) {
    if (root === null || root === undefined) {
      return; // Base case: stop if the node is null
    }
    if (root?.left)
      this.#postorderRec(root.left, func)
    if (root?.right)
      this.#postorderRec(root.right, func)
    func(root)
  }

  /**
       * @method to return the depth of the value
       * @param {*} value 
       * @returns {number | null}
       * */
  depth(value) {
    // Start the recursive search from the root with an initial depth of 0
    return this.#getDepthRec(value, this.#root, 0);
  }

  /**
   * @method helper to calculate the depth of a value recursively
   * @param {*} value - The value whose depth we are trying to find.
   * @param {Node | null | undefined} currentNode - The current node being visited in the traversal.
   * @param {number} currentDepth - The depth of the currentNode from the original tree's root.
   * @returns {number | null} The depth of the value if found, or null if not found.
   * */
  #getDepthRec(value, currentNode, currentDepth) {
    // Base Case 1: If we've reached a null node, the value is not on this path.
    if (currentNode === null || currentNode === undefined) {
      return null; // Indicate that the value was not found
    }

    // Base Case 2: If the current node's key matches the value, we found it.
    // The currentDepth is its depth from the tree's root.
    if (value === currentNode.key) {
      return currentDepth;
    }

    // Recursive Case: Value is in the left subtree
    if (value < currentNode.key) {
      return this.#getDepthRec(value, currentNode.left, currentDepth + 1);
    }
    // Recursive Case: Value is in the right subtree
    else { // value > currentNode.key
      return this.#getDepthRec(value, currentNode.right, currentDepth + 1);
    }
  }

  /**
     * @method to get the height of a value
     * @param {*} value 
     * @returns {number | null}
     * */
  height(value) {
    const targetNode = this.search(value);
    if (!targetNode) {
      return null; // Value not found in the tree
    }
    return this.#calculateNodeHeight(targetNode);
  }

  /**
   * @method helper to calculate the height of a given node (subtree)
   * @param {Node | null | undefined} node 
   * @returns {number}
   * */
  #calculateNodeHeight(node) {
    // Base case: If the node is null, its height is -1.
    // This allows a leaf node (with null children) to have a height of 0.
    if (node === null || node === undefined) {
      return -1;
    }

    // Recursively calculate the height of the left and right subtrees
    const leftHeight = this.#calculateNodeHeight(node.left);
    const rightHeight = this.#calculateNodeHeight(node.right);

    // The height of the current node is 1 plus the maximum of its children's heights
    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * @method to check if the tree is balanced
   * @returns {boolean}
   * */
  isBalanced() {
    // Check every node if the height difference between its left and right subtree is not bigger than 1
    // use levelorder traversal to check each node

    let arr = []
    this.levelOrderForEach((node) => {
      arr.push(this.#checkHeight(node))
    })
    return arr.every((e) => {
      return e <= 1 && e >= -1 
    })
  }

  /**
   * @method to check the height difference between the left and right subtrees of a node
   * @param {Node} node 
   * @returns {number}
   * */
  #checkHeight(node) {
    // Base case: If the node is null, its height is -1.
    if (node === null || node === undefined) {
      return -1;
    }

    // Recursively calculate the height of the left and right subtrees
    const leftHeight = this.#calculateNodeHeight(node.left);
    const rightHeight = this.#calculateNodeHeight(node.right);

    // The height of the current node is 1 plus the maximum of its children's heights
    return leftHeight - rightHeight
  }

  /**
   * @method to rebalance an unbalanced tree
   * */
  rebalance(){
    if(this.isBalanced()) return
  // travel inorder and collect the array
    let arr = []
    this.inorderForEach((node) => {
      arr.push(node.key)
    })
    // rebuild tree from array
    this.#root = this.buildTree(arr)
  }
}

/**
 * @module Tree
 * */
export default Tree;
