<?php
	
	$con=mysqli_connect("localhost","root","");
	
	if (!$con){
        exit("Connection Faild");
    }

    mysqli_set_charset($con,'utf8');

    mysqli_select_db($con,'blog');

    $sql = "select * from data";

    $res = mysqli_query($con, $sql);

    $rows = mysqli_fetch_assoc($res);

    echo '<a href = "injection-1.php?id='.$rows['id'].'"> SQL-Challenge-1 Find Out the Injection Point </a>';

    echo "<br>";

    echo '<a href = "process.php?id='.$rows['id'].'"> SQL-Injection Blog </a>';

    echo "<br>";

    echo '<a href = ""> SQL-Injeciton Username and Password </a>';

    mysqli_close($con);

?>