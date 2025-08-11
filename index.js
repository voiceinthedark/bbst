import Tree from "./tree.js";
import Utils from "./util.js";

let array = Utils.arrayOfNumbers(15, 100)

let t = new Tree(array)
t.prettyPrint()
console.log(`balanced tree: ${t.isBalanced()}`)
// insert random numbers
for(let i = 0; i < 10; i++){
  t.insert(Utils.generateNumber(300).next().value)
}
t.prettyPrint()
console.log(`balanced tree: ${t.isBalanced()}`)
t.rebalance()
console.log('rebalancing...')
t.prettyPrint()
