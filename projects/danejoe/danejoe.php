<?php
if(!array_key_exists("firstname", $_POST) || !array_key_exists("lastname", $_POST)){
	if(array_key_exists("firstname", $_COOKIE) && array_key_exists("lastname", $_COOKIE)){
		$_POST["firstname"] = $_COOKIE["firstname"];
		$_POST["lastname"] = $_COOKIE["lastname"];
	}else{
		$_POST['firstname'] = "Firstname";
		$_POST['lastname'] = "Lastname";
	}
}

$expire = time()+60*15;
setcookie("firstname", $_POST["firstname"], $expire);
setcookie("lastname", $_POST["lastname"], $expire);

function swap($firstname, $lastname){
	$newfirst = $lastname[0] . substr($firstname, 1, strlen($firstname)-2) . substr($lastname, -1);
	$newlast = $firstname[0] . substr($lastname, 1, strlen($lastname)-2) . substr($firstname, -1);
	return ucwords(strtolower($newfirst . " " . $newlast));
}

$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];


$newname = swap($firstname, $lastname);
$varHTML ="
<html>
<head>
	<title>".$newname."</title>
	<link rel='stylesheet' type='text/css' href='danejoecss.css'/>
</head>
<body>
	<h1 id='name'>".$newname."</h1>
	<form action='danejoe.php' method='post'>
	<input type='text' name='firstname' value='".$_POST["firstname"]."' />
	<input type='text' name='lastname' value='".$_POST["lastname"]."' />
	<br />
	<input type='submit' value='Switch' />
	</form>
	
	<div id='footer'>
		<a href='http://shodor.org/~migueldr/portfolio.html'>Home</a>
		<a href='about.html'>About</a>
	</div>
</body>
</html>
";

echo $varHTML;

?>