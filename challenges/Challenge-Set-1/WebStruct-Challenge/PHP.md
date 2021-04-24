# PHP (Hypertext Preprocessor)

PHP is a server-side scripting language, used to develop both Static and Dynamic websites as well as Web applications. It opensource and very compatible with HTML so it is an ideal tool for building websites that require scripting. This compatibility allows PHP and HTML to be used within the same file.

A PHP script starts with ```<?php``` and ends with ```?>```. For example, below we have a HTML file (generator.html) that contains a PHP script. Using the command ```echo```, PHP is declaring that the result of its script will be displayed onto the page. The script than calls ```rand(1,100)``` to generate a random number between 1 and 100 to display.

generator.html
```html
<!DOCTYPE html>
<html>
<body>
<p> Random Number:</p>
<?php
    echo(rand(1, 100));
?>
</body>
</html>
```
It is important to note that while you can see HTML code on a webpage by viewing its source code. You will not be able to view the PHP code because it is executed on the server and only its basic HTML results are pushed to the webpage. So even if you are examining a PHP file it will only possess the HTML aspects that are present on the webpage. An inspection of generator.html would display:
```html
<!DOCTYPE html>
<html>
<body>
<p> Random Number:</p>
'''
28
'''
</body>
</html>
```
Assuming that our ```rand(1,100)``` generated 28.

For additional information on PHP syntax and concepts please check out the link below:
- [PHP](https://www.w3schools.com/php/default.asp)
