# Branching Exercise

## Part I

Answer the following questions:

1. What git command creates a branch? `git checkout -b [name]`
2. What is the difference between a fast-forward and recursive merge?
   - Fast forward copies all commits to the main branch and only works when there have been no commits to main since the creation of the branch.
   - Recursive combines commits in both the main branch and the branch to merge and only works when there are commits to main since the creation of the branch.
3. What git command changes to another branch? `git checkout [name]`
4. What git command deletes a branch? `git branch -d [name]`
5. How do merge conflicts happen?
   - Merge conflicts happen when there are multiple changes to the same file and git cannot automatically determine how to combine them.

## Part II

Practice with fast forward and recursive merges! Make a branch and add and commit onto it and merge it back into master.

Try to create your own merge conflict by modifying the same file on two separate commits on two separate branches.

## Solution

You can [view our solution](http://curric.rithmschool.com/springboard/exercises/git-branching/solution/index.html)