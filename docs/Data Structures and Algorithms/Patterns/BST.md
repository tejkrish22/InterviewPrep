# BST (Binary Search Tree)

## Recognition Cues
- Property: `left.val < node.val < right.val` for every subtree.
- Inorder traversal yields sorted order. Pass `[minVal, maxVal]` range down during validation.

## Common Pitfalls
- Validate with global `[minVal, maxVal]` range bounds, not just immediate children.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
