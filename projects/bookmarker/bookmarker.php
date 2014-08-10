<?php
$con = mysqli_connect("mysql-dev.shodor.org", "adm_migueldr", "ImSFs34GKQOI");
if(mysqli_connect_error()){
	echo "Database connection failed: " . mysqli_connect_error();
}
mysqli_select_db($con, "ap14_migueldr");

if(array_key_exists('name', $_POST) && $_POST['name'] != ""){
	echo $_POST['name'] . "<br />";
	echo $_POST['url'] . "<br />";
	echo $_POST['tags'] . "<br />";
	$name = $_POST['name'];
	$url = $_POST['url'];
	$tags = $_POST['tags'];
	
	if($tags){
		$input = "INSERT INTO Bookmarks (Name, Url, Tags) VALUES ('$name', '$url', '$tags');";
	}else{
		$input = "INSERT INTO Bookmarks (Name, Url) VALUES ('$name', '$url');";
	}
	echo $input . "<br />";
	mysqli_query($con, $input);
}
$query = "SELECT * FROM Bookmarks;";

$results = mysqli_query($con, $query);

echo "Query: " . $query . "<br /><br />";
echo "Number of results: " . mysqli_num_rows($results) . "<br />";

function makeUrl($url){
	
}

function makeTable(){
	global $results;
	$table = "<table>";
	while($row = mysqli_fetch_assoc($results)){
		$table .= "<tr>";
		foreach($row as $key => $value){
			$table .= "<td class='$key'>";
			if($key == "Url"){
				$table .= "<a href='http://$value'>$value</a>";
			}else{
				$table .= "$value";
			}
			$table .= "</td>";
		}
		$table .= "</tr>";
	}
	$table .= "</table>";
	return $table;
}

echo makeTable();

mysqli_close($con);
?>

<html>
<body>
	<form action='bookmarker.php' method='post'>
		<input type='text' name='name' placeholder='Name'  />
		<input type='text' name='url' placeholder='URL' />
		<input type='text' name='tags' placeholder='Tags' />
		<input type='submit' value='Bookmark' />
	</form>
	
	<form action='bookmarks.php' method='post'>
		<input type='submit' name='show' value='Show Bookmarks' />
	</form>
</body>


</html>