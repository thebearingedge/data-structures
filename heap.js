export default class Heap {
  constructor(...values) {
    this._items = []
    values.forEach(x => this.push(x))
  }
  _getLeftChildIndex = index => {
    return (index + 1) * 2 - 1
  }
  _getRightChildIndex = index => {
    return (index + 1) * 2
  }
  _getParentIndex = index => {
    return Math.floor((index + 1) / 2) - 1
  }
  _getRightChild = index => {
    return this._items[this._getRightChildIndex(index)]
  }
  _hasLeftChild = index => {
    return this._getLeftChild(index) !== void 0
  }
  _hasRightChild = index => {
    return this._getRightChild(index) !== void 0
  }
  _getLeftChild = index => {
    return this._items[this._getLeftChildIndex(index)]
  }
  _getParent = index => {
    return this._items[this._getParentIndex(index)]
  }
  _swap = (index1, index2) => {
    const { _items } = this
    const temp = _items[index1]
    _items[index1] = _items[index2]
    _items[index2] = temp
  }
  _normalizeUp() {
    const { _swap, _items, _getParent, _getParentIndex } = this
    let index = _items.length - 1
    while (index && _items[index] < _getParent(index)) {
      _swap(index, _getParentIndex(index))
      index = _getParentIndex(index)
    }
  }
  _normalizeDown() {
    let index = 0
    while (this._hasLeftChild(index)) {
      const smallerRight = this._hasRightChild(index) &&
                           this._getRightChild(index) < this._getLeftChild(index)
      const smallerChildIndex = smallerRight
        ? this._getRightChildIndex(index)
        : this._getLeftChildIndex(index)
      if (this._items[index] < this._items[smallerChildIndex]) break
      this._swap(index, smallerChildIndex)
      index = smallerChildIndex
    }
  }
  peek() {
    return this._items[0]
  }
  push(value) {
    this._items.push(value)
    this._normalizeUp()
  }
  pop() {
    this._swap(0, this._items.length - 1)
    const item = this._items.pop()
    this._normalizeDown()
    return item
  }
}
