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
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (node.left === null) {
        node.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.left);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;

    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      if (node) {
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (node) {
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
      }
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
      }
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let node = this.root;
    let queue = [node];
    let result = [];

    while (queue.length) {
      node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    function removeNode(node, val) {
      if (!node) return null;
      if (val === node.val) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }

    this.root = removeNode(this.root, val);
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function height(node) {
      if (!node) return 0;
      return Math.max(height(node.left), height(node.right)) + 1;
    }

    function checkBalance(node) {
      if (!node) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalance(node.left) &&
        checkBalance(node.right)
      );
    }

    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    while (current) {
      if (current.right && !current.right.right && !current.right.left) {
        return current.val;
      } else if (!current.right && current.left) {
        current = current.left;
        while (current.right) {
          current = current.right;
        }
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;