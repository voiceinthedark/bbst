import Node from "./Node.js";

describe('Node unit testing', () => {

  describe('constructor tests', () => {
    let node;
    beforeEach(() => {
      node = new Node('test', null, 1)
    })
    test('constructor sets the correct values', () => {
      expect(node.key).toBe('test')
      expect(node.nextNode).toBeNull()
      expect(node.hashKey).toBe(1)
    })
  })
})
