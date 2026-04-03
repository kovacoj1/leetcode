#
# @lc app=leetcode id=572 lang=python3
#
# [572] Subtree of Another Tree
#

# @lc code=start
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sameTree(self, A: TreeNode, B: TreeNode) -> bool:
        if not A or not B:
            return not A and not B

        return A.val == B.val \
            and self.sameTree(A.left, B.left) \
            and self.sameTree(A.right, B.right)

    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        def traverse(root):
            if not root:
                return root == subRoot

            possible = self.sameTree(root, subRoot) if root.val == subRoot.val else False

            return possible or traverse(root.left) or traverse(root.right)

        return traverse(root)
        
# @lc code=end

