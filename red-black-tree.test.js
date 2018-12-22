import RedBlackTree from './red-black-tree'
import { expect } from 'chai'

describe.only('Red Black Tree', () => {

  describe('insert(value)', () => {

    it('should be able to insert a root node', () => {
      const tree = new RedBlackTree()
      tree.insert(5)
      expect(tree.toJSON()).to.deep.equal({
        value: 5,
        left: null,
        right: null,
        isBlack: true
      })
    })

    it('should be able to insert multiple nodes', () => {
      const tree = new RedBlackTree()
      tree
        .insert(5)
        .insert(6)
      expect(tree.toJSON()).to.deep.equal({
        value: 5,
        left: null,
        isBlack: true,
        right: {
          value: 6,
          left: null,
          right: null,
          isBlack: false
        }
      })
    })

    it('should rebalance ascending insertions', () => {
      const tree = new RedBlackTree(1, 2, 3)
      expect(tree.toJSON()).to.deep.equal({
        value: 2,
        isBlack: true,
        left: {
          value: 1,
          isBlack: false,
          left: null,
          right: null
        },
        right: {
          value: 3,
          isBlack: false,
          left: null,
          right: null
        }
      })
    })

    it('should rebalance descending insertions', () => {
      const tree = new RedBlackTree(3, 2, 1)
      expect(tree.toJSON()).to.deep.equal({
        value: 2,
        isBlack: true,
        left: {
          value: 1,
          isBlack: false,
          left: null,
          right: null
        },
        right: {
          value: 3,
          isBlack: false,
          left: null,
          right: null
        }
      })
    })

    it('should rebalance left-right insertions', () => {
      const tree = new RedBlackTree(3, 1, 2)
      expect(tree.toJSON()).to.deep.equal({
        value: 2,
        isBlack: true,
        left: {
          value: 1,
          isBlack: false,
          left: null,
          right: null
        },
        right: {
          value: 3,
          isBlack: false,
          left: null,
          right: null
        }
      })
    })

    it('should rebalance right-left insertions', () => {
      const tree = new RedBlackTree(1, 3, 2)
      expect(tree.toJSON()).to.deep.equal({
        value: 2,
        isBlack: true,
        left: {
          value: 1,
          isBlack: false,
          left: null,
          right: null
        },
        right: {
          value: 3,
          isBlack: false,
          left: null,
          right: null
        }
      })
    })

  })

  describe('contains(value)', () => {

    context('when the tree is empty', () => {

      it('returns false', () => {
        const tree = new RedBlackTree()
        expect(tree.contains(5)).to.equal(false)
      })

    })

    context('when the tree does not contain the value', () => {

      it('returns false', () => {
        const tree = new RedBlackTree(1, 2, 3, 4)
        expect(tree.contains(5)).to.equal(false)
      })

    })

    context('when the tree contains the value', () => {

      it('returns true', () => {
        const tree = new RedBlackTree(1, 2, 3, 4)
        expect(tree.contains(4)).to.equal(true)
      })

    })

  })

})
