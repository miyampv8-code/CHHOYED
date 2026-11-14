**AWT** (Abstract Window Toolkit) is Java's built-in library for windows, buttons and drawing. It lives in the package `java.awt`. Until now your programs printed text. With AWT they can open a real window.

## Syntax

```java
Frame f = new Frame("title");
f.setSize(width, height);
f.setVisible(true);
```

`import java.awt.*;` at the top. Call `setVisible(true)` last.

## Your first window

```java
import java.awt.*;
import java.awt.event.*;

public class Main {
    public static void main(String[] args) {
        Frame f = new Frame("My first window");
        f.setSize(400, 300);
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
        f.setVisible(true);
    }
}
```

- `Frame` is a window. The text in the brackets is the title.
- `setSize(400, 300)` sets the width and height in pixels.
- `windowClosing` runs when you click the X. An AWT window does **not** close by itself, so we stop the program with `System.exit(0)`.
- `setVisible(true)` shows the window. Do this last, after adding everything.

> AWT needs a screen. It works on your own computer, but not in online compilers or on servers.

## Try it

Change the title and the size, then run the program again.
