<?php
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
		$dd = "<select name='$name' id='$name'>";

		/*** the current month ***/
		$selected = is_null($selected) ? date('n', time()) : $selected;

		for ($i = 1; $i <= 12; $i++){
			$mon = date("F", mktime(0, 0, 0, $i+1, 0, 0, 0));
				$dd .= '<option value="'.$mon.'"';
				if ($i == $selected)
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
	$wd = '<select name="'.$name.'" id="'.$name.'">';
	/*** the current day ***/
	$selected = is_null($selected) ? date('N', time()) : $selected;

	for ($i = 1; $i <= 7; $i++){
			$wd .= '<option value="'.$days[$i].'"';
			if ($i == $selected){
					$wd .= ' selected';
			}
			/*** get the day ***/
			$wd .= '>'.$days[$i].'</option>';
	}
	$wd .= '</select>';
	return $wd;
}

$varHTML = "
<html>
<head>
	<title>Calendar</title>
	<link rel=\"stylesheet\" type=\"text/css\" href=\"calendarcss.css\"/>
</head>
<body>
	<form action=\"calendar.php\" method=\"post\">
	". monthDropdown()
	. dayDropdown()
	. "<input type=\"submit\" />
	</form>
</body>
</html>
";


echo $varHTML;
?>