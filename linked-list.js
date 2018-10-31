class Node {
  constructor(value, next = null) {
    this.next = next
    this.value = value
  }
}

export default class LinkedList {
  constructor(...values) {
    this._length = 0
    this._head = null
    this._tail = null
    return values.reduce((list, value) => list.append(value), this)
  }
  get length() {
    return this._length
  }
  get head() {
    return this._head ? this._head.value : void 0
  }
  get tail() {
    return this._tail ? this._tail.value : void 0
  }
  at(index) {
    if (index >= this._length) return void 0
    let { _head: node } = this
    while (index--) node = node.next
    return node.value
  }
  append(value) {
    this._length++
    const node = new Node(value)
    if (!this._head) this._head = this._tail = node
    else this._tail.next = this._tail = node
    return this
  }
  prepend(value) {
    this._length++
    this._head = new Node(value, this._head)
    this._tail = this._tail || this._head
    return this
  }
  insert(index, value) {
    if (index === 0) return this.prepend(value)
    if (index === this._length) return this.append(value)
    if (!this._head && index > 0) {
      throw new RangeError('Cannot insert beyond head of empty LinkedList')
    }
    if (index > this._length) {
      throw new RangeError('Cannot insert beyond end of LinkedList')
    }
    this._length++
    let { _head: node } = this
    while (--index) node = node.next
    node.next = new Node(value, node.next)
    return this
  }
  delete(index) {
    if (this._length === 0) {
      throw new RangeError('Cannot delete from empty LinkedList')
    }
    if (index >= this._length) {
      throw new RangeError('Cannot delete beyond end of LinkedList')
    }
    this._length--
    if (index === 0) {
      this._head = this._head.next
      return this
    }
    let { _head: prev } = this
    let { next: node } = prev
    while (--index) {
      prev = node
      node = node.next
    }
    prev.next = node.next
    this._tail = prev.next ? this._tail : prev
    return this
  }
  toArray() {
    const array = []
    let { _head: node } = this
    while (node) {
      array.push(node.value)
      node = node.next
    }
    return array
  }
}
