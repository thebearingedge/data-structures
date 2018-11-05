class Node {
  constructor(prev, value, next = null) {
    this.prev = prev
    this.next = next
    this.value = value
  }
}

export default class DoublyLinkedList {
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
    const { _tail } = this
    this._tail = new Node(_tail, value)
    this._head = this._head || this._tail
    if (_tail) _tail.next = this._tail
    return this
  }
  prepend(value) {
    this._length++
    const { _head } = this
    this._head = new Node(null, value, _head)
    this._tail = this._tail || this._head
    if (_head) _head.prev = this._head
    return this
  }
  insert(index, value) {
    if (index === 0) return this.prepend(value)
    if (index === this._length) return this.append(value)
    if (!this._head && index > 0) {
      throw new RangeError('Cannot insert beyond head of empty DoublyLinkedList')
    }
    if (index > this._length) {
      throw new RangeError('Cannot insert beyond end of DoublyLinkedList')
    }
    this._length++
    let { _head: prev } = this
    while (--index) prev = prev.next
    prev.next = new Node(prev, value, prev.next)
    return this
  }
  delete(index) {
    if (this._length === 0) {
      throw new RangeError('Cannot delete from empty DoublyLinkedList')
    }
    if (index >= this._length) {
      throw new RangeError('Cannot delete beyond end of DoublyLinkedList')
    }
    this._length--
    if (index === 0) {
      this._head = this._head.next
      if (this._head) this._head.prev = null
      this._tail = this._head ? this._tail : null
      return this
    }
    let { _head: prev } = this
    let { next: node } = prev
    while (--index) {
      prev = node
      node = node.next
    }
    prev.next = node.next
    if (node.next) node.next.prev = prev
    this._tail = prev.next ? this._tail : prev
    return this
  }
  * [Symbol.iterator]() {
    let { _head: node } = this
    while (node) {
      yield node.value
      node = node.next
    }
  }
}
