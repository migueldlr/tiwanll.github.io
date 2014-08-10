<?php
$con = mysqli_connect("mysql-dev.shodor.org", "adm_migueldr", "ImSFs34GKQOI");
if(mysqli_connect_error()){
	echo "Database connection failed: " . mysqli_connect_error();
}
mysqli_select_db($con, "ap14_migueldr");

if(array_key_exists('name', $_POST) && array_key_exists('url', $_POST) && array_key_exists('tags', $_POST)){
	
}
$query = "SELECT * FROM Bookmarks";

$results = mysqli_query($con, $query);
while($row = mysqli_fetch_assoc($results)){
	var_dump($row);
}

?>

<html>

</html>

<?php

mysqli_close($con);
?>