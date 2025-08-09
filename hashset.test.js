import Hashset from "./hashset.js";

describe('Hashset Tests', () => {

  describe('Constructor tests...', () => {
    const hashset = new Hashset();

    test('Hashset has a capacity of 16', () => {
      expect(hashset.capacity).toBe(16)
    })
    test('hashset has a load factor of 0.8', () => {
      expect(hashset.load_factor).toBe(0.8)
    })
  })

  describe('Add method tests', () => {
    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
    })
    test('adding an item increses the size', () => {
      expect(hashset.size).toBe(1)
    });

    test('adding the same item does nothing, size remain the same', () => {
      hashset.add('apple')
      expect(hashset.size).toBe(1)
    })
    test('Adding multiple items keep increasing the size', () => {
      hashset.add('banana')
      hashset.add('mango')
      hashset.add('pear')
      expect(hashset.size).toBe(4)
    })

    test('going over the load factor increases the capacity', () => {
      expect(hashset.capacity).toBe(16)
      hashset.add('banana')
      hashset.add('mango')
      hashset.add('pear')
      hashset.add('grape')
      hashset.add('grapefruit')
      hashset.add('avocado')
      hashset.add('berries')
      hashset.add('blackberries')
      hashset.add('lyche')
      hashset.add('citrus')
      hashset.add('peaches')
      hashset.add('pomegrenate')
      hashset.add('dragonfruit')
      expect(hashset.capacity).toBe(32)
      expect(hashset.size).toBe(14)
    })
  })

  describe('Has method tests', () => {
    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
      hashset.add('banana')
      hashset.add('mango')
    })
    test('has method returns true if key exists', () => {
      expect(hashset.has('apple')).toBeTruthy()
      expect(hashset.has('grape')).toBeFalsy()
    })
  })

  describe('Remove method tests', () => {
    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
      hashset.add('banana')
      hashset.add('mango')
    })
    test('remove a key from list decreases size', () => {
      expect(hashset.size).toBe(3)
      hashset.remove('mango')
      expect(hashset.size).toBe(2)
      expect(hashset.has('mango')).toBeFalsy()
    });
    test('remove an existant key returns true', () => {
      expect(hashset.remove('apple')).toBeTruthy()
    });
    test('removing a non existant key returns false', () => {
      expect(hashset.remove('water')).toBeFalsy()
    });
  });

  describe('length method tests', () => {

    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
      hashset.add('banana')
      hashset.add('mango')
    })

    test('expect length of list to be 3', () => {
      expect(hashset.length()).toBe(3)
    })
    test('an empty hashset returns 0 length', () => {
      hashset = new Hashset();
      expect(hashset.length()).toBe(0)
    })
  });

  describe('clear method tests', () => {

    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
      hashset.add('banana')
      hashset.add('mango')
    })
    test('clear remove all keys from the list', () => {
      hashset.clear()
      expect(hashset.length()).toBe(0)
      expect(hashset.has('apple')).toBeFalsy()
    })
  })
  describe('keys method tests', () => {

    let hashset;
    beforeEach(() => {
      hashset = new Hashset();
      hashset.add('apple')
      hashset.add('banana')
      hashset.add('mango')
    })
    test('keys should return an array of correct key size', () => {
      expect(hashset.keys()).toHaveLength(3)
    })
  })
})
