import { expect } from 'chai'
import BinaryTree from './binary-tree'

describe('BinaryTree', () => {

  describe('inOrder()', () => {

    it('generates values in sort order', () => {
      const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
      expect([...tree.inOrder()])
        .to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

  })

  describe('preOrder()', () => {

    it('generates values in pre-order', () => {
      const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
      expect([...tree.preOrder()])
        .to.deep.equal([6, 4, 2, 1, 3, 5, 9, 8, 7, 10])
    })

  })

  describe('postOrder()', () => {

    it('generates values in post-order', () => {
      const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
      expect([...tree.postOrder()])
        .to.deep.equal([1, 3, 2, 5, 4, 7, 8, 10, 9, 6])
    })

  })

  describe('levelOrder()', () => {

    it('generates values in level-order', () => {
      const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
      expect([...tree.levelOrder()])
        .to.deep.equal([6, 4, 9, 2, 5, 8, 10, 1, 3, 7])
    })
  })

  describe('contains(value)', () => {

    context('when the tree is empty', () => {

      it('returns false', () => {
        const tree = new BinaryTree()
        expect(tree.contains(42)).to.equal(false)
      })

    })

    context('when the tree does not contain the value', () => {

      it('returns false', () => {
        const tree = new BinaryTree(4, 2, 1, 6, 7, 5)
        expect(tree.contains(8)).to.equal(false)
      })

    })

    context('when the tree contains the value', () => {

      it('returns true', () => {
        const tree = new BinaryTree(4, 2, 1, 6, 7, 5)
        expect(tree.contains(1)).to.equal(true)
        expect(tree.contains(2)).to.equal(true)
        expect(tree.contains(4)).to.equal(true)
        expect(tree.contains(5)).to.equal(true)
        expect(tree.contains(6)).to.equal(true)
        expect(tree.contains(7)).to.equal(true)
      })

    })

  })

  describe('delete(value)', () => {

    context('when the tree is empty', () => {

      it('returns the tree', () => {
        const tree = new BinaryTree()
        const result = tree.delete(42)
        expect(result).to.equal(tree)
      })

    })

    context('when the tree only contains the value', () => {

      it('removes the value and returns the tree', () => {
        const tree = new BinaryTree(42)
        const result = tree.delete(42)
        expect(result).to.equal(tree)
        expect(tree.contains(42)).to.equal(false)
      })

    })

    context('when the tree does not contain the value', () => {

      it('returns the tree', () => {
        const tree = new BinaryTree(4, 2, 1, 6, 7, 5)
        const result = tree.delete(42)
        expect(result).to.equal(tree)
        expect(tree.contains(1)).to.equal(true)
        expect(tree.contains(2)).to.equal(true)
        expect(tree.contains(4)).to.equal(true)
        expect(tree.contains(5)).to.equal(true)
        expect(tree.contains(6)).to.equal(true)
        expect(tree.contains(7)).to.equal(true)
      })

    })

    context('when the tree contains the value', () => {

      context('and the value is in a leaf', () => {

        it('removes the value and returns the tree', () => {
          const tree = new BinaryTree(4, 2, 1, 6, 7, 5)
          const result = tree.delete(1).delete(7)
          expect(result).to.equal(tree)
          expect(tree.contains(1)).to.equal(false)
          expect(tree.contains(2)).to.equal(true)
          expect(tree.contains(4)).to.equal(true)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(6)).to.equal(true)
          expect(tree.contains(7)).to.equal(false)
        })

      })

      context('and the value has no right child', () => {

        it('removes the root and returns the tree', () => {
          const tree = new BinaryTree(2, 1)
          const result = tree.delete(2)
          expect(result).to.equal(tree)
          expect(tree.contains(2)).to.equal(false)
          expect(tree.contains(1)).to.equal(true)
        })

        it('removes the value and returns the tree', () => {
          const tree = new BinaryTree(4, 2, 1, 6, 7, 5)
          const result = tree.delete(2)
          expect(result).to.equal(tree)
          expect(tree.contains(1)).to.equal(true)
          expect(tree.contains(2)).to.equal(false)
          expect(tree.contains(4)).to.equal(true)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(6)).to.equal(true)
          expect(tree.contains(7)).to.equal(true)
        })

      })

      context('and the value has a right child with no left child', () => {

        it('removes the root and returns the tree', () => {
          const tree = new BinaryTree(3, 5, 2)
          const result = tree.delete(3)
          expect(result).to.equal(tree)
          expect(tree.contains(3)).to.equal(false)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(2)).to.equal(true)
        })

        it('removes child and returns the tree', () => {
          const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
          const result = tree.delete(9)
          expect(result).to.equal(tree)
          expect(tree.contains(1)).to.equal(true)
          expect(tree.contains(2)).to.equal(true)
          expect(tree.contains(3)).to.equal(true)
          expect(tree.contains(4)).to.equal(true)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(6)).to.equal(true)
          expect(tree.contains(7)).to.equal(true)
          expect(tree.contains(8)).to.equal(true)
          expect(tree.contains(9)).to.equal(false)
          expect(tree.contains(10)).to.equal(true)
        })

      })

      context('and the value has a right child with a left child', () => {

        it('removes the root and returns the tree', () => {
          const tree = new BinaryTree(6, 4, 9, 2, 5, 8, 10, 1, 3, 7)
          const result = tree.delete(6)
          expect(result).to.equal(tree)
          expect(tree.contains(1)).to.equal(true)
          expect(tree.contains(2)).to.equal(true)
          expect(tree.contains(3)).to.equal(true)
          expect(tree.contains(4)).to.equal(true)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(6)).to.equal(false)
          expect(tree.contains(7)).to.equal(true)
          expect(tree.contains(8)).to.equal(true)
          expect(tree.contains(9)).to.equal(true)
          expect(tree.contains(10)).to.equal(true)
        })

        it('removes the child and returns the tree', () => {
          const tree = new BinaryTree(1, 4, 3, 6, 5, 2)
          const result = tree.delete(4)
          expect(result).to.equal(tree)
          expect(tree.contains(1)).to.equal(true)
          expect(tree.contains(2)).to.equal(true)
          expect(tree.contains(3)).to.equal(true)
          expect(tree.contains(4)).to.equal(false)
          expect(tree.contains(5)).to.equal(true)
          expect(tree.contains(6)).to.equal(true)
        })

      })

    })

  })

})
