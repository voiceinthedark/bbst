// @ts-check

/**
 * @class Node
 * @classdesc A node that holds data and pointer to left and right node
 * */
class Node {
  /** @type {any} */
  #key
  /** @type {Node | null | undefined} */
  #left;
  /** @type {Node | null} */
  #right;

  /**@constructor
   * @param {any} key 
   * */
  constructor(key) {
    this.#key = key
    this.#left = null
    this.#right = null
  }

  /** @method to return the key of the node
   * @returns {any}
   * */
  get key(){
    return this.#key
  }

  /**
   * @method to set the key value
   * @param {*} val 
   * */
  set key(val){
    this.#key = val
  }

  /**
   * @method to return the left node
   * @returns {Node | null | undefined}
   * */
  get left(){
    return this.#left
  }


  /**
   * @method to set the left Node
   * @param {*} val 
   * */
  set left(val){
    this.#left = val
  }
  
  /**
   * @method to get the right node
   * @returns {Node | null | undefined} 
   * */
  get right(){
    return this.#right
  }

  /**
   * @method to set the right node value
   * @param {*} val 
   * */
  set right(val){
    this.#right = val
  }
}

/** @module Node */
export default Node;
