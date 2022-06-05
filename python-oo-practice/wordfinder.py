"""Word Finder: finds random words from a dictionary."""

from random import choice
from tabnanny import check
import tempfile


class WordFinder:
    r"""
    Machine to return randomly selected words from file

    >>> with tempfile.NamedTemporaryFile(mode = "w") as tmpfile:
    ...     tmpfile.write("cat\ndog\nbird") and None
    ...     tmpfile.flush()
    ...     wordf = WordFinder(tmpfile.name)
    3 words read

    >>> wordf
    <WordFinder num_words=3>

    >>> wordf.print_num_words()
    3 words read

    >>> wordf.random() in ["cat", "dog", "bird"]
    True
    """

    def __init__(self, filename) -> None:
        file = open(filename, 'r')
        self.word_list = file.readlines()
        file.close()
        self.num_words = len(self.word_list)
        self.print_num_words()

    def __repr__(self) -> str:
        return f"<WordFinder num_words={self.num_words}>"

    def print_num_words(self) -> None:
        print(f"{self.num_words} words read")

    def random(self) -> str:
        return choice(self.word_list).strip()


class SpecialWordFinder(WordFinder):
    r"""
    Machine to return randomly selected words from file,
    ignoring blanklines and comments

    >>> with tempfile.NamedTemporaryFile(mode = "w") as tmpfile:
    ...     tmpfile.write("# Veggies\nkale\nparsnips\n\n# Fruits\n\napple\nmango\n") and None
    ...     tmpfile.flush()
    ...     wordf = SpecialWordFinder(tmpfile.name)
    8 words read
    4 words left after removing bad items

    >>> wordf
    <SpecialWordFinder num_words=4>

    >>> wordf.print_num_words()
    4 words read

    >>> wordf.random() in ["kale", "parsnips", "apple", "mango"]
    True
    """

    def __init__(self, filename) -> None:
        super().__init__(filename)
        self.word_list = list(filter(self.check_bad_item, self.word_list))
        self.num_words = len(self.word_list)
        print(f"{self.num_words} words left after removing bad items")

    def __repr__(self) -> str:
        return f"<SpecialWordFinder num_words={self.num_words}>"

    def check_bad_item(self, item) -> bool:
        return bool(not item.startswith("#") and not item == "\n")
