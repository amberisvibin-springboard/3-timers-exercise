/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let node = new Node(val);
    if (!this.tail) {
      this.tail = node;
    }
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    let endNode = this.tail;
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return endNode.val;
    }
    let currNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (currNode.next == endNode) {
        currNode.next = null;
        this.tail = currNode;
        this.length--;
      }
      currNode = currNode.next;
    }
    return endNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    let node = this.head;
    // switch statements my beloved
    switch (this.length) {
      case 0:
        throw new Error("Cannot shift() empty list.");
      case 1:
        this.head = null;
        this.tail = null;
      default:
        this.head = node.next;
    }
    this.length--;
    return node.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0) {
      throw new Error("Cannot getAt(idx) when idx is negative.");
    }
    if (idx > this.length) {
      throw new Error("Cannot getAt(idx) when idx is less than list length.");
    }
    let currNode = this.head;
    let count = 0;
    for (count = 0; count < idx; count++) {
      currNode = currNode.next;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0) {
      throw new Error("Cannot setAt(idx, val) when idx is negative.");
    }
    if (idx > this.length) {
      throw new Error(
        "Cannot setAt(idx, val) when idx is less than list length."
      );
    }
    let currNode = this.head;
    let count = 0;
    for (count = 0; count < idx; count++) {
      currNode = currNode.next;
    }
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0) {
      throw new Error("Cannot insertAt(idx, val) when idx is negative.");
    }
    if (idx > this.length) {
      throw new Error(
        "Cannot insertAt(idx, val) when idx is less than list length."
      );
    }

    let node = new Node(val);
    switch (this.length) {
      case 0:
        this.head = node;
        this.tail = node;
      case 1:
        this.head.next = node;
        this.tail = node;
      default:
        if (idx == this.length) {
          this.tail.next = node;
          this.tail = node;
        }
        let currNode = this.head;
        let prevNode = null;
        let count = 0;
        for (count = 0; count < idx; count++) {
          prevNode = currNode;
          currNode = currNode.next;
        }
        // for some reason a list length of 0 is running this code.
        // this if statements stops a error from prevNode being null.
        if (prevNode) {
          prevNode.next = node;
        }
        node.next = currNode;
    }
    this.length++;
    return node;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0) {
      throw new Error("Cannot removeAt(idx) when idx is negative.");
    }
    if (idx > this.length) {
      throw new Error(
        "Cannot removeAt(idx) when idx is less than list length."
      );
    }

    let node = null;
    if (this.length == 0) {
      throw new Error("Cannot removeAt(idx) when list is empty.");
    }
    if (idx == this.length - 1) {
      node = this.head;
      this.head = null;
      this.tail = null;
    } else {
      let currNode = this.head;
      let prevNode = null;
      let count = 0;
      for (count = 0; count < idx; count++) {
        prevNode = currNode;
        currNode = currNode.next;
      }
      if (prevNode) {
        prevNode.next = currNode;
      }
    }
    this.length--;
    return node;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length == 0) {
      return 0;
    }
    let currNode = this.head;
    let count = 0;
    let total = 0;
    for (count = 0; count < this.length; count++) {
      total += currNode.val;
      currNode = currNode.next;
    }
    return total / count;
  }
}

module.exports = LinkedList;
