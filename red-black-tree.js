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
    let [ node, { parent } ] = [this, this]
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
    return this.parent && this.parent.parent
  }
  get uncle() {
    if (!this.parent || !this.parent.parent) return null
    const grandparent = this.parent.parent
    return grandparent.left === this.parent
      ? grandparent.right
      : grandparent.left
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
    if (!this._root) {
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

    let { grandparent, uncle } = node
    if (!grandparent) return this
    if (!uncle || uncle.isBlack) {
      // Left Right
      if (parent.right === node && grandparent.left === parent) {
        const { left: nLeft } = node
        grandparent.left = node
        node.left = parent
        parent.right = nLeft
        node = parent
        parent = node.parent
      }
      // Right Left
      if (parent.left === node && grandparent.right === parent) {
        const { right: nRight } = node
        grandparent.right = node
        node.right = parent
        parent.left = nRight
        node = parent
        parent = node.parent
      }
      // Right Right
      if (parent.right === node && grandparent.right === parent) {
        parent.isBlack = grandparent.isBlack
        grandparent.isBlack = !parent.isBlack
        const { left: pLeft } = parent
        const { parent: gParent } = grandparent
        parent.left = grandparent
        grandparent.right = pLeft
        parent.parent = gParent
        if (!parent.parent) this._root = parent
      }
      // Left Left
      if (parent.left === node && grandparent.left === parent) {
        parent.isBlack = grandparent.isBlack
        grandparent.isBlack = !parent.isBlack
        const { right: pRight } = parent
        const { parent: gParent } = grandparent
        parent.right = grandparent
        grandparent.left = pRight
        parent.parent = gParent
        if (!parent.parent) this._root = parent
      }
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
