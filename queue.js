import LinkedList from './linked-list'

export default class Queue {
  constructor(...values) {
    this._items = new LinkedList(...values)
  }
  get size() {
    return this._items.length
  }
  peek() {
    return this._items.head
  }
  enqueue(value) {
    this._items.append(value)
    return this
  }
  dequeue() {
    if (this._items.length === 0) {
      throw new RangeError('Cannot dequeue from an empty Queue')
    }
    const { head: item } = this._items
    this._items.delete(0)
    return item
  }
}
