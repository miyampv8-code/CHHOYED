With AWT you can also **draw** shapes and text. You draw on a `Canvas`.

```java
import java.awt.*;
import java.awt.event.*;

class Board extends Canvas {
    public void paint(Graphics g) {
        g.setColor(Color.BLUE);
        g.fillRect(50, 50, 120, 80);

        g.setColor(Color.RED);
        g.fillOval(200, 60, 100, 100);

        g.setColor(Color.BLACK);
        g.drawLine(30, 200, 330, 200);
        g.drawString("Hello, AWT!", 120, 230);
    }
}

public class Main {
    public static void main(String[] args) {
        Frame f = new Frame("Drawing");
        f.add(new Board());
        f.setSize(380, 300);
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { System.exit(0); }
        });
        f.setVisible(true);
    }
}
```

## How it works

- `Board extends Canvas` makes your own drawing area (this uses inheritance from the OOP lessons).
- Java calls `paint(Graphics g)` for you whenever the area needs to be drawn. Never call it yourself. Call `repaint()` if you want to redraw.
- `g` is your pen. `setColor` chooses the color for everything you draw next.

## Coordinates

The point (0, 0) is the **top-left** corner. `x` grows to the right and `y` grows **downward**. The window's title bar covers a little of the top.

## Drawing methods

- `drawLine(x1, y1, x2, y2)`
- `drawRect(x, y, width, height)` and `fillRect(...)`
- `drawOval(x, y, width, height)` and `fillOval(...)`
- `drawString("text", x, y)`

## Try it

Draw a house: a rectangle for the walls, a triangle-like roof made of two lines, and a small door.
