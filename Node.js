// @ts-check

/**
 * @class Node
 * @classdesc A node that holds data and pointer to next node
 * */
class Node {
  /** @type {any} */
  #key
  /** @type {Node | null | undefined} */
  #nextNode;
  /** @type {number} */
  #hashKey;

  /**@constructor
   * @param {any} key 
   * @param {Node | null | undefined} next 
   * @param {number} hash 
   * */
  constructor(key, next, hash) {
    this.#key = key
    this.#nextNode = next ?? null;
    this.#hashKey = hash;
  }

  /**
   * @method to set the hashKey of the node
   * @param {number} val 
   * */
  set hashKey(val){
    this.#hashKey = val
  }

  /**
   * @method to get the hashkey of the node
   * @returns {number}
   * */
  get hashKey(){
    return this.#hashKey
  }

  /** @method to return the key of the node
   * @returns {any}
   * */
  get key(){
    return this.#key
  }

  /**
   * @method to get the next node
   * @returns {Node | null | undefined }
   * */
  get nextNode() {
    return this.#nextNode
  }

  /**
   * @method to set the next node
   * @param {Node | null |undefined} val 
   * */
  set nextNode(val) {
    this.#nextNode = val;
  }
}

/** @module Node */
export default Node;
