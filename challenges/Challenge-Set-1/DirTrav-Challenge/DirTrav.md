# Directory Traversal

Also known as Path Traversal, is a method used to move through website directories. In order to discover otherwise hidden files.

To effectively take advantage of Directory Traversal it is important to understand the folder structure most Webpages follow and how to exploit a security lacking system to view unintended files.

Let&#39;s assume we launch a website and find ourselves at ```https://www.website.com/index.html``` Currently we are sitting in ```index.html```. If we inspect the sources of this page using developer tools, we will discover the following structure:
```console
/root/
    Index.html
    Format/
    style.css
```
These files and directories are all being referenced by our current page and thus visible to us when viewing sources. Notice that ```Format``` is a folder which is holding a CSS file for our page. In order to view this file, we can modify our URL so that we navigate to that page:
```console
    https://www.website.com/Format/style.css
```
Alternatively, we can explorer the contents of the folder ```Format``` by doing the same thing.
```console
    https://www.website.com/Format/
```
Now we can view all the files and folders stored within ```Format``` and have successfully navigated into an unintended location.
```console
/Format/
    images/
    Readme.txt
    styles.css
    resources/
```
With this information we can continue to navigate through the files structure as desired.
