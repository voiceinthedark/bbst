// @ts-check

class Utils{
  constructor(){
  }

  /**
   * @static
   * @method to generate random numbers
   * @param {number} max
   * */
  static * generateNumber(max){
    let rnd = Math.random() * max
    yield Math.floor(rnd)
  }

  /**
   * return an array of n elements generated from random numbers
   * @param {number} n - number of elements in the array 
   * @param {number} [max=100] - the max value of the elements in the array
   * @returns {Array}
   * */
  static arrayOfNumbers(n, max = 100){
    let arr = []
    for(let i = 0; i < n; i++){
      arr.push(this.generateNumber(max).next().value)
    }
    return arr
  }

}

/**@module Utils */
export default Utils;
