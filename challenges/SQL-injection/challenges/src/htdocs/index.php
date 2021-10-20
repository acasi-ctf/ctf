
<?php include("base.html")?>

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

    echo "<div style=\"text-align:center;\">";
    
    echo '<a href = "injection-1.php?id='.$rows['id'].'"> SQL-Challenge-1 Find Out the Injection Point </a>';

    echo "<br>";

    echo '<a href = "injection-2.php?id='.$rows['id'].'"> SQL-Challenge-2 SQL Blog Cipher message </a>';

    echo "<br>";

    echo '<a href = "injection-3.php?id='.$rows['id'].'"> SQL-Injection-3 Hidden Blog </a>';

    echo "<br>";

    echo '<a href = "injection-4-index.html"> SQL-Injeciton-4 Username and Password </a>';

    echo "<br>";

    echo '<a href = "injection-5-index.html"> SQL-Injeciton-5 Find out the "Flag" </a>';
    
    echo "</div>";

    mysqli_close($con);

?>