<?php include("base-2.html")?>

<script>

var cookie = "synt-kffp-unyy-ratr";

document.cookie= decipher(cookie);

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

<script>
    function add(){
        var str = document.getElementById("text").value;
        var old = document.getElementById("body").innerHTML;
        document.getElementById("body").innerHTML = old + "<a href = '"+ str +"'>"+str+"</a></br>";
    }
</script>

<h1 align="center">Dom - XSS Alert-cookie Challenge</h1>
<div align="center">
<div id="body"></div>
<input type="text" id="text" value=""/>
<input type="button" id="s" value="write" onclick="add()"/>
</div>
<!-- 
    'onclick=alert(document.cookie);//
-->