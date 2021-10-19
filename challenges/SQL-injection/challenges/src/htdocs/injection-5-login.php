<link href='./static/css/main.css' rel='stylesheet' type='text/css'/>

<?php include("logo.html")?>

<div style="text-align:center;">
<h1>SQL-Injection 5</h1>
</div>

<?php

$con=mysqli_connect("localhost","root","");

mysqli_select_db($con,'blog');

if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$usernmae = trim($_POST['username'],"'");
$password = $_POST['password'];


$result=mysqli_query($con,"select id from challenge_login.users where username = '$usernmae' and password = '$password'");

$res = mysqli_fetch_array($result);

if($res == NULL) {
    echo "Your Username or Passward is not correct.";   
}
else {
    header('location:injection-5-blog.php');
}
?>