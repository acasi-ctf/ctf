# SQL Injection (Ver 1.0)

## 1.What is SQL Injection?
SQL injection attack is to insert malicious SQL query or add statement into the input parameters of the application, and then parse and execute the attack in the background SQL server. It is one of the most common means for hackers to attack the database at present.

## 2.How does WEB application work?
For the WEB application, it usually uses the 3-tier architecture which are User Interface Layer, Business Logic Layer, and Data Access Layer.
The steps of an example that how WEB application work:
a.	Enter the website address, such as www.helloworld.com. (User Interface Layer)
b.	It will load, compile, and execute the index.php at the local server. (Business Logic Layer)
c.	The .php will connect to the Database Manager System and execute the SQL statements. (Data access layer)
d.	The Data access layer will return the result to the Business Logic Layer, and the Business Logic Layer will package the data to html format and pass it to User Interface Layer.
e.	The User Interface Layer will show the web page to user.
## 3.	How does “Injection” work?
As the steps shows above, the three layers are linear relationship. Therefore, if the web does not have review function for SQL statement and we can pass the permission verification, we can access all the data which mean we can copy, modify, or remove all the data.

