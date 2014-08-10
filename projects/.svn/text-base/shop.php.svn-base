<?php
$con = mysqli_connect("mysql-dev.shodor.org", "adm_migueldr", "ImSFs34GKQOI");
if(mysqli_connect_error()){
	echo "Database connection failed: " . mysqli_connect_error();
}
mysqli_select_db($con, "ap14_migueldr");

$query = "SELECT * FROM Products;";
$results = mysqli_query($con, $query);
/*
if($results = mysqli_query($con, $query)){
	for($i=0; $i<mysqli_num_rows; $i++){
		
	}
}
*/


function makeTable(){
	$first = true;
	global $results;
	$table = "<table>";
	while($row = mysqli_fetch_assoc($results)){
		if($first){
			foreach($row as $key => $value){
				$table .= "<th>";
				$table .= "$key";
				$table .= "</th>";
			}
			$first = false;
		}
		$table .= "<tr>";
		foreach($row as $key => $value){
			$table .= "<td class='$key'>";
			$table .= "$value";
			$table .= "</td>";
		}
		$table .= "</tr>";
	}
	$table .= "</table>";
	return $table;
}

function restockForm(){
	$form = "<form>";
	
	$form .= "<input type='number' name='amount' />";
}

mysqli_close($con);
?>

<html>
<body>
	<h1>Products</h1>
	<?php
		echo "Query: " . $query . "<br /><br />";
		echo "Number of results: " . mysqli_num_rows($results) . "<br />";
		
		echo makeTable();
	?>
</body>


</html>