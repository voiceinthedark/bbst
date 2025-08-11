import Tree from "./tree.js";

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
t.prettyPrint(t.root)
t.levelOrderForEach((node) => {
 console.log(` ${node.key} `)
})

t.inorderForEach((node) => console.log(node.key))

