export class Node {
  constructor(value, isBlack = false) {
    this._left = null
    this.value = value
    this._right = null
    this.parent = null
    this.isBlack = isBlack
  }
  get left() {
    return this._left
  }
  set left(node) {
    this._left = node
    if (node) node.parent = this
  }
  get right() {
    return this._right
  }
  set right(node) {
    this._right = node
    if (node) node.parent = this
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
  get grandparent() {
    if (this.parent === null || this.parent.parent === null) return null
    return this.parent.parent
  }
  get uncle() {
    if (this.parent === null || this.parent.parent === null) return null
    const grandparent = this.parent.parent
    if (grandparent.left === this.parent) {
      return grandparent.right
    }
    else {
      return grandparent.left
    }
  }
  get isRed() {
    return !this.isBlack
  }
  set isRed(isRed) {
    this.isBlack = !isRed
  }
}

export default class RedBlackTree {
  constructor(...values) {
    this._root = null
    return values.reduce((tree, value) => tree.insert(value), this)
  }
  insert(value) {
    if (this._root === null) {
      this._root = new Node(value, true)
      return this
    }
    let { parent, node } = this._root.find(value)
    if (!node) {
      value < parent.value
        ? node = parent.left = new Node(value)
        : node = parent.right = new Node(value)
    }
    else return this // We don't insert duplicates
    if (!node.grandparent) return this
    if (node.uncle === null || node.uncle.isBlack) {
      node.parent.isBlack = node.grandparent.isBlack
      node.grandparent.isBlack = !node.parent.isBlack

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
