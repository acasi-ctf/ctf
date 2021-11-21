<?php include("base-2.html")?>

<script>

window.alert = function()  
{     
    confirm(decipher(result));
}

var result = "synt-kffp-unyy-ratr";

function decipher(str) {
    var start = "a".charCodeAt(0);
    var end = "z".charCodeAt(0);
    var strList = str.split("");
    var char, replace;
    for(var i = 0; i < str.length; i++){
        char = strList[i].charCodeAt(0);
        if(char >= start && char <= end){
            replace = start + (char - start + 13) % 26;
            strList[i] = String.fromCharCode(replace);
        }
    }
    newStr = strList.join("");
    return newStr;
}

</script>

<?php

ini_set("display_errors", 0);

$con=mysqli_connect("localhost","root","");
mysqli_select_db($con,'challenge_xss');
if (mysqli_connect_errno())
{
    echo "Falid to Connect".mysql_connect_error();
}

$result=mysqli_query($con,"select id,name,message from challenge_xss.chat_history");

$name=$_GET["name"];

$message=$_GET["message"];

if ($name != null){
    $sql = "INSERT INTO `chat_history`(`id`, `name`, `message`) VALUES ('1','$name','$message')";
    mysqli_query($con, $sql);
    header('Location: xss-3.php');
}


if($result === FALSE) {
    
}
else {

    echo "<div style=\"text-align:center;\"><h1>Stored XSS Challenge</h1></div>";

    echo "<center>";

    foreach( $result as $row ) {
        echo $row['name'];
        echo ": ";
        echo $row['message'];
        echo "<br>";

    }

    echo "<form action=xss-3.php method=GET>
    <input name=name  value=''>	
    <input name=message  value=''>	
    <input type=submit name=submit value=Sent />
    </form>";

    echo "</center>";
}

?>