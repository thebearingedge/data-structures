import { expect } from 'chai'
import LinkedList from './linked-list'

describe('LinkedList', () => {

  describe('length', () => {

    context('when the list is empty', () => {

      it('is 0', () => {
        const list = new LinkedList()
        expect(list.length).to.equal(0)
      })

    })

    context('when the list is not empty', () => {

      it('is the number of values in the list', () => {
        const list = new LinkedList(6, 7, 8, 9, 10, 12, 13)
        expect(list.length).to.equal(7)
      })

    })

  })

  describe('head', () => {

    context('when the list is empty', () => {

      it('is undefined', () => {
        const list = new LinkedList()
        expect(list.head).to.equal(undefined)
      })

    })

    context('when the list is not empty', () => {

      it('is the first value in the list', () => {
        const list = new LinkedList(6, 7, 8, 9, 10, 12, 13)
        expect(list.head).to.equal(6)
      })

    })

  })

  describe('tail', () => {

    context('when the list is empty', () => {

      it('is undefined', () => {
        const list = new LinkedList()
        expect(list.tail).to.equal(undefined)
      })

    })

    context('when the list is not empty', () => {

      it('is the last value in the list', () => {
        const list = new LinkedList(6, 7, 8, 9, 10, 12, 13)
        expect(list.tail).to.equal(13)
      })

    })

  })

  describe('at(index)', () => {

    context('when the list is empty', () => {

      it('returns undefined', () => {
        const list = new LinkedList()
        const value = list.at(0)
        expect(value).to.equal(undefined)
      })

    })

    context('when the index is past the end of the list', () => {

      it('returns undefined', () => {
        const list = new LinkedList(1, 2, 3)
        const value = list.at(4)
        expect(value).to.equal(undefined)
      })

    })

    context('when the index is within the list range', () => {

      it('returns the value at that index', () => {
        const list = new LinkedList(1, 2, 3)
        const value = list.at(1)
        expect(value).to.equal(2)
      })

    })

  })

  describe('append(value)', () => {

    context('when the list is empty', () => {

      it('sets the head and tail of the list', () => {
        const list = new LinkedList().append(1)
        expect(list.head).to.equal(1)
        expect(list.tail).to.equal(1)
        expect(list.length).to.equal(1)
        expect([...list]).to.deep.equal([1])
      })

    })

    context('when the list is not empty', () => {

      it('appends to the tail of the list', () => {
        const list = new LinkedList(4, 5).append(7)
        expect(list.head).to.equal(4)
        expect(list.tail).to.equal(7)
        expect(list.length).to.equal(3)
        expect([...list]).to.deep.equal([4, 5, 7])
      })

    })

  })

  describe('prepend(value)', () => {

    context('when the list is empty', () => {

      it('sets the head and tail of the list', () => {
        const list = new LinkedList().prepend(1)
        expect(list.head).to.equal(1)
        expect(list.tail).to.equal(1)
        expect(list.length).to.equal(1)
        expect([...list]).to.deep.equal([1])
      })

    })

    context('when the list is not empty', () => {

      it('sets the head of the list', () => {
        const list = new LinkedList(4, 5).prepend(7)
        expect(list.head).to.equal(7)
        expect(list.tail).to.equal(5)
        expect(list.length).to.equal(3)
        expect([...list]).to.deep.equal([7, 4, 5])
      })

    })

  })

  describe('insert(index, value)', () => {

    context('when the list is empty and the index is 0', () => {

      it('sets the head of the list', () => {
        const list = new LinkedList().insert(0, 1)
        expect(list.head).to.equal(1)
        expect(list.tail).to.equal(1)
        expect(list.length).to.equal(1)
        expect([...list]).to.deep.equal([1])
      })

    })

    context('when the list is empty and the index is greater than 0', () => {

      it('throws a RangeError', () => {
        const list = new LinkedList()
        expect(() => list.insert(1, 1)).to.throw(RangeError)
      })

    })

    context('when the list is not empty and the index is before the end', () => {

      it('inserts the value into the list', () => {
        const list = new LinkedList(0, 1, 2).insert(2, 3)
        expect(list.length).to.equal(4)
        expect([...list]).to.deep.equal([0, 1, 3, 2])
      })

    })

    context('when the list is not empty and the index is at the end', () => {

      it('appends the value to the list', () => {
        const list = new LinkedList(0, 1).insert(2, 2)
        expect(list.tail).to.equal(2)
        expect(list.length).to.equal(3)
        expect([...list]).to.deep.equal([0, 1, 2])
      })

    })

    context('when the index is greater than the list length', () => {

      it('throws a RangeError', () => {
        const list = new LinkedList(1, 2, 3)
        expect(() => list.insert(4, 4)).to.throw(RangeError)
      })

    })

  })

  describe('delete(index)', () => {

    context('when the list is empty', () => {

      it('throws a RangeError', () => {
        const list = new LinkedList()
        expect(() => list.delete(0)).to.throw(RangeError)
      })

    })

    context('when the index is 0', () => {

      it('removes the head of the list', () => {
        const list = new LinkedList(1, 2, 3, 4).delete(0)
        expect(list.head).to.equal(2)
        expect([...list]).to.deep.equal([2, 3, 4])
      })

    })

    context('when the list has one element in it', () => {

      it('removes the head and tail of the list', () => {
        const list = new LinkedList(1).delete(0)
        expect(list.head).to.equal(undefined)
        expect(list.tail).to.equal(undefined)
        expect([...list]).to.deep.equal([])
      })

    })

    context('when the index is in range of the list length', () => {

      it('removes the value from the list', () => {
        const list = new LinkedList(1, 2, 3, 4).delete(2)
        expect(list.length).to.equal(3)
        expect([...list]).to.deep.equal([1, 2, 4])
      })

    })

    context('when the index is the end of the list', () => {

      it('removes the tail of the list', () => {
        const list = new LinkedList(1, 2, 3, 4).delete(3)
        expect(list.tail).to.equal(3)
        expect(list.length).to.equal(3)
        expect([...list]).to.deep.equal([1, 2, 3])
      })

    })

    context('when the index is greater than the end of the list', () => {

      it('throws a RangeError', () => {
        const list = new LinkedList(1, 2, 3, 4)
        expect(() => list.delete(4)).to.throw(RangeError)
      })

    })

  })

  describe('reverse()', () => {

    it('reverses and returns the list', () => {
      const list = new LinkedList(1, 2, 3, 4)
      expect([...list.reverse()]).to.deep.equal([4, 3, 2, 1])
    })

  })

})
