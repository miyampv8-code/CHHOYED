Encapsulation means hiding data and allowing only controlled access to it.

## Syntax

```java
private type field;

public type getField() { return field; }
public void setField(type value) { this.field = value; }
```

`private` hides the field from other classes. They must use the public methods.

## Private fields

```java
public class Account {
    private double balance;

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}
```

Outside code cannot write `acc.balance = -999`. It must call `deposit`, which checks the value first.

- `private` means only this class can use it. `public` means everyone can.
- A getter reads a field. A setter changes it safely.

## Try it

Add a `withdraw` method that refuses to take more than the balance.
