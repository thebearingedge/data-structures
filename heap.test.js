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
        expect(heap.peek()).to.equal(5)
      })

    })

    context('when the heap contains an item less than value', () => {

      it('add the value to the bottom of the heap', () => {
        const heap = new Heap(6)
        heap.push(7)
        expect(heap.peek()).to.equal(6)
      })

    })

  })

})
