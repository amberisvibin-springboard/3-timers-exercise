def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    p_list = list(phrase)
    p_list.reverse()
    return "".join(p_list)
