"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100

    >>> print(serial)
    <SerialGenerator start=100 count=100>
    """

    def __init__(self, start) -> None:
        self.start = start
        self.count = start - 1

    def __repr__(self) -> str:
        return f"<SerialGenerator start={self.start} count={self.count}>"

    def generate(self) -> int:
        self.count += 1
        return self.count

    def reset(self) -> None:
        self.count = self.start - 1
