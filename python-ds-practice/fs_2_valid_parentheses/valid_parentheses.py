def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False

        >>> valid_parentheses("())()(()")
        False
    """
    if parens.count("(") == parens.count(")"):
        # this is so hacky
        for char in parens:
            parens = parens.replace("()", "")
        if parens == "":
            return True
        else:
            return False
    else:
        return False
