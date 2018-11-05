import { expect } from 'chai'
import Queue from './queue'

describe('Queue', () => {

  describe('size', () => {

    context('when the queue is empty', () => {

      it('returns 0', () => {
        const queue = new Queue()
        expect(queue.size).to.equal(0)
      })

    })

    context('when the queue is not empty', () => {

      it('returns the number of items passed to the Queue', () => {
        const queue = new Queue(1, 2, 3, 4)
        expect(queue.size).to.equal(4)
      })

    })

  })

  describe('peek()', () => {

    context('when the queue is empty', () => {

      it('returns undefined', () => {
        const queue = new Queue()
        expect(queue.peek()).to.equal(undefined)
      })

    })

    context('when the queue not empty', () => {

      it('returns the first item in the queue', () => {
        const queue = new Queue(4, 5, 6, 7)
        expect(queue.peek()).to.equal(4)
      })

    })

  })

  describe('enqueue(value)', () => {

    it('adds a value to the end of the queue', () => {
      const queue = new Queue().enqueue(7)
      expect(queue.size).to.equal(1)
      expect(queue.peek()).to.equal(7)
    })
  })

  describe('dequeue()', () => {

    context('when the queue is empty', () => {

      it('throws a RangeError', () => {
        const queue = new Queue()
        expect(() => queue.dequeue()).to.throw(RangeError)
      })
    })

    context('when the queue is not empty', () => {

      it('removes and returns the first item in the queue', () => {
        const queue = new Queue(1, 2, 3, 4)
        expect(queue.dequeue()).to.equal(1)
        expect(queue.size).to.equal(3)
        expect(queue.peek()).to.equal(2)
        expect(queue.dequeue()).to.equal(2)
        expect(queue.size).to.equal(2)
        expect(queue.peek()).to.equal(3)
        expect(queue.dequeue()).to.equal(3)
        expect(queue.size).to.equal(1)
        expect(queue.peek()).to.equal(4)
        expect(queue.dequeue()).to.equal(4)
        expect(queue.size).to.equal(0)
        expect(queue.peek()).to.equal(undefined)
      })

    })

  })

})
