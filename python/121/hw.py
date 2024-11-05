from random import randint


# class representing a single die
class Die:
    # ctor - initialize instance variables. _ for private (by convention)
    def __init__(self, num_sides):
        self._sides = num_sides
        self._value = 1

    # getter for value (since _value is "private")
    def value(self):
        return self._value

    # roll the die. pick a random number between 1 and number of sides. Return new value for convenience
    def roll(self):
        self._value = randint(1, self._sides)
        return self._value

    # friendly string representation used if for example someone call print()
    def __str__(self):
        return f'sides: {self._sides} value: {self._value}'


# subclass that sets up a usual 6 sided die (alternatively (and much simpler) we could just use default param sides = 6 on base instead of making a subclass, but then we wouldnt have a chance to exercise subclassing...)
class Six_Sided_Die(Die):
    def __init__(self):
        # cut and paste bad.. instead call super
        # self._sides = 6
        # self._value = 1

        super().__init__(6)


# try out regular die. Create, roll 10 times
d = Die(12)
print(d)

for i in range(10):
    print(d.roll())

print(d)

print()

# try out 6 sided die. Create, roll 10 times
d6 = Six_Sided_Die()
print(d6)

for i in range(10):
    print(d6.roll())

print(d6)
