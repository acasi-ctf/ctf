# SQL-Chanllenge-1
The first step of SQL injection is finding out the injection point and make sure what kinds of injection that we can use in this point.

# Example:
If we have a web address: “www.example.com/index.php?id=1”.
In this case, we can try to change the number after id to figure out it is an injection point or not. For example, we change it to “www.example.com/index.php?id=2”, and it shows new information to us. It means it is an injection point. We can make sure the SQL statement that web used might be “select data from database where id = number”.
Now, we got the injection point, we need to change the point which is “number” that shows above.
We can try to change the address to “www.example.com/index.php?id=1’ ”.
If single quotation marks cause the website return error, it means it is a string point.
You can try to add “ ‘ or 1=1 ‘ ”, to get more information.

# Challenge
In this challenge, you need to find out the injection point, and get the flag by changed input data.




