Encapsulation means hiding data and allowing only controlled access to it.

## Syntax

```cpp
class ClassName {
private:
    type field;                   // hidden from outside code

public:
    type getField() const { return field; }
    void setField(type value) { field = value; }
};
```

## Private fields

```cpp
class Account {
private:
    double balance = 0;

public:
    double getBalance() const {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
};

Account acc;
acc.deposit(50);
std::cout << acc.getBalance() << "\n";   // 50
// acc.balance = -999;   // error: balance is private
```

Outside code cannot change `balance` directly. It must call `deposit`, which checks the value first.

- `private` means only this class can use it. `public` means everyone can.
- `const` after a method name promises that the method does not change the object. Getters are a good place for it.

> In a `class`, members are private unless you say otherwise. In a `struct`, they are public.

## Try it

Add a `withdraw` method that refuses to take more than the balance.
