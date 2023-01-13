class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let looking = true;
    let node = this.root;
    if (!this.root) {
      this.root = new Node(val);
      looking = false;
    }
    while (looking) {
      if (val < node.val) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = new Node(val);
          looking = false;
        }
      }
      if (val > node.val) {
        if (node.right) {
          node = node.right;
        } else {
          node.right = new Node(val);
          looking = false;
        }
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    function _insertRecursively(node) {
      if (val < node.val) {
        if (node.left) {
          _insertRecursively(node.left);
        } else {
          node.left = new Node(val);
          return;
        }
      }
      if (val > node.val) {
        if (node.right) {
          _insertRecursively(node.right);
        } else {
          node.right = new Node(val);
          return;
        }
      }
    }

    let node = this.root;
    if (this.root) {
      _insertRecursively(node);
    } else {
      this.root = new Node(val);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      // console.log(current.val);
      if (current.val === val) return current;

      current = val < current.val ? current.left : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function _findRecursively(node) {
      if (val < node.val) {
        if (node.left) {
          return _findRecursively(node.left);
        } else {
          return undefined;
        }
      }
      if (val > node.val) {
        if (node.right) {
          return _findRecursively(node.right);
        } else {
          return undefined;
        }
      }
      return node;
    }

    let node = this.root;
    if (this.root) {
      return _findRecursively(node);
    } else {
      return undefined;
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let out = [];
    function _dfsPreOrder(node) {
      out.push(node.val);
      if (node.left) _dfsPreOrder(node.left);
      if (node.right) _dfsPreOrder(node.right);
    }
    _dfsPreOrder(this.root);
    return out;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let out = [];
    function _dfsPreOrder(node) {
      if (node.left) _dfsPreOrder(node.left);
      out.push(node.val);
      if (node.right) _dfsPreOrder(node.right);
    }
    _dfsPreOrder(this.root);
    return out;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let out = [];
    function _dfsPreOrder(node) {
      if (node.left) _dfsPreOrder(node.left);
      if (node.right) _dfsPreOrder(node.right);
      out.push(node.val);
    }
    _dfsPreOrder(this.root);
    return out;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return 0;
    let toVisitStack = [this.root];
    let out = [];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      out.push(current.val);

      if (current.left) toVisitStack.push(current.left);
      if (current.right) toVisitStack.push(current.right);
    }

    return out;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
