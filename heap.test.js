import { expect } from 'chai'
import Heap from './heap'

describe('Heap', () => {

  describe('push(value)', () => {

    context('when the heap is empty', () => {

      it('adds the value to the heap', () => {
        const heap = new Heap()
        heap.push(5)
        expect(heap.peek()).to.equal(5)
      })

    })

    context('when the heap contains an item greater than value', () => {

      it('adds the value to the top of the heap', () => {
        const heap = new Heap(6)
        heap.push(5)
        expect([...heap]).to.deep.equal([5, 6])
      })

    })

    context('when the heap contains an item less than value', () => {

      it('add the value to the bottom of the heap', () => {
        const heap = new Heap(6, 2, 9, 18, 6)
        heap.push(20)
        expect([...heap]).to.deep.equal([2, 6, 6, 9, 18, 20])
      })

    })

  })

  describe('pop()', () => {

    context('when the heap is empty', () => {

      it('returns undefined', () => {
        const heap = new Heap()
        const item = heap.pop()
        expect(item).to.equal(void 0)
      })

    })

    context('when the heap contains one item', () => {

      it('returns and removes the item', () => {
        const heap = new Heap(3)
        expect(heap.pop()).to.equal(3)
        expect(heap.pop()).to.equal(void 0)
      })

    })

    context('when the heap contains many items', () => {

      it('returns and removes the minimum item', () => {
        const heap = new Heap(5, 8, 3, 20, 15)
        expect(heap.pop()).to.equal(3)
        expect(heap.pop()).to.equal(5)
        expect(heap.pop()).to.equal(8)
        expect(heap.pop()).to.equal(15)
        expect(heap.pop()).to.equal(20)
      })

    })

  })

})
