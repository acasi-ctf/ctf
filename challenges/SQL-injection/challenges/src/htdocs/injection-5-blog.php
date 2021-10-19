<link href='./static/css/main.css' rel='stylesheet' type='text/css'/>

<?php include("logo.html")?>

<div style="text-align:center;">
<h1>SQL-Injection 5</h1>
</div>

<?php

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'challenge_five');
if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$result=mysqli_query($con,"select body,writer from challenge_five.five");

echo "Chat Room";
echo "<br>";

while($row = $result->fetch_assoc()) {
    echo $row['writer'];
    echo ": ";
    echo $row['body'];
    echo "<br>";
}

?>
