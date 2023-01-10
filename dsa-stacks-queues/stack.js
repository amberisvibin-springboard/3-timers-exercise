/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to start of the stack. Returns undefined. */

  push(val) {
    let node = new Node(val);
    if (!this.last) {
      this.last = node;
    }
    node.next = this.first;
    this.first = node;
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    let node = this.first;
    // switch statements my beloved
    switch (this.size) {
      case 0:
        throw new Error("Cannot pop() empty stack.");
      case 1:
        this.first = null;
        this.last = null;
      default:
        this.first = node.next;
    }
    this.size--;
    return node.val;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    switch (this.size) {
      case 0:
        throw new Error("Cannot peek() empty stack.");
      default:
        return this.first.val;
    }
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return !this.size;
  }
}

module.exports = Stack;
