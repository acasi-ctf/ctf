<?php include("base.html")?>

<?php

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'challenge_xss');
if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

mysqli_query($con, "DELETE FROM `chat_history` WHERE 1");
mysqli_query($con, "INSERT INTO `chat_history`(`id`, `name`, `message`) VALUES ('1','Alex','Hello World!')");

echo "<center>";
echo "<h1>Click to start Stored XSS challenge</h1>";

echo "<h1><a href = \"xss-3.php\"> Start </a></h1>";

echo"</center>";

?>