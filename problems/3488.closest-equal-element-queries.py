#
# @lc app=leetcode id=3488 lang=python3
#
# [3488] Closest Equal Element Queries
#

# @lc code=start
from typing import List

class Solution:
    def solveQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        indices = {}
        selection = set(nums[idx] for idx in queries)

        for idx, num in enumerate(nums):
            if num not in selection:
                continue

            if num not in indices:
                indices[num] = [idx]
            else:
                indices[num].append(idx)

        n = len(nums)
        output = []

        for i in queries:
            maze = indices[nums[i]]

            if len(maze) == 1:
                output.append(-1)
                continue

            left, right = 0, len(maze) - 1

            while left <= right:
                mid = (left + right) // 2

                if maze[mid] == i:
                    prev_idx = maze[(mid - 1) % len(maze)]
                    next_idx = maze[(mid + 1) % len(maze)]

                    d1 = abs(i - prev_idx)
                    d2 = abs(i - next_idx)

                    dist1 = min(d1, n - d1)
                    dist2 = min(d2, n - d2)

                    output.append(min(dist1, dist2))
                    break

                elif maze[mid] > i:
                    right = mid - 1
                else:
                    left = mid + 1

        return output
        
# @lc code=end

