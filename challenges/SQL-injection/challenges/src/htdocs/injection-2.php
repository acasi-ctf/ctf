<link href='./static/css/main.css' rel='stylesheet' type='text/css'/>

<?php include("logo.html")?>

<h1>SQL-Injection 2</h1>

<?php

$con=mysqli_connect("localhost","root","");

mysqli_select_db($con,'blog');

if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$id=$_GET["id"];

$result=mysqli_query($con,"select title,body from blog.data where id='$id'");

if($result === FALSE) {
    
}
else {
    foreach( $result as $row ) {
        mysqli_fetch_array($result);

        echo "<div class = 'blog_title'>";

        echo $row['title'];
        echo "<br>";

        echo "</div>";

        echo "<div class = 'blog_body'>";

        echo $row['body'];
        echo "<br>";

        echo "</div>";
    }
}

?>