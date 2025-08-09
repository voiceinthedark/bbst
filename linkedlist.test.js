import LinkedList from "./linkedlist";

describe('Linkedlist tests', () => {
  describe('Constructor setting', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
    })

    test('correct values for default initiation', () => {
      expect(list.size).toBe(0)
      expect(list.head).toBeNull()
      expect(list.tail).toBeNull()
    })
  })

  describe('append method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
    })
    test('appending an item increases size', () => {
      list.append('item', 3)
      expect(list.size).toBe(1)
    })
    test('heads and tail point to same element with 1 insertion', () => {
      list.append(3, 5)
      expect(list.head).toEqual(list.tail)
    })
  })

  describe('prepend method tests', () => {

    let list;
    beforeEach(() => {
      list = new LinkedList()
    })
    test('prepending items add them to the head of the list', () => {
      list.prepend(3, 12)
      list.prepend(1, 10)
      expect(list.at(0).key).toBe(1)
      expect(list.at(1).key).toBe(3)
    })
  })

  describe('At method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('at returns the correct node at the position', () => {
      expect(list.at(0).key).toBe(1)
      expect(list.at(3).key).toBe(6)
    })

    test('out of bound index returns null', () => {
      expect(list.at(-3)).toBeNull()
      expect(list.at(19)).toBeNull()
    })
  })

  describe('pop method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('pop decrease the size of the list', () => {
      list.pop()
      expect(list.size).toBe(3)
    })

    test('poping returns the last element of the list', () => {
      expect(list.pop().key).toBe(6)
    })

    test('poping an empty list returns null', () => {
      list = new LinkedList();
      expect(list.pop()).toBeNull()
    })

  })
  describe('contains method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('contains returns true for an existant element', () => {
      expect(list.contains(2)).toBeTruthy()
      expect(list.contains(6)).toBeTruthy()
    })
    test('non existant items return false', () => {
      expect(list.contains(33)).toBeFalsy()
    })
  })

  describe('find method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('find returns the right index of the item', () => {
      expect(list.find(1)).toBe(0)
      expect(list.find(6)).toBe(3)
    })

    test('a none existant item returns null', () => {
      expect(list.find(9)).toBeNull()
    })
  })
  describe('insert at method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('inserting at the position will insert the item correctly', () => {
      list.insertAt(7, 2, 5)
      expect(list.find(7)).toBe(2)
    })
    test('inserting an item out of bounds does nothing', () => {
      expect(list.insertAt(66, -3, 3)).toBeUndefined()
    })
  })
  describe('removeat method tests', () => {

    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('removing out of bound returns null', () => {
      expect(list.removeAt(-4)).toBeNull()
    })
    test('removing an item delete the item and returns it', () => {
      expect(list.removeAt(0)).toBe(1)
      expect(list.contains(1)).toBeFalsy()
    })
    test('removing an item at greater than 0 index works', () => {
      expect(list.removeAt(2)).toBe(3)
    })
  })
  describe('keys method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('keys returns an array with the same number of keys', () => {
      expect(list.keys()).toHaveLength(4)
    })
    test('the array returned should hold the keys as items', () => {
      expect(list.keys()).toContain(6)
    })

  })

  describe('tostring method tests', () => {

    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('toString should return a valid string', () => {
      expect(list.toString()).toMatch(/^\( [0-9]+ \)/)
    })

  })
  describe('get method tests', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList()
      list.append(1, 1)
      list.append(2, 2)
      list.append(3, 5)
      list.append(6, 2)
    })
    test('get return the correct node', () => {
      expect(list.get(2)).toHaveProperty('key', 2)
    })
    test('nonexistant item returns null', () => {
      expect(list.get(77)).toBeNull()
    })
  })
})
