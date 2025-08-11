import Tree from "./tree.js";

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
t.prettyPrint(t.root)
t.levelOrderForEach((node) => {
 console.log(` ${node.key} `)
})

console.log('inorder traversal:')
t.inorderForEach((node) => console.log(node.key))
console.log('preoder traversal:')
t.preorderForEach((node) => console.log(node.key))
console.log('post order traversal:')
t.postorderForEach((node) => console.log(node.key))

console.log(`depth of 8: ${t.depth(8)}`)
console.log(`depth of 6345: ${t.depth(6345)}`)
console.log(`depth of 23: ${t.depth(23)}`)
console.log(`depth of 9: ${t.depth(9)}`) // 2

console.log(`height of 9: ${t.height(9)}`) // 1
console.log(`height of 8: ${t.height(8)}`) // 3
console.log(`height of 6345: ${t.height(6345)}`) // 0

console.log(t.isBalanced())
