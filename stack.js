import DoublyLinkedList from './doubly-linked-list'

export default class Stack {
  constructor(...values) {
    this._items = new DoublyLinkedList(...values)
  }
  get size() {
    return this._items.length
  }
  peek() {
    return this._items.tail
  }
  push(value) {
    this._items.append(value)
    return this
  }
  pop() {
    if (this._items.length === 0) {
      throw new RangeError('Cannot pop from an empty Stack')
    }
    const { tail: item } = this._items
    this._items.delete(this._items.length - 1)
    return item
  }
}
