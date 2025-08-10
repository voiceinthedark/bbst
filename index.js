import Tree from "./tree.js";

let t = new Tree([2,5,2,6,1,3,8])
console.log(t.root.key)
console.log(t.prettyPrint(t.root))
let arr = []
t.preorder(t.root, arr)
console.log(arr)

arr = []
t.insert(55)
t.insert(4)
t.preorder(t.root, arr)
console.log(arr)
arr = []
t.insert(2)
t.preorder(t.root, arr)
console.log(arr)
