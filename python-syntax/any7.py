def any7(nums):
    """Are any of these numbers a 7? (True/False)"""

    # YOUR CODE HERE
    # theres gotta be a more efficient way to do this..
    # apparently `for 7 in nums` works too
    out = False

    for num in nums:
        if num == 7:
            out = True
    return out


print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))
