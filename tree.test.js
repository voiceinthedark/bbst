import Tree from "./tree.js";
import Node from "./Node.js";

describe('Tree module', () => {
  describe('constructor test', () => {
    test('class should be initialized with default values', () => {
      let t = new Tree([1, 2, 3])
      expect(t).toBeInstanceOf(Tree)
    })
  })
  describe('buildtree method test', () => {
    let t;
    beforeEach(() => {
      t = new Tree([4, 3, 2, 5, 6, 4, 8, 9])
    })
    test('build tree should return a node object', () => {
      expect(t.buildTree()).toBeInstanceOf(Node)
    })
    test('buildtree should return a root of 5', () => {
      expect(t.buildTree().key).toBe(5)
    })
  })

  describe('insert method test', () => {
    test('inserting a value will keep the tree balanced', () => {
        
    })

  })

})
