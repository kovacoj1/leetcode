#
# @lc app=leetcode id=3418 lang=python3
#
# [3418] Maximum Amount of Money Robot Can Earn
#

# @lc code=start
from functools import lru_cache

class Solution:
    def maximumAmount(self, coins: List[List[int]]) -> int:
        length, width = len(coins), len(coins[0])

        @lru_cache(maxsize=None)
        def dp(i, j, neutralizations=2):
            if not 0 <= i < length or not 0 <= j < width :
                return float('-inf')

            if i == length - 1 and j == width - 1:
                gain = coins[i][j]
                if neutralizations:
                    return max(gain, 0)
                else:
                    return gain

            gain = coins[i][j]

            if gain >= 0:
                return gain + max((
                    dp(i + 1, j, neutralizations),
                    dp(i, j + 1, neutralizations)
                ))
            else:
                possibilities = []
                if neutralizations:
                    possibilities.append(
                        max((
                            dp(i + 1, j, neutralizations - 1),
                            dp(i, j + 1, neutralizations - 1)
                        ))
                    )
                possibilities.append(
                    gain + max((
                        dp(i + 1, j, neutralizations),
                        dp(i, j + 1, neutralizations)
                    ))
                )
                return max(possibilities)

        return dp(0, 0)

        
# @lc code=end

