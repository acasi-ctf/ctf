<?php

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'blog');
if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$id=$_GET["id"];

$result=mysqli_query($con,"select title,body from challenge_one.one where id='$id'");

if($result === FALSE) {
    echo "Invaild format for 'id'.";
}
else {
    foreach( $result as $row ) {
        mysqli_fetch_array($result);
        echo $row['title'];
        echo "<br>";
        echo $row['body'];
        echo "<br>";
    }
}

?>