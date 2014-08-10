<!DOCTYPE html>
<html>
<head>
	<title>Miguel's PHP Page</title>
</head>
<body>
	<?php
		$varInt = 1;
		$varBool = true;
		$varString = "This is a string";
		echo "$varInt";
		echo "$varBool";
		echo "<h1>$varString</h1>";
	?>
	<p>Miguel's PHP Page</p>
	<?php
		$arrayExample = array(1, 5, true, "String", "Another string");
		foreach($arrayExample as $example){
			echo "$example";
		}
		print_r($arrayExample);
		$arrayExample2 = array("food" => "pizza", "name" => "Miguel", "number" => 3);	
		echo "$arrayExample[0]";
		echo "$arrayExample2[food]";
		if($arrayExample[2] = true){
			echo "<h3>$arrayExample[3]</h3>";
		}else{
			echo "<h3>$arrayExample[4]</h3>";
		}

		switch($varInt) {
			case 1:
				echo "Case 1";
				break;
			case 2:
				echo "Case 2";
				break;
			break;
			default:
				echo "Default";
				break;

		}
		echo "\n";
		for($i = 0; $i < count($arrayExample); $i++){
			echo "$arrayExample[$i]\n";
		}
	?>
</body>
</html>
