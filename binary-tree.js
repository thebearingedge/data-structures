import Stack from './stack'
import Queue from './queue'

class Node {
  constructor(left, value, right) {
    this.left = left
    this.value = value
    this.right = right
  }
  find(parent, value) {
    let node = this
    while (node) {
      if (node.value === value) break
      parent = node
      node = value < node.value ? node.left : node.right
    }
    return { parent, node }
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
}

export default class BinaryTree {
  constructor(...values) {
    this._root = null
    return values.reduce((tree, value) => tree.insert(value), this)
  }
  insert(value) {
    const node = new Node(null, value, null)
    if (!this._root) {
      this._root = node
      return this
    }
    const { parent } = this._root.find(this, value)
    value < parent.value
      ? parent.left = node
      : parent.right = node
    return this
  }
  contains(value) {
    return !!this._root &&
           !!this._root.find(this, value).node
  }
  * preOrder() {
    const nodes = new Stack()
    let { _root: node } = this
    while (true) {
      if (node) {
        yield node.value
        nodes.push(node)
        node = node.left
        continue
      }
      if (!nodes.size) return
      const { right } = nodes.pop()
      node = right
    }
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
  * postOrder() {
    const nodes = new Stack()
    let { _root: node } = this
    while (node || nodes.size) {
      if (node) {
        node.right && nodes.push(node.right)
        nodes.push(node)
        node = node.left
        continue
      }
      node = nodes.pop()
      if (node.right === nodes.peek()) {
        nodes.pop()
        nodes.push(node)
        node = node.right
        continue
      }
      yield node.value
      node = null
    }
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
