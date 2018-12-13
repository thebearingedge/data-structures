const { expect } = require('chai')
const Heap = require('./heap')

describe.only('Heap', () => {
  describe('Push', () => {
    it('can push a value', () => {
      const heap = new Heap()
      heap.push(5)
      expect(heap.pop()).to.deep.equal(5)
    })
  })
})
