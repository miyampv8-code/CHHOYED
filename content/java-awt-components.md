Components are the things you put inside a window.

```java
import java.awt.*;
import java.awt.event.*;

public class Main {
    public static void main(String[] args) {
        Frame f = new Frame("Components");
        f.setLayout(new FlowLayout());

        f.add(new Label("Name:"));
        f.add(new TextField(15));
        f.add(new Button("Send"));
        f.add(new Checkbox("I agree"));
        f.add(new TextArea("Write here...", 4, 25));

        f.setSize(350, 250);
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { System.exit(0); }
        });
        f.setVisible(true);
    }
}
```

## Common components

- `Label`: text that the user cannot edit
- `TextField(15)`: one line of input, about 15 characters wide
- `Button("Send")`: a button you can click
- `Checkbox("I agree")`: a box that is on or off
- `TextArea(text, rows, columns)`: several lines of input

To read what the user typed, use `getText()`. To change it, use `setText("...")`.

## Try it

Add a second `TextField` and a `Label` that says "Email:".
