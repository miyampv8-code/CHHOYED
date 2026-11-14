A **layout** decides where components go in the window.

## Syntax

```java
frame.setLayout(new FlowLayout());
frame.add(component, BorderLayout.NORTH);   // SOUTH, EAST, WEST, CENTER

Panel p = new Panel(new GridLayout(rows, columns));
p.add(component);
frame.add(p, BorderLayout.CENTER);
```

## The main layouts

- `FlowLayout`: left to right, and wraps to a new row when full.
- `BorderLayout`: five areas: `NORTH`, `SOUTH`, `EAST`, `WEST` and `CENTER`. This is the default for a `Frame`.
- `GridLayout(rows, columns)`: equal cells in a table.

## Panels

A `Panel` is a box that holds components and has its own layout. You can put a panel inside a window.

```java
import java.awt.*;
import java.awt.event.*;

public class Main {
    public static void main(String[] args) {
        Frame f = new Frame("Layouts");
        f.setLayout(new BorderLayout());

        f.add(new Label("My Window", Label.CENTER), BorderLayout.NORTH);

        Panel grid = new Panel(new GridLayout(2, 2, 5, 5));
        grid.add(new Button("1"));
        grid.add(new Button("2"));
        grid.add(new Button("3"));
        grid.add(new Button("4"));
        f.add(grid, BorderLayout.CENTER);

        f.add(new Button("Close"), BorderLayout.SOUTH);

        f.setSize(300, 250);
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { System.exit(0); }
        });
        f.setVisible(true);
    }
}
```

The two extra numbers in `GridLayout(2, 2, 5, 5)` are the gaps between cells. The Close button does nothing yet. The next lesson fixes that.

## Try it

Make a keypad with a `GridLayout(4, 3)` and buttons from 1 to 9, then `*`, `0` and `#`.
