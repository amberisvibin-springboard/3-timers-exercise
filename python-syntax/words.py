def print_upper_words(words):
    """Given list of words, print each word in uppercase.

    For example:
      print_upper_words(["apple", "pear", "banana"])

    Should print:
      APPLE\n
      PEAR\n
      BANANA\n
    and return None
    """

    # YOUR CODE HERE
    for word in words:
        print(word.upper())


print("should print:\nAPPLE\nPEAR\nBANANA\nand return None:",
      print_upper_words(["apple", "pear", "banana"]))
