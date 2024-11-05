x: str = None
# x = 'hello'
x = 554375643
print(x)

print('hello ' 'world')

print('''This is line one
      this is line 2
      this is line 3''')

first = 'Joe'
last = 'Biden'

print(f'first: {first} last: {last}')
print('first: {} last: {}'.format(first, last))


print(f'before{x:<3,d}after')

print(first.upper())

print(first.replace('e', 'i'))
first = first.replace('e', 'i')
print(first)

people = ['Joe', 'Kamala', 'Alejandro', 'Pete', 'Chuck']
print(people)

print(len(people))
print(len(first))

print(people[2])
print(first[2])

print(people[len(people)-2])
print(people[-2])

a_long_string = 'This is a longish string to see some stuff'
print(a_long_string[2:])
print(a_long_string[2:11])
print(a_long_string[2:18:2])
print(a_long_string[:16])
print(a_long_string[::3])

print(a_long_string[::-1])

print(people[::-1])
people.reverse()
print(people)

people.append('Kari')
print(people)

print(people * 2)
print(first * 2)
doubled = people*2
print(doubled)

my_list = ['Joe']
print(my_list[0])
# my_list[1] = 'Kamala'
my_list.append('Kamala')

print(my_list)

some_people = [None, None, None]
some_people[2] = 'Bob'
print(some_people)

some_people = [None] * 10
some_people[9] = 'Bob'
print(some_people)

# my_list.append(['Jack', 'Jill'])
my_list.extend(['Jack', 'Jill'])
print(my_list)

my_list.pop(-2)

my_list.remove('Jill')

my_list.insert(100, 'Bob')

print(my_list)

# my_list.clear()
# print(my_list)

another_ref = my_list
sliced_copy = my_list[:]
copy = my_list.copy()
my_list.append('Mary')
print(my_list)
print(another_ref)
print(sliced_copy)
print(copy)

print(a_long_string.find('x'))
# print(a_long_string.index('x'))

print(people)
# print(people.index('xJoe'))

try:
    # print(1/0)
    print(people.index('Joe'))
# except:
except ValueError as err:
    print(f'Didnt find xJoe - {err}')
    print('also in except')
except Exception as err:
    print(f'something else went wrong - {err}')
finally:
    print('in finally')
print('done')

if 'xJoe' in people:
    print(people.index('xJoe'))
else:
    print('xJoe not in people')

print('done')

    #z = 5
#print(z)

print(x)

z = 100
if z < 100:
    print('z < 100')
elif z < 200:
    print('z < 200')
else:
    print('z not < 200')

if z < 50 and z != 100:
    print('a')
else:
    print('b')

if z < 50 or z == 100:
    print('a')
else:
    print('b')

print(10 / 3)
print(10 % 3)
print(10 // 3)

#import math
#print(math.floor(10 / 3))
#print(math.ceil(10 / 3))

from math import floor, ceil
print(floor(10 / 3))
print(ceil(10 / 3))

print(10 ** 3)

name = 'Joe'#input('Whats your name ')
print(f'your name is {name}')

age = 5#None
while age == None:
  try:
    age = int(input('How old are you? '))
  except:
    print('Please enter valid age only')
print(f'You will be 120 in {120 - age} years')

print(z)
print('Its greater then 100' if z > 100 else 'Its not > 100')

for person in people:
  print(person)

for letter in last:
    print(letter)

for i in range(10):
    print(i)

for i in range(100, 200, 2):
    print(i)

for i in range(0, len(people)):
    print(f'person #{i} is {people[i]}')

i = 0;
for person in people:
  i += 1
  print(f'person #{i} is {person}')

for person in people:
    if person == 'xJoe':
        print('we found joe')
        break
    else:
        print(f'{person} is not joe')
else:
    print('We couldnt find Joe')
print('Done looking for Joe')

person_to_find = 'Joe'#input('Who should we find? ')
for person in people:
    if person == person_to_find:
        print(f'we found {person_to_find}')
        break
    else:
        print(f'{person} is not {person_to_find}')
else:
    print(f'We couldnt find {person_to_find}')
print(f'Done looking for {person_to_find}')

for index, value in enumerate(people):
    print(f'{index} is {value}')

names = ['Joe', 'Kamala', 'Chuck']
popularity = [23, 25, 50]
ages = [100, 55, 65]

for i in range(3):
    print(f'name: {names[i]} popularity: {popularity[i]} age: {ages[i]}')

for theName, thePopularity, theAge in zip(names, popularity, ages):
    print(f'name: {theName} popularity: {thePopularity} age: {theAge}')

numbers = (1, 2, 3, 4, 5)
#numbers = 1, 2, 3, 4, 5
#numbers.append(6)
#numbers[2] = 6
print(type(numbers))
for number in numbers:
    print(number)

empty_tuple = ()
print(type(empty_tuple))

tuple_of_one = 1,
print(type(tuple_of_one))

a,*theRest,d,e = numbers
print(a,theRest, d, e)

aa, bb, cc = first
print(aa,bb,cc)

potus = {
  'first': 'Joe',
  'last': 'Biden'
}
print(type(potus))

print(potus['first'])

#print(potus['brains'])

print(potus.get('brains'))

print(potus.get('brains', 'very little'))

months = {
    'Jan': 31,
    'Feb': 28,
    'Mar': 31
}

months['Apr'] = 30

for month in months:
    print(f'{month} - {months[month]}')

for month, days in months.items():
    print(f'{month} - {days}')

fruits = set(['apple', 'pear', 'peach'])
print(type(fruits))
favorite_fruits = set(('grape', 'orange', 'apple'))
print(favorite_fruits, type(favorite_fruits))

print(fruits.union(favorite_fruits))
print(fruits.difference(favorite_fruits))

fruits.add('grapefruit')
print(fruits)

frozenFruits = frozenset(('apple'))
#frozenFruits.add('grapefruit')

def multiply(number: int, foo="z", bar="y", by=1) -> int:
    print(f'inside function number={number} foo={foo} bar={bar} by={by}')
    #return 'Hello'
    return number * by

print(multiply(5, 2))
print(multiply(5, by=2))
print(multiply('Hi', by=2))

def add(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

print(add([1,2,3]))
print(add((1,2,3)))
#print(add(1,2,3))


def add2(*numbers):
    total = 0
    for number in numbers:
        total += number
    return total


print(add2(1, 2, 3))
#print(add2([1, 2, 3]))
#print(add2((1, 2, 3)))

print(z)

def use_z():
  global z
  z = 50
  print('in use_z', z)
  #yy = 20

use_z()
print('back at top level', z)

#print(yy)

#zz = None
if z > 100:
    zz = 5
else:
    zz = None

print(zz)

print(numbers)
# expression for item in list - if
squares = [n ** 2 for n in numbers]
print(squares)

def square(x):
    return x ** 2

squares2 = list(map(lambda x: x ** 2, numbers))
print(squares2)

squares3 = list(map(square, numbers))
print(squares3)
