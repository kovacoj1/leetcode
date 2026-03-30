#
# @lc app=leetcode id=2839 lang=python3
#
# [2839] Check if Strings Can be Made Equal With Operations I
#

# @lc code=start
from collections import Counter

class Solution:
    def canBeEqual(self, s1: str, s2: str) -> bool:
        return Counter(s1[::2]) == Counter(s2[::2]) \
            and Counter(s1[1::2]) == Counter(s2[1::2])
# @lc code=end

