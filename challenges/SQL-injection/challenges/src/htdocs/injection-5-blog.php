<link href='./static/css/main.css' rel='stylesheet' type='text/css'/>

<?php include("logo.html")?>

<h1>SQL-Injection 5</h1>

<style>
	body{
        background-color: rgb(179, 179, 179);
	}
</style>

<?php

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'challenge_five');
if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$result=mysqli_query($con,"select body,writer from challenge_five.five");


echo "<h2>Chat Room</h2>";
echo "<br>";

echo "<div style=\"overflow:auto; height: 400px; width: 600px; border: 3px solid rgb(0, 156, 39); color:rgb(0, 0, 0);background-color: rgb(255, 255, 255)\">";

while($row = $result->fetch_assoc()) {
    echo $row['writer'];
    echo ": ";
    echo $row['body'];
    echo "<br>";
}

echo "</div>";

?>
