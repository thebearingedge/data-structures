import Stack from './stack'
import Queue from './queue'

class Node {
  constructor(left, value, right) {
    this.left = left
    this.value = value
    this.right = right
  }
  insert(value) {
    if (value >= this.value) {
      if (this.right) return this.right.insert(value)
      this.right = new Node(null, value, null)
      return
    }
    if (this.left) return this.left.insert(value)
    this.left = new Node(null, value, null)
  }
  find(parent, value) {
    if (this.value === value) return { parent, node: this }
    const node = value > this.value ? this.right : this.left
    if (!node) return { parent, node }
    return node.find(this, value)
  }
  remove(node) {
    this.left === node
      ? this.left = null
      : this.right = null
  }
  replace(node, child) {
    this.left === child
      ? this.left = node
      : this.right = node
  }
  preOrderArray() {
    const left = this.left ? this.left.preOrderArray() : []
    const right = this.right ? this.right.preOrderArray() : []
    return [this.value, ...left, ...right]
  }
  postOrderArray() {
    const left = this.left ? this.left.postOrderArray() : []
    const right = this.right ? this.right.postOrderArray() : []
    return [...left, ...right, this.value]
  }
}

export default class BinaryTree {
  constructor(...values) {
    this._root = null
    return values.reduce((tree, value) => tree.insert(value), this)
  }
  insert(value) {
    if (this._root) this._root.insert(value)
    else this._root = new Node(null, value, null)
    return this
  }
  contains(value) {
    return !!this._root &&
           !!this._root.find(this, value).node
  }
  * inOrder() {
    const nodes = new Stack()
    let { _root: node } = this
    while (true) {
      if (node) {
        nodes.push(node)
        node = node.left
        continue
      }
      if (!nodes.size) return
      const { value, right } = nodes.pop()
      yield value
      node = right
    }
  }
  preOrderArray() {
    if (!this._root) return []
    return this._root.preOrderArray()
  }
  postOrderArray() {
    if (!this._root) return []
    return this._root.postOrderArray()
  }
  * levelOrder() {
    const nodes = new Queue()
    this._root && nodes.enqueue(this._root)
    while (nodes.size) {
      const { value, left, right } = nodes.dequeue()
      yield value
      left && nodes.enqueue(left)
      right && nodes.enqueue(right)
    }
  }
  delete(value) {
    if (!this._root) return this
    const { parent, node } = this._root.find(this, value)
    if (!node) return this
    const isRoot = parent === this
    if (!node.left && !node.right) {
      isRoot
        ? this._root = null
        : parent.remove(node)
      return this
    }
    if (!node.right) {
      isRoot
        ? this._root = node.left
        : parent.replace(node.left, node)
      return this
    }
    if (!node.right.left) {
      node.right.left = node.left
      isRoot
        ? this._root = node.right
        : parent.replace(node.right, node)
      return this
    }
    let { right: prev } = node
    let { left: promoted } = node.right
    while (promoted.left) {
      prev = promoted
      promoted = promoted.left
    }
    prev.left = null
    promoted.left = node.left
    promoted.right = node.right
    isRoot
      ? this._root = promoted
      : parent.replace(promoted, node)
    return this
  }
}
