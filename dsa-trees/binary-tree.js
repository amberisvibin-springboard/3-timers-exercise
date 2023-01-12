/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let count = 1;
    let minCount = Infinity;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      count++;

      if (current.left) toVisitStack.push(current.left);
      if (current.right) toVisitStack.push(current.right);

      if (!current.left && !current.right) {
        if (count < minCount) minCount = count;
        count = 1;
      }
    }

    return minCount;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let count = 1;
    let maxCount = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      count++;

      if (current.left) toVisitStack.push(current.left);
      if (current.right) toVisitStack.push(current.right);

      if (!current.left && !current.right) {
        // console.log(count, maxCount);
        if (count > maxCount) maxCount = count;
        count = 1;
      }
    }

    return maxCount;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let sum = 1;
    let maxSum = 0;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      sum = sum * current.val;

      if (current.left) toVisitStack.push(current.left);
      if (current.right) toVisitStack.push(current.right);

      if (!current.left && !current.right) {
        // console.log(count, maxCount);
        if (sum > maxSum) maxSum = sum;
        sum = 1;
      }
    }

    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let toVisitStack = [this.root];
    let out = Infinity;

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.val > lowerBound && current.val < out) out = current.val;

      if (current.left) toVisitStack.push(current.left);
      if (current.right) toVisitStack.push(current.right);

      // if (!current.left && !current.right) {
      //   if (count < minCount) minCount = count;
      //   count = 1;
      // }
    }
    if (out === Infinity || out === 0) out = null;
    return out;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
