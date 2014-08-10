<?php
$db = mysqli_connect("mysql-dev.shodor.org", "adm_migueldr", "ImSFs34GKQOI", "ap14_migueldr");
if(mysqli_connect_errno()){
	echo "Failed to connect: " . mysqli_connect_error();
}

$query = "SELECT * FROM Fruit";

$result = mysqli_query($db, $query);
var_dump($result);

echo mysqli_num_rows($result);

while($row = mysqli_fetch_assoc($result)){
	var_dump($row);
	echo  $row['Name'];
}

mysqli_close($db);
?>