def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    out = []
    to_swap = to_swap.lower()
    for char in phrase:
        if char == to_swap:
            out.append(char.upper())
        elif char == to_swap.upper():
            out.append(char.lower())
        else:
            out.append(char)
    return "".join(out)
