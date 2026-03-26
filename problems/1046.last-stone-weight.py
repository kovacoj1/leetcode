#
# @lc app=leetcode id=1046 lang=python3
#
# [1046] Last Stone Weight
#

# @lc code=start
from heapq import heapify, heappop, heappush

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        heap = [-stone for stone in stones]
        heapify(heap)

        while len(heap) > 1:
            a, b = -heappop(heap), -heappop(heap)

            heappush(heap, -(a - b))

        return -heap[0]

# @lc code=end

