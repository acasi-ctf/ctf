# Linux Tools

## -Binwalk

Binwalk is a tool useful for examining a wide range of image files for hidden files. This makes it a useful tool for file forensics and steganography. 

We can run binwalk against a binary image by typing binwalk followed by the file name.

```Bash

root: $ binwalk logo.png 

```

By viewing the offset range of the file, we can see what the file is actually containing. For example, a simple image might output something like this:

```Bash
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 225 x 224, 8-bit colormap, non-interlaced
```
While an abnormal would have additional items. Embedded within the Image.

Binwalk is not only useful for finding embedded files in images, but also is able to extract discovered files for you. To do so, use the extract dependency, represented by a _-e_.

```Bash

root: $ binwalk -e image_file  

```

More binwalk dependencies can be found by examining the binwalk manual page or viewing the linked documentation. 


**To Do:** Use binwalk to locate the flag within the pictures folder.


Additional Documentation: [binwalk - Kali Documentation](https://www.kali.org/tools/binwalk/)
