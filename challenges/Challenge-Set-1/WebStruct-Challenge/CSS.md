# CSS (Cascading Style Sheets)

In close accordance with HTML, designers utilize CSS to define styles for your web pages, including the design, layout, and variations in display for different devices and screen sizes. The use of CSS is key in arranging your webpage content declared in an HTML document. Two common ways to apply CSS to HTML objects:

1. Inline – Styling is added directly into HTML element tags using the style attribute. Notice we have a simple ```<p>``` element wrapping the text BlueText. By adding the style attribute to the ```<p>``` element, we have modified the text color.

    ```<p style= “color: blue”> BlueText </p>```

2. External – Declaring all CSS formatting within an external CSS file and connecting it to your HTML file. Below we have the contents of and HTML file (page.html) and a CSS file (style.css). In the page.html ```<head>``` element we declare a ```link``` to an external CSS file and using the attribute ```rel``` and ```href``` to declare the type of relationship and the file name. 
In style.css you notice an object ```p``` representing our element ```<p>``` in page.html. With the object ```p``` we declare color is blue and thus state that all ```<p>``` elements in page.html will have blue text.

page.html
```html
<!DOCTYPE html>
<html>
<head>
<title>Webpage</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<p>BlueText</p>
</body>
</html>
```
style.css
```CSS
p {
  color: blue;
}
```
For additional information on the topics discussed above reference the websites below:

- [CSS](https://www.w3schools.com/css/css_intro.asp)
