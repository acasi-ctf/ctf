<?php include("base-2.html")?>


<script>

window.alert = function()  
{     
    confirm("Good Job! Move to next level!");
    window.location.href=decipher(); 
}

function decipher() {
    var str = "lgg-1-3.dvd";
    var start = "a".charCodeAt(0);
    var end = "z".charCodeAt(0);
    var strList = str.split("");
    var char, replace;
    for(var i = 0; i < str.length; i++){
        char = strList[i].charCodeAt(0);
        if(char >= start && char <= end){
            replace = start + (char - start + 12) % 26;
            strList[i] = String.fromCharCode(replace);
        }
    }
    newStr = strList.join("");
    return newStr;
}

</script>



<h1><div id="title"></div></h1>
<h2> This is level 2, try to get the "Alert" show up! </h2>


<?php
$input=$_GET['title']?? "Refelection - XSS Alert Challenge";
?> 

<script type="text/javascript">
    if(location.search == ""){
        location.search = "?title=Refelection - XSS Alert Challenge"
    }

    var title = '<?php echo $input?>';

    document.getElementById('title').innerHTML= escape(title);
</script>


