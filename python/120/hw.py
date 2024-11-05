# import random
from random import randint

names = ['Joe', 'Kamala', 'Donald Trump', 'Alejandro']

print(names)

for name in names:
    print(name)

for i in range(0, len(names)):
    print(f'#{i} is {names[i]}')

for index, name in enumerate(names):
    print(f'#{index} is {name}')

foo = 'a big sentence to slice'
print(foo[4:-4])

print(names[-2][2:-2])

for x in range(1, 11):
    for y in range(0, 11):
        print(f'{x * y:3d}', end=' ')
    print()

# the_number = random.randint(1, 100)
the_number = randint(1, 100)
print(the_number)

print('Guess the number between 1 - 100')
guess = None
tries = 0
while guess != the_number:
    try:
        guess = int(input('please guess a number '))

        if guess > 100:
            print('Please enter a number between 1 and 100 only')
            continue

        tries += 1
        if guess < the_number:
            print('to low')
        elif guess > the_number:
            print('to high')
    except ValueError:
        print('Invalid entry. Please enter a number between 1 and 100 only')
print(f'You Won! It took {tries} tries')
