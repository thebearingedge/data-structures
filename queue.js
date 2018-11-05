import LinkedList from './linked-list'

export default class Queue {
  constructor(...values) {
    this._list = new LinkedList(...values)
  }
  get size() {
    return this._list.length
  }
  peek() {
    return this._list.head
  }
  enqueue(value) {
    this._list.append(value)
    return this
  }
  dequeue() {
    if (this._list.length === 0) {
      throw new RangeError('Cannot dequeue from an empty Queue')
    }
    const { head: item } = this._list
    this._list.delete(0)
    return item
  }
}
