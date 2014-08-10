<?php
$dicerolls = array();
$sums = array();

function roll($dice, $rolls){
	global $dicerolls;
	for($i=0; $i<$rolls; $i++){
		$temp = array();
		for($j=0; $j<$dice; $j++){
			array_push($temp, rand(1,6));
		}
		array_push($dicerolls, $temp);
	}
}

function sum(){
	global $dicerolls, $sums;
	for($i=0; $i<count($dicerolls); $i++){
		$sums[$i] = 0;
		for($j=0; $j<count($dicerolls[$i]); $j++){
			$sums[$i] += $dicerolls[$i][$j];
		}
	}
}

function maketable($array){ //Makes display table
	global $dicerolls, $sums;
	$tablehtml = "<h2 class='tableheader' id='rawtable'>Table</h2>";
	$tablehtml .= "<table id='dicerolls'>";
	
	$tablehtml .= "<tr><td></td>";
	for($i=0; $i<count($dicerolls[0]); $i++){
		$tablehtml .= "<td class='diceheader'>".($i+1)."</td>";
	}
	$tablehtml .= "<td class='sumheader'>Sum</td>";
	$tablehtml .= "</tr>";
	
	for($i=0; $i<count($dicerolls); $i++){
		$tablehtml .= "<tr>";
		$tablehtml .= "<td class='rollheader'>".($i+1)."</td>";
		for($j=0; $j<count($dicerolls[$i]); $j++){
			$tablehtml .= "<td class='value'>".($dicerolls[$i][$j])."</td>";
		}
		$tablehtml .= "<td class='sum'>".($sums[$i])."</td>";
		$tablehtml .= "</tr>";
	}
	$tablehtml .= "</table>";
	
	return $tablehtml;
}

function sumcountgraph($sums){ //Displays occurrences of sums
	asort($sums);
	$sums = array_count_values($sums);
	$lowest = min(array_keys($sums));
	$highest = max(array_keys($sums));
	$greatestoccurrence = max($sums);
	$dash = floor(log($greatestoccurrence, 2)-2);
	$dash = $dash < 0 ? 1 : $dash;
	$tablehtml = "<h2 class='tableheader' id='frequency'>Frequencies of Sums</h2>";
	$tablehtml .= "<table id='sumcount'>";
	for($i=$lowest; $i<=$highest; $i++){
		
		$tablehtml .= "<tr><td class='freqheader'>$i </td><td ";
		$temp = array_key_exists($i, $sums) ? $sums[$i] : 0;
		if($temp>0 && $sums[$i] == $greatestoccurrence){
			$tablehtml .= "class='highest'";
		}
		$tablehtml .= ">";
		for($j=0; $j<$temp; $j++){
			$tablehtml .= "-";
		}
		$tablehtml .= "  <span class='value'>($temp)</span></td></tr>";
	}
	$tablehtml .= "</table>";
	
	return $tablehtml;
}

//Dealing with $_POST and $_COOKIE and defaults
if(!array_key_exists("dice", $_POST) || !array_key_exists("rolls", $_POST)){
	if(array_key_exists("dice", $_COOKIE) && array_key_exists("rolls", $_COOKIE)){
		$_POST["dice"] = $_COOKIE["dice"];
		$_POST["rolls"] = $_COOKIE["rolls"];
	}else{
		$_POST['dice'] = 3;
		$_POST['rolls'] = 5;
	}
}

//Cookies
$expire = time()+60*15;
setcookie("dice", $_POST["dice"], $expire);
setcookie("rolls", $_POST["rolls"], $expire);

//Rolling and such
roll($_POST["dice"], $_POST["rolls"]);
sum();

$table = maketable($dicerolls);
$sumtable = sumcountgraph($sums);

$varHTML ="
<html>
<head>
	<link rel='stylesheet' type='text/css' href='dicecss.css'/>
	<title>Dice</title>
</head>
<body>
	<h1 id='title'>Dice Statistics</h1>
	<div id='menu'>
		<a href='http://shodor.org/~migueldr/portfolio.html''>Home</a>
		<a href='about.html'>About</a>
	</div>
	<form action='dice.php' method='post'>
		Dice:<input type='number' name='dice' min='2' value=".$_POST["dice"].">
		Rolls:<input type='number' name='rolls' min='1' value=".$_POST["rolls"].">
		<input type='submit' value='Roll'>
	</form>
	<a href='#rawtable'>Table</a>  	<a href='#frequency'>Frequency Chart</a>
	".$table.$sumtable."
	<div id='footer'>
		<a href='http://shodor.org/~migueldr/portfolio.html''>Home</a>
		<a href='about.html'>About</a>
	</div>
</body>
</html>
";
echo $varHTML;

?>