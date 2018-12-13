class Heap {
  constructor() {
    this.array = []
  }

  push(value) {
    this.array.push(value)
  }

  pop() {
    return this.array.pop()
  }

}

module.exports = Heap
