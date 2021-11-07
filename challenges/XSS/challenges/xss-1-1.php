<?php include("base-2.html")?>

<script>

window.alert = function()  
{     
    confirm("Good Job! Move to next level!");
    window.location.href=decipher(); 
}

function decipher() {
    var str = "kff-1-2.cuc";
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
    $input = $_GET['title']?? "XSS Alert Challenge";

    echo "<h1>".$input."</h1>";

    echo "<h2> This is level 1, try to get the \"Alert\" show up! </h2>";

    echo "<h2> The variable is \"title\". </h2>";
?>