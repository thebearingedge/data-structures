export default class Heap {
  constructor() {
    this._items = []
  }
  _getLeftChildIndex(index) {
    return (index + 1) * 2 - 1
  }
  _getRightChildIndex(index) {
    return (index + 1) * 2
  }
  _getParentIndex(index) {
    return Math.floor((index + 1) / 2) - 1
  }
  _getRightChild(index) {
    return this._items[this._getRightChildIndex(index)]
  }
  _getLeftChild(index) {
    return this._items[this._getLeftChildIndex(index)]
  }
  _getParent(index) {
    return this._items[this._getParentIndex(index)]
  }
  peek() {
    return this._items[this._items.length - 1]
  }
  push(value) {
    this._items.push(value)
  }
  pop() {
    return this._items.pop()
  }
}
