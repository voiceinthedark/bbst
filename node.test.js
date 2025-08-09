import Node from "./Node";

describe('Node tests', () => {
  describe('constructor tests', () => {
    test('constructor sets default value when initiated', () => {
      let n = new Node(3)
      expect(n.key).toBe(3)
      expect(n.right).toBeNull()
      expect(n.left).toBeNull()
    })
  })

  describe('set method', () => {
    let n = new Node(1)
    test('setting the key changes the value', () => {
      expect(n.key).toBe(1)
      n.key = 3
      expect(n.key).toBe(3)
    })
  })

  describe('left set method', () => {
    let n = new Node(1)
    test('setting left node changes its value', () => {
      expect(n.left).toBeNull()
      n.left = new Node(5)
      expect(n.left).toBeInstanceOf(Node)
    })
  })

  describe('right set method', () => {
    let n = new Node(1)
    test('setting right node changes its value', () => {
      expect(n.right).toBeNull()
      n.right = new Node(5)
      expect(n.right).toBeInstanceOf(Node)
    })
    
  })
  
})
