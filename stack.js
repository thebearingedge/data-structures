import LinkedList from './linked-list'

export default class Stack {
  constructor(...values) {
    this._items = values.reduceRight((list, item) =>
      list.append(item)
    , new LinkedList())
  }
  get size() {
    return this._items.length
  }
  peek() {
    return this._items.head
  }
  push(value) {
    this._items.prepend(value)
    return this
  }
  pop() {
    if (this._items.length === 0) {
      throw new RangeError('Cannot pop from an empty Stack')
    }
    const { head: item } = this._items
    this._items.delete(0)
    return item
  }
}
