An **event** is something the user does, like clicking a button. To react to it, you add a **listener** to the component.

```java
import java.awt.*;
import java.awt.event.*;

public class Main {
    public static void main(String[] args) {
        Frame f = new Frame("Adder");
        f.setLayout(new FlowLayout());

        TextField a = new TextField(5);
        TextField b = new TextField(5);
        Button add = new Button("Add");
        Label result = new Label("Result: ?                  ");

        add.addActionListener(e -> {
            try {
                int sum = Integer.parseInt(a.getText().trim())
                        + Integer.parseInt(b.getText().trim());
                result.setText("Result: " + sum);
            } catch (NumberFormatException ex) {
                result.setText("Enter whole numbers");
            }
        });

        f.add(a);
        f.add(new Label("+"));
        f.add(b);
        f.add(add);
        f.add(result);

        f.setSize(420, 120);
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { System.exit(0); }
        });
        f.setVisible(true);
    }
}
```

## How it works

1. `add.addActionListener(...)` says: run this code when the button is clicked.
2. The code reads the two text fields with `getText()`.
3. `Integer.parseInt` turns text into a number. If the text is not a number, Java throws `NumberFormatException`, and we show a message instead of crashing.
4. `setText` shows the answer in the label.

The label starts with extra spaces so it has room for longer text.

## Other listeners

- `MouseListener`: clicks and mouse movement
- `KeyListener`: keys on the keyboard
- `ItemListener`: checkboxes and choices

## Try it

Add a second button, **Multiply**, that shows `a * b`.
