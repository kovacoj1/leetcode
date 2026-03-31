#
# @lc app=leetcode id=15 lang=python3
#
# [15] 3Sum
#

# @lc code=start
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        triplets = []
        nums.sort()

        for idx, a in enumerate(nums):
            if idx > 0 and a == nums[idx - 1]:
                continue

            left, right = idx + 1, len(nums) - 1
            while left < right:
                total = a + nums[left] + nums[right]

                if total > 0:
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    triplets.append([a, nums[left], nums[right]])
                    left += 1

                    while left < right and nums[left] == nums[left - 1]:
                        left += 1

        return triplets

# @lc code=end

