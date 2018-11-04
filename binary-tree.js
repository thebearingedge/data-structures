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
  inOrderArray() {
    const left = (this.left) ? this.left.inOrderArray() : []
    const right = (this.right) ? this.right.inOrderArray() : []
    return [...left, this.value, ...right]
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
  inOrderArray() {
    if (!this._root) return []
    return this._root.inOrderArray()
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
