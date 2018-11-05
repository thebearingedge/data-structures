import LinkedList from './linked-list'

export default class Stack {
  constructor(...values) {
    this._list = values.reduce((list, value) =>
      list.prepend(value)
    , new LinkedList())
  }
  get size() {
    return this._list.length
  }
  peek() {
    return this._list.head
  }
  push(value) {
    this._list.prepend(value)
    return this
  }
  pop() {
    if (this._list.length === 0) {
      throw new RangeError('Cannot pop from an empty Stack')
    }
    const { head: item } = this._list
    this._list.delete(0)
    return item
  }
}
