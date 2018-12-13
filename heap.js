export default class Heap {
  constructor(...values) {
    this._items = []
    this.pop = this.pop.bind(this)
    this.push = this.push.bind(this)
    this.peek = this.peek.bind(this)
    this._normalizeUp = this._normalizeUp.bind(this)
    this._swap = this._swap.bind(this)
    this._getParent = this._getParent.bind(this)
    this._getLeftChild = this._getLeftChild.bind(this)
    this._getRightChild = this._getRightChild.bind(this)
    this._getParentIndex = this._getParentIndex.bind(this)
    this._getRightChildIndex = this._getRightChildIndex.bind(this)
    this._getLeftChildIndex = this._getLeftChildIndex.bind(this)

    values.forEach(x => this.push(x))
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
  _swap(index1, index2) {
    const { _items } = this
    const temp = _items[index1]
    _items[index1] = _items[index2]
    _items[index2] = temp

  }
  _normalizeUp() {
    const { _swap, _items, _getParent, _getParentIndex } = this
    let index = _items.length - 1
    console.log('index is', index)
    while (index && _items[index] < _getParent(index)) {
      _swap(index, _getParentIndex(index))
      index = _getParentIndex(index)
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
    return this._items.pop()
  }
}
