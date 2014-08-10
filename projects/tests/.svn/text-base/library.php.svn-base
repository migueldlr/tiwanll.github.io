<?php
$xml = simplexml_load_file("library.xml");
//var_dump($xml);
echo ($xml->video) . "<br />";
var_dump($xml->video);
foreach($xml->children() as $child){
	echo $child->getName() . ":" . $child . "<br />";
	if($child->children()){
		foreach($child->children() as $grandchild){
			echo "-" . $grandchild->getName() . ":" . $grandchild . "<br />";
		}
	}
}
?>