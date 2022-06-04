def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    phrase = phrase.lower()
    p_split = phrase.split(" ")
    out = []
    for word in p_split:
        out.append(word[0:1].upper() + word[1:])
    return " ".join(out)
