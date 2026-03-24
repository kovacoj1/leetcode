#
# @lc app=leetcode id=884 lang=python3
#
# [884] Uncommon Words from Two Sentences
#

# @lc code=start
class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        from collections import Counter

        c1 = Counter(s1.split())
        c2 = Counter(s2.split())

        res = []
        for word, count in c1.items():
            if count == 1 and c2[word] == 0:
                res.append(word)

        for word, count in c2.items():
            if count == 1 and c1[word] == 0:
                res.append(word)

        return res
# @lc code=end

