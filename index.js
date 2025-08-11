import Tree from "./tree.js";

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
t.prettyPrint(t.root)
t.levelOrderForEach((node) => {
 console.log(` ${node.key} `)
})

let newt = new Tree([3, 1, 8, 445, 112, 55, 99, 121])
newt.prettyPrint()
console.log(`balanced: ${newt.isBalanced()}`)
newt.insert(54)
newt.insert(32)
newt.insert(77)
newt.prettyPrint()
console.log(`balanced: ${newt.isBalanced()}`)
newt.rebalance()
newt.prettyPrint()
console.log(`balanced: ${newt.isBalanced()}`)
