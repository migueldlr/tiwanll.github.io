<?php
$hexcode = "";
$hexNumbers = "0123456789ABCDEF";

for($i=0; $i<6; $i++){
	$num = rand(0, 15);
	$hexcode .= $hexNumbers[$num];
}

$redhex  = substr($hexcode,0,2);
$greenhex = substr($hexcode,2,2);
$bluehex = substr($hexcode,4,2);

$var_r = (hexdec($redhex)) / 255;
$var_g = (hexdec($greenhex)) / 255;
$var_b = (hexdec($bluehex)) / 255;

$var_min = min($var_r,$var_g,$var_b);
$var_max = max($var_r,$var_g,$var_b);
$del_max = $var_max - $var_min;

$l = ($var_max + $var_min) / 2;

if ($del_max == 0)
{
		$h = 0;
		$s = 0;
}
else
{
		if ($l < 0.5)
		{
				$s = $del_max / ($var_max + $var_min);
		}
		else
		{
				$s = $del_max / (2 - $var_max - $var_min);
		};

		$del_r = ((($var_max - $var_r) / 6) + ($del_max / 2)) / $del_max;
		$del_g = ((($var_max - $var_g) / 6) + ($del_max / 2)) / $del_max;
		$del_b = ((($var_max - $var_b) / 6) + ($del_max / 2)) / $del_max;

		if ($var_r == $var_max)
		{
				$h = $del_b - $del_g;
		}
		elseif ($var_g == $var_max)
		{
				$h = (1 / 3) + $del_r - $del_b;
		}
		elseif ($var_b == $var_max)
		{
				$h = (2 / 3) + $del_g - $del_r;
		};

		if ($h < 0)
		{
				$h += 1;
		};

		if ($h > 1)
		{
				$h -= 1;
		};
};

$h2 = $h + 0.5;
if ($h2 > 1){
	$h2 -= 1;
};

if ($l < .5){
	$l3 = 1;
}else{
	$l3 = 0;
}

$l4 = 1 - $l3;
$l2 = 1 - $l;

$h *= 360;
$h2 *= 360;
$s *= 100;
$l *= 100;
$l2 *= 100;
$l3 *= 100;
$l4 *= 100;

$comphsl = "hsl($h2, $s%, $l2%)";
$texthsl = "hsl($h, $s%, $l3%)";
$selecthsl = "hsl($h, $s%, $l4%)";

$varHTML =<<<END
<html>
<head>
	<title>Random Color Generator</title>
	<style>
		body{
			background-color:#$hexcode;
			color:$texthsl;
		}
		h1{
			font-weight:normal;
			text-align:center;
			font-family:helvetica, arial, sans;
		}
		#title{
			font-size:100;
			color:$comphsl;
		}
		#hexname{
			font-size:200;
		}
		
		::selection{
			background-color:$comphsl;
			color:$selecthsl;
		}
		
		
	</style>
</head>
<body>
	<a href="javascript:history.go(0)" style="text-decoration:none;">
		<h1 id="title">Random Color Generator</h1></a>
	<h1 id="hexname">#$hexcode</h1>
</body>
</html>
END;

echo "$varHTML"; 

?>
