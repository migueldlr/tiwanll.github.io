<?php
$con = mysqli_connect("mysql-dev.shodor.org", "adm_migueldr", "ImSFs34GKQOI");
if(mysqli_connect_error()){
	echo "Database connection failed: " . mysqli_connect_error();
}
mysqli_select_db($con, "ap14_migueldr");

$query = "SELECT Vehicles.Type, Vehicles.Color, VehicleTypes.NumWheels FROM Vehicles LEFT JOIN VehicleTypes ON Vehicles.Type = VehicleTypes.Type";
$query = "SELECT V.Type, V.Color, VT.NumWheels FROM Vehicles AS V JOIN VehicleTypes AS VT ON V.Type = VT.Type";

$query = "SELECT O.FirstName, O.LastName, V.Type, V.Color FROM Owners AS O 
LEFT JOIN VehicleOwnership AS VO ON O.Id = VO.OwnersId LEFT JOIN 
Vehicles AS V ON VO.VehicleId = V.Id";

$query = "SELECT FirstName, LastName FROM Owners ORDER BY LastName ASC, FirstName DESC";

$query = "SELECT NumWheels, COUNT(*) FROM VehicleTypes GROUP BY NumWheels";

$query = "SELECT VehicleTypes.NumWheels, COUNT(Vehicles.Type) 
		FROM VehicleTypes LEFT JOIN Vehicles 
		ON VehicleTypes.Type = Vehicles.Type 
		GROUP BY VehicleTypes.NumWheels";
		
$query = "SELECT * FROM Vehicles WHERE PurchaseDate 
		BETWEEN '2000-01-01' AND '2011-06-31'";
		
$query = "SELECT * FROM Vehicles WHERE Type Like '%e%'";

$view = "CREATE VIEW Owner_To_Vehicle AS SELECT O.FirstName, O.LastName, V.Type, V.Color FROM Owners AS O 
LEFT JOIN VehicleOwnership AS VO ON O.Id = VO.OwnersId LEFT JOIN 
Vehicles AS V ON VO.VehicleId = V.Id";

$query = "SELECT * FROM Owner_To_Vehicle";

$results = mysqli_query($con, $query);

echo "Query: " . $query . "<br /><br />";
echo "Number of results: " . mysqli_num_rows($results) . "<br />";

while($row = mysqli_fetch_assoc($results)){
	var_dump($row);
}

mysqli_close($con);


?>