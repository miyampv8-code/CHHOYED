Links connect pages together. Images make a page come alive. Both use **attributes**, so this lesson is a good place to learn them.

## Syntax

```html
<a href="address">Link text</a>
<img src="file" alt="description">
```

## Links

```html
<a href="https://www.wikipedia.org">Visit Wikipedia</a>
<a href="about.html">About us</a>
<a href="https://www.wikipedia.org" target="_blank">Open in a new tab</a>
```

- `href` is the address the link goes to.
- A full address (`https://...`) goes to another website.
- A file name (`about.html`) goes to another page in your own folder.
- `target="_blank"` opens the link in a new tab.

## Images

```html
<img src="images/cat.jpg" alt="A cat sleeping on a sofa" width="300">
```

- `src` is the path to the picture.
- `alt` describes the picture. Screen readers read it aloud, and it appears if the image cannot load.
- `width` sets the size in pixels. The height adjusts automatically.
- `<img>` has no closing tag.

## An image that is also a link

```html
<a href="https://www.wikipedia.org">
  <img src="images/logo.png" alt="Wikipedia logo" width="120">
</a>
```

> Keep your files organized. Put pictures in an `images` folder next to your HTML file, and always use lowercase names without spaces, such as `my-photo.jpg`.

## Try it

Add a photo of your choice with a good `alt` text, and a link to your favourite website that opens in a new tab.
