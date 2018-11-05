import { expect } from 'chai'
import Stack from './stack'

describe('Stack', () => {

  describe('size', () => {

    context('when the stack is empty', () => {

      it('returns 0', () => {
        const stack = new Stack()
        expect(stack.size).to.equal(0)
      })

    })

    context('when the stack is not empty', () => {

      it('returns the number of items passed to the Stack', () => {
        const stack = new Stack(5, 6, 7, 8)
        expect(stack.size).to.equal(4)
      })

    })

  })

  describe('peek()', () => {

    context('when the stack is empty', () => {

      it('returns undefined', () => {
        const stack = new Stack()
        expect(stack.peek()).to.equal(undefined)
      })

    })

    context('when the stack is not empty', () => {

      it('returns the last item in the stack', () => {
        const stack = new Stack(4, 5, 6, 7)
        expect(stack.peek()).to.equal(7)
      })

    })

  })

  describe('push(value)', () => {

    it('adds the value to the top of the stack', () => {
      const stack = new Stack(1, 3, 5).push(7)
      expect(stack.peek()).to.equal(7)
    })

  })

  describe('pop()', () => {

    context('when the stack is empty', () => {

      it('throws a RangeError', () => {
        const stack = new Stack()
        expect(() => stack.pop()).to.throw(RangeError)
      })

    })

    context('when the stack is not empty', () => {

      it('removes and returns the last item from the stack', () => {
        const stack = new Stack(4, 5, 6, 7)
        expect(stack.pop()).to.equal(7)
        expect(stack.size).to.equal(3)
        expect(stack.peek()).to.equal(6)
        expect(stack.pop()).to.equal(6)
        expect(stack.size).to.equal(2)
        expect(stack.peek()).to.equal(5)
        expect(stack.pop()).to.equal(5)
        expect(stack.size).to.equal(1)
        expect(stack.peek()).to.equal(4)
        expect(stack.pop()).to.equal(4)
        expect(stack.size).to.equal(0)
        expect(stack.peek()).to.equal(undefined)
      })

    })

  })

})
