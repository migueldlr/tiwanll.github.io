<?php

//Takes month and day information from either $_POST or $_COOKIE, with $_POST's information
//taking precedence.
if(!array_key_exists("month", $_POST) || !array_key_exists("day", $_POST)){
	if(array_key_exists("month", $_COOKIE) && array_key_exists("day", $_COOKIE)){
		$_POST["month"] = $_COOKIE["month"];
		$_POST["day"] = $_COOKIE["day"];
	}else{
		$_POST['month'] = date("F", mktime(null, null, null, date('n', time())));
		$_POST['day'] = date('l', mktime(0, 0, 0, date("n"), 1, date("Y")));
	}
}

$expire = time()+60*15;
setcookie("month", $_POST["month"], $expire);
setcookie("day", $_POST["day"], $expire);

$days = array(
	1 => 'Sunday',
	2 => 'Monday',
	3 => 'Tuesday',
	4 => 'Wednesday',
	5 => 'Thursday',
	6 => 'Friday',
	7 => 'Saturday'
	);
	
	
function monthDropdown($name="month", $selected=null){
	$dd = "<select name='$name' id='$name' onchange='calform.submit();'>";

	/*** the current month ***/
	$selected = $_POST['month'];

	for ($i = 1; $i <= 12; $i++){
		$mon = date("F", mktime(0, 0, 0, $i+1, 0, 0, 0));
			$dd .= '<option value="'.$mon.'"';
			if ($mon == $selected)
			{
					$dd .= ' selected';
			}
			/*** get the month ***/
			$dd .= '>'.$mon.'</option>';
	}
	$dd .= '</select>';
	return $dd;
}

function dayDropdown($name="day", $selected=null){
	global $days;
	$wd = "<select name='$name' id='$name' onchange='calform.submit();'>";
	/*** the current day ***/
	$selected = $_POST['day'];

	for ($i = 1; $i <= 7; $i++){
			$wd .= '<option value="'.$days[$i].'"';
			if ($days[$i] == $selected){
					$wd .= ' selected';
			}
			/*** get the day ***/
			$wd .= '>'.$days[$i].'</option>';
	}
	$wd .= '</select>';
	return $wd;
}
function makeHeader(){ //Make the header (days of the week)
	global $days;
	$header = "<tr id='header'>";
	for($i=1; $i<8; $i++){
		$header .= "<td class='headerbox ".$days[$i]."'>" . $days[$i] . "</td>";
	}
	$header .= "</tr>";
	return $header;
}

function calendar($month, $startday){
	global $days;
	//Initialization with <table>
	$calendarhtml = "<table id='calendar'>";
	
	//Parses inputs for use
	$monthnumber = date('n', strtotime($month));
	$numofdays = cal_days_in_month(CAL_GREGORIAN, $monthnumber, date("y"));
	$startdaynumber = array_search($startday, $days);
	/*echo "Month number: " . $monthnumber . "\n";
	echo "Days: " . $numofdays . "\n";
	echo "Start Day Number: " . $startdaynumber . "\n";*/
	
	$calendarhtml .= "<tr><th colspan=\"7\"><h1 id=\"monthname\">".$month."</h1></th>";
	
	//Adds the days of the week as a header
	$calendarhtml .= makeHeader();
	
	//Adds the preceding empty boxes
	
	$premonthnum = $monthnumber-1;
	if($premonthnum<1){
		$premonthnum = 12;
	}
	$prenumofdays = cal_days_in_month(CAL_GREGORIAN, ($premonthnum), date("y"));
	$colcount = 1;
	$calendarhtml .= "<tr>";
	$outputboxes = 1;
	$boxdate = $prenumofdays-$startdaynumber+2;
	while($outputboxes < $startdaynumber){
		$calendarhtml .= "<td class='emptybox ". $days[$colcount] ."'>". $boxdate ."</td>";
		$outputboxes++;
		$boxdate++;
		$colcount++;
		if($colcount>7){
			$colcount = 1;
		}
	}
	
	//Adds the days of the selected month with dates
	$boxdate = 1;
	while($boxdate <= $numofdays){
		if($colcount == 1){
			$calendarhtml .= "<tr>";
		}
		$calendarhtml .= "<td class='datebox ". $days[$colcount] ."'>". $boxdate . "</td>";
		if($colcount == 7){
			$calendarhtml .= "</tr>";
		}
		$boxdate++;
		$colcount++;
		if($colcount>7){
			$colcount = 1;
		}
	}
	
	//Adds necessary empty boxes
	$boxdate = 1;
	while(($colcount-1) % 7 != 0){
		$calendarhtml .= "<td class='emptybox ". $days[$colcount] ."'>". $boxdate ."</td>";
		$colcount++;
		$boxdate++;
		if($colcount>7){
			$colcount = 1;
		}
	}
	
	$calendarhtml .= "</table>";
	return $calendarhtml;
}

/*echo $_POST["month"];
echo $_POST["day"];*/

//echo calendar($_POST["month"], $_POST["day"]);


$varHTML ="
<html>
<head>
	<title>Calendar</title>
	<link rel='stylesheet' type='text/css' href='calendarcss.css'/>
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
	<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'></script>
	<script src='calendarjs.js'></script>
</head>
<body>
	<h1 id='title'></h1>
	" .calendar($_POST["month"], $_POST["day"])
	. "
	<form action='calendar.php' method='post' name='calform'>
	". monthDropdown()
	. dayDropdown()
	. "
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