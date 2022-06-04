def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]
    with_vowels = []
    without_vowels = []
    out = []
    for char in s:
        if char in vowels:
            with_vowels.append(char)
            without_vowels.append(None)
        else:
            without_vowels.append(char)
    for char in without_vowels:
        if char == None:
            out.append(with_vowels.pop())
        else:
            out.append(char)

    return "".join(out)
