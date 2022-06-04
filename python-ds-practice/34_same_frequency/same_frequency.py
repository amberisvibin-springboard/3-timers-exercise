def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True

        >>> same_frequency(1211, 2211)
        False
    """
    num1_list = list(str(num1))
    num2_list = list(str(num2))
    num1_counts = {}
    num2_counts = {}

    if len(num1_list) == len(num2_list):
        for char in num1_list:
            if char in num1_counts:
                num1_counts[char] += 1
            else:
                num1_counts[char] = 1
        for char in num2_list:
            if char in num2_counts:
                num2_counts[char] += 1
            else:
                num2_counts[char] = 1
        return num1_counts == num2_counts
    else:
        return False
