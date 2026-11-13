Encapsulation means hiding data and allowing only controlled access to it.

## Private fields

```python
class Account:
    def __init__(self):
        self.__balance = 0   # two underscores make it private

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

acc = Account()
acc.deposit(50)
print(acc.get_balance())   # 50
# print(acc.__balance)     # AttributeError
```

Outside code cannot reach `__balance`. It must call `deposit`, which checks the value first.

## Properties

A property lets you read a value like a normal field, but still protects it.

```python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

acc = Account()
acc.deposit(50)
print(acc.balance)   # 50
```

> Python has no truly private fields. A double underscore hides the name, and a single underscore like `_balance` is a promise: "please don't touch this from outside."

## Try it

Add a `withdraw` method that refuses to take more than the balance.
