# HTML (Hyper Text Markup Language)

The tool used to construct the foundation of webpages is HTML, a coding language designed to develop webpage layout and general structure. HTML is made up of elements, which developers use to enclose content in order to define the contents size, font and more.

Let us examine a simple example:
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
```
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

All HTML documents will begin with ```!DOCTYPE html```, this declares this document as an HTML document. The remaining items are **elements** , and you will notice they always wrap the items they are affecting. You can determine an elements closing tag by the prepended ```/```.

-	The ```<html>``` element is the root element of an HTML page.
-	The ```<head>``` element contains meta information about the HTML page.
-	The ```<title>``` element specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab).
-	The ```<body>``` element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
-	The ```<h1>``` element defines a large heading.
-	The ```<p>``` element defines a paragraph.


Another tool in HTML are **attributes**. Attributes are placed within the element tag to modify elements characteristics. For example, lets assume we have an ```<p>``` (paragraph element) and we want to change its character size. One attribute we could us is ```style``` which would allow us to set the font-size &quot;Text&quot; to 10 px.
```<p style="font-size:10px;">Text</p>```
These are just a few of the many elements and their attributes you can use to construct the structure of your webpage. For additional explanation please refer to the links below:

- [W3schools - HTML](https://www.w3schools.com/html/)
- [developer.mozilla - HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)