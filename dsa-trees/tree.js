/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let out = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      out += current.val;

      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }

    return out;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let out = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.val % 2 === 0) {
        out += 1;
      }

      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }

    return out;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let out = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.val > lowerBound) {
        out += 1;
      }

      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }

    return out;
  }
}

module.exports = { Tree, TreeNode };
