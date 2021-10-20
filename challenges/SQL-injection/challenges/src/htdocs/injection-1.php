
<?php include("base.html")?>

<div style="background-color: rgb(179, 179, 179); border-radius: 0px; width: 100%; height: 700px; margin: auto; position: absolute; top: 150; left: 0; right: 0; bottom:0;">

<?php

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'challenge_one');
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

    echo "<div style=\"text-align:center;\"><h1>SQL-Injection 1</h1></div>";

    foreach( $result as $row ) {
        mysqli_fetch_array($result);

        echo "<div style=\"text-align:center;
        font-weight:bold;
        font-size:xx-large;
        background-color: rgb(255, 255, 255);
        border-radius: 30px;
        width: 800px;
        height: 50px;
        margin: auto;\">";

        echo $row['title'];

        echo "</div>";

        echo "<div style=\"text-align:center;
        font-size:x-large;
        color:rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        width: 800px;
        height: 200px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 200;\">";

        echo $row['body'];
        echo "<br>";

        echo "</div>";
    }

    echo "</div>";
}

?>
