export class Node {
  constructor(value, parent, isBlack = false, left = null, right = null) {
    this.left = left
    this.value = value
    this.right = right
    this.parent = parent
    this.isBlack = isBlack
  }
  find(value) {
    let node = this
    let parent = node.parent
    while (node) {
      if (value === node.value) break
      parent = node
      if (value < node.value) node = node.left
      else node = node.right
    }
    return { parent, node }
  }
  toJSON() {
    const { value, isBlack, left, right } = this
    return {
      value,
      isBlack,
      left: left && left.toJSON(),
      right: right && right.toJSON()
    }
  }
}

export default class RedBlackTree {
  constructor(...values) {
    this._root = null
    return values.reduce((tree, value) => tree.insert(value), this)
  }
  insert(value) {
    if (this._root === null) {
      this._root = new Node(value, this._root, true)
      return this
    }
    let { parent, node } = this._root.find(value)
    if (!node) {
      value < parent.value
        ? parent.left = new Node(value, parent)
        : parent.right = new Node(value, parent)
    }
    return this
  }
  contains(value) {
    return !!this._root &&
           !!this._root.find(value).node
  }
  toJSON() {
    if (!this._root) return null
    return this._root.toJSON()
  }
}
