<?php
$blanks = array("name" => "Name",
				"place" => "Place",
				"famousperson" => "Famous Person",
				"animal" => "Animal",
				"instrument" => "Instrument",
				"verb1" => "Progressive Verb",
				"nationality" => "Nationality", 
				"verb2" => "Transitive Verb (Past Tense)",
				"food" => "Food",
				"liquid" => "Liquid",
				"adjective1" => "Adjective", 
				"item" => "Item",
				"adjective2" => "Adjective",
				"relative" => "Relative");
				
$story = "<p id='story'>One day, [name] decided to go to [place] with [famousperson].
While they were there, they saw a(n) [animal] playing the [instrument] and [verb1].
Next, they ate at the famous [nationality] restaurant, where they [verb2] [food] and drank [liquid].
Finally, they bought a(n) [adjective1] [item] in a(n) [adjective2] store for [famousperson]'s [relative].</p>";

function makeForm(){
	global $blanks;
	
	$form = "<form action='dynamic.php' method='get'>";
	
	foreach($blanks as $key => $value){
		$form .= "<input type='text' name='$key' placeholder='$value' /><br />";
	}
	$form .= "<input type='submit' value='Write a story!' />";
	$form .= "</form>";
	return $form;
	
}

function makeStory(){
	global $story;

	preg_match_all('/\[([A-Za-z0-9 ]+?)\]/', $story, $matches);
	
	for($i=0; $i<sizeof($matches[0]); $i++){
		$thing = $_GET[$matches[1][$i]];
		$story = preg_replace($matches[0][$i], "$thing", $story);
	}
	
	$story = articles($story);
	
	$story = preg_replace("/\[/", "<span class='entered'>", $story);
	$story = preg_replace("/\]/", "</span>", $story);
	return $story;
}

function isvowel($letter){
	$vowels = "aeiouAEIOU";
	if(!strstr($vowels, $letter)){
		return false;
	}else{
		return true;
	}
	
}

function articles(){
	global $story;
	$i=0;
	while(preg_match("/a\(n\)/", $story)){
		preg_match("/a\(n\) ../", $story, $matches);
		$letter = substr($matches[0], -1);
		if(isvowel($letter)){
			$replace = "an [".$letter;
		}else{
			$replace = "a [".$letter;
		}
		$story = preg_replace("/a\(n\) ../", $replace, $story, 1);
		$i++;
	}
	return $story;
}

if(!array_key_exists("name", $_GET)){
	$story = "Storytime!";
}else{
	$story = makeStory();
}
$form = makeForm();


$varHTML="
<html>
<head>
	<title>Dynamic Story</title>
	<link rel='stylesheet' type='text/css' href='dynamiccss.css'/>
</head>
<body>
	<h1 id='header'><a href='dynamic.php'>Dynamic Story</a></h1>
	".$story.$form."
	<div id='footer'>
		<a href='http://shodor.org/~migueldr/portfolio.html'>Home</a>
		<a href='about.html'>About</a>
	</div>
</body>
</html>
";

echo $varHTML;
?>