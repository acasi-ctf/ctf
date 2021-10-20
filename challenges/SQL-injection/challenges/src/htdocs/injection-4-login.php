<link href='./static/css/main.css' rel='stylesheet' type='text/css'/>

<?php include("base.html")?>

<?php

$con=mysqli_connect("localhost","root","");

mysqli_select_db($con,'blog');

if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$usernmae = $_POST['username'];
$password = trim($_POST['password'],"'");

echo "<div style=\"background-color: rgb(179, 179, 179); border-radius: 0px; width: 100%; height: 700px; margin: auto; position: absolute; top: 150; left: 0; right: 0; bottom:0;\">";

echo "<div style=\"text-align:center;\"><h1>SQL-Injection 4</h1></div>";

$result=mysqli_query($con,"select id from challenge_login.users where username = '$usernmae' and password = '$password'");

$res = mysqli_fetch_array($result);

if($res == NULL) {
    echo "<div style=\"text-align:center; font-size:x-large;\">Your Username or Passward is not correct.</div>";   
}
else {

    echo "<div style=\"text-align:center; font-size:x-large;\">";   
    echo "You Got the Flag!";
    echo "<br>";
    echo "N9TT-9G0A-B7FQ-RANC";
    echo "</div>";   
}

echo "</div>";   

?>