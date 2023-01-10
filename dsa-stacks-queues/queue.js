/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let node = new Node(val);
    if (!this.first) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    let node = this.first;
    // switch statements my beloved
    switch (this.size) {
      case 0:
        throw new Error("Cannot dequeue() empty queue.");
      case 1:
        this.first = null;
        this.last = null;
      default:
        this.first = node.next;
    }
    this.size--;
    return node.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    switch (this.size) {
      case 0:
        throw new Error("Cannot peek() empty queue.");
      default:
        return this.first.val;
    }
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return !this.size;
  }
}

module.exports = Queue;
