#
# @lc app=leetcode id=3761 lang=python3
#
# [3761] Minimum Absolute Distance Between Mirror Pairs
#

# @lc code=start
class Solution:
    def minMirrorPairDistance(self, nums: List[int]) -> int:
        distance = float('inf')
        anc = {}
        for i, num in enumerate(nums):
            reversed_num = 0
            orig = num
            while num:
                num, diff = divmod(num, 10)
                reversed_num = 10 * reversed_num + diff

            if orig in anc:
                distance = min(
                    distance, abs(anc[orig] - i)
                )

            anc[reversed_num] = i

        return -1 if distance == float('inf') else distance
        
# @lc code=end

