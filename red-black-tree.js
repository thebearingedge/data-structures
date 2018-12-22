class Node {
  constructor(value, parent, left = null, right = null, isBlack = false) {
    this.left = left
    this.value = value
    this.right = right
    this.parent = parent
    this.isBlack = isBlack
  }
}

export default class RedBlackTree {
  constructor() {
    this._root = null
  }

  insert(value) {
    if (this._root === null) {
      this._root = new Node(value, this._root)
      return this
    }
    let parent = this._root
    while (parent !== null) {
      if (parent.value === value) return this

      if (parent.value < value && parent.right === null) {
        parent.right = new Node(value, parent)
        return this
      }
      else if (parent.value < value) {
        parent = parent.right
      }
      else {
        if (parent.left === null) {
          parent.left = new Node(value, parent)
          return this
        }
        parent = parent.left
      }
      return this
    }
  }

  contains(value) {
    return this._root === value
  }
}
