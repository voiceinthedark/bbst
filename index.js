import Tree from "./tree.js";

let t = new Tree([2,5,2,6,1,3,8])
console.log(t.root.key)
console.log(t.prettyPrint(t.root))
let arr = []
t.preorder(t.root, arr)
console.log(arr)
