# XSS - Cross Site Scripting

## What is XSS?
### XSS is attacker find a way to insert malicious code in the website. When user load a web page in their browser, the malicious code will be active at the same time. The XSS bugs are usually in email, BBS, blog and others.

## What hacker can do with XSS?
### For example:
### 1. Hacker can steal cookies which include information about personal information, web identity, and history.
### 2. Using for pop-up ads, traffic, trojan virus, and etc.
### 3. Modify the website, such as delete article from blog.

## XSS bugs' type
### Reflection XSS
#### Input XSS code from client and pass them to server, and the server will respond the XSS code back to client.
#### For example: we have code like
#### $input = $GET['message']
#### echo "<h1>".$input."</h1>";
#### When we input "<script>alert("1")</script>", the web page will pop up a alert window and show message with "1".

### Stored XSS
#### Stored XSS is similar with the Reflection XSS. The different between them is stored XSS will store the XSS code in server's database. For example, an alert XSS code was added in person A's blog's homepage, so each time someone loaded A' homepage the alert will show up.

### DOM XSS
#### DOM XSS code does not need the server to respond and use the browser's "document" statement for run the code. As we said what hacker can do with XSS bugs, if user's cookie does not have any protection, hacker can use "document.cookie" statement to get user's information very easy.

## Basic Requirement for XSS
### 1. Understand the html languages.
### 2. Understand the JavaScript language.
### 3. Understand the SQL statement for Stored XSS.
### 4. Know about the PHP language.
