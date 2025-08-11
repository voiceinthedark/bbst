import Tree from "./tree.js";
import Node from "./Node.js";

describe('Tree module', () => {
  describe('constructor test', () => {
    let t = new Tree([1, 2, 3])
    test('class should be initialized with default values', () => {
      expect(t).toBeInstanceOf(Tree)
    })
    test('build tree should return a node', () => {
      expect(t.buildTree([1, 2, 3])).toBeInstanceOf(Node)
    })
  })
  describe('buildtree method test', () => {
    let t = new Tree([4, 3, 2, 5, 6, 4, 8, 9])
    test('build tree should return a node object', () => {
      expect(t.buildTree([1, 2, 4])).toBeInstanceOf(Node)
    })
    test('buildtree should return a root of 5', () => {
      expect(t.buildTree([4, 3, 2, 5, 6, 4, 8, 9]).key).toBe(5)
    })
  })

  describe('search method test', () => {
    let t = new Tree([4, 3, 2, 5, 6, 4, 8, 9])
    test('search for a nonexistant item returns null', () => {
      expect(t.search(1)).toBeNull()
    })
    test('searching for an existant item returns a node', () => {
      expect(t.search(4)).toBeInstanceOf(Node)
    })
    test('searching for an existant item returns the same key', () => {
      expect(t.search(5).key).toBe(5)
    })
  })

})
