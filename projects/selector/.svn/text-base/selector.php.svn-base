<?php
$othercolor = "";
		
$hexcodes = array('Red' => 'FF0000',
					'Orange' => 'FFA500',
					'Yellow' => 'FFFF00',
					'Green' => '008000',
					'Blue' => '0000FF',
					'Purple' => '800080',
					'Pink' => 'FFC0CB',
					'Brown' => 'A52A2A',
					'Black' => '000000',
					'White' => 'FFFFFF');
					
function blackorwhite($hexcode){
	$redhex  = substr($hexcode,0,2);
	$greenhex = substr($hexcode,2,2);
	$bluehex = substr($hexcode,4,2);
	
	$var_r = (hexdec($redhex)) / 255;
	$var_g = (hexdec($greenhex)) / 255;
	$var_b = (hexdec($bluehex)) / 255;
	
	$var_min = min($var_r,$var_g,$var_b);
	$var_max = max($var_r,$var_g,$var_b);
	
	$l = ($var_max + $var_min) / 2;
	
	if ($l < .5){
		$l2 = 1;
	}else{
		$l2 = 0;
	}
	
	$l2*=100;
	
	global $othercolor;
	$othercolor = "hsl(0,0%,".(100-$l2)."%)";
	
	return "hsl(0, 0%, $l2%)";
}



function colordropdown(){
	global $hexcodes;
	
	$selected = $_POST["color"];
	
	$dd = "<select name='color' id='dropdown' onchange='myform.submit();'>";

	foreach ($hexcodes as  $color => $hexcode){
			$dd .= '<option value="'.$color.'"';
			if ($color == $selected)
			{
					$dd .= ' selected';
			}
			
			$dd .= '>'.$color.'</option>';
	}
	$dd .= '</select>';
	return $dd;
}

if(!array_key_exists("color", $_POST)){
	if(array_key_exists("color", $_COOKIE)){
		$_POST["color"] = $_COOKIE["color"];
	}else{
		$_POST['color'] = "White";
	}
}

$expire = time()+60*5;
setcookie("color", $_POST["color"], $expire);

$textcolor = blackorwhite($hexcodes[$_POST["color"]]);

$varHTML ="
<html>
<head>
	<title>Background Color Selector</title>
	<link rel='stylesheet' type='text/css' href='selectorcss.css'/>
	<style>
		body{
			font-family:arial, sans;
			text-align:center;
		}
		
		p{
			width:600px;
			margin-left:auto;
			margin-right:auto;
		}
		
		a{
			text-decoration:none;
			color:$textcolor;
		}
		
		a:hover{
			color:$othercolor;
		}
		
		#title{
			font-size:700%;
			color:$textcolor;
		}
		
		#footer{
			margin-top:50px;
		}
	</style>
</head>
<body style='background-color:" .$_POST["color"]."'>
	<h1 id='title' style='color:".$textcolor.";'>Background Selector</h1>
	<form action='selector.php' method='post' name='myform'>
	" . colordropdown() . "
	</form>
	
	<div id='footer'>
		<a href='http://shodor.org/~migueldr/portfolio.html''>Home</a>
		<a href='about.html'>About</a>
	</div>
</body>
</html>
";

echo $varHTML;

?>