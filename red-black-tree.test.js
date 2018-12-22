import RedBlackTree from './red-black-tree'
import { expect } from 'chai'

describe.only('Red Black Tree', () => {
  describe('insert', () => {
    it('should be able to insert a root node', () => {
      const tree = new RedBlackTree()
      tree.insert(5)
      expect(tree.contains(5)).to.equal(true)
    })

    it('should be able to insert multiple nodes', () => {
      const tree = new RedBlackTree()
      tree.insert(5, 6)
      expect(tree.contains(5)).to.equal(true)
      expect(tree.contains(6)).to.equal(true)
    })
  })
})
