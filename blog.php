<!DOCTYPE html>
<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="CSS/main.css" title="default"/>
	<link rel="stylesheet" type="text/css" href="CSS/alt.css" title="alternate"/>
	<script src="styleswitcher.js"></script>
	<script src="jstest.js"></script>
	<script src="circles.js" type="text/javascript"></script>
	<script src="randomcolors.js" type="text/javascript"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Miguel de los Reyes - Blog</title>
</head>

<body>
<canvas id="canvas"></canvas>
	<div id="bigContainer">
		<div id="title">
			<a href="#" onclick="switchStyle(); return false;"><h1>Miguel de los Reyes</h1></a>
		</div>
		
		<div class="scroller-anchor"></div>
		<div id="menu" class="scroller">
			<nav>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="blog.php" id="currentLink">Blog</a></li>
					<li><a href="portfolio.html">Portfolio</a></li>
					<li id="dropdown"><a id="shodortitle" href="https://shodor.org">Shodor<span class="hidemobile"> Resources</span></a>
						<ul>
							<li><a href="https://webmail.shodor.org">Webmail</a></li>
							<li><a href="https://wiki.shodor.org/"><span class="hidemobile">Shodor </span>Wiki</a> </li>
							<li><a href="https://www.shodor.org/reflections">Reflections</a></li>
							<li><a href="https://intranet.shodor.org/officeLocator"><span class="hidemobile">Time </span>Clock</a></li>
							<li><a href="https://shodor.org/tools"><span class="hidemobile">Shodor </span>Intranet</a></li>
						</ul>
					</li>	
				</ul>
			</nav>
		</div>
		<div id="content">
			<h2 id="subheader">Blog</h2>
			<p>This is the official blog of Miguel de los Reyes, apprentice at Shodor.</p>
			<?php
				$blog = simplexml_load_file("xmlblog.xml");
				$varHTML = "";
				foreach($blog->section as $section){
					$varHTML .= "<h3 class='section-title'>" . $section . "</h3>";
					$varHTML .= "<div id=" . $section . ">";
					foreach($section->children() as $entry){
						$varHTML .= "<h3 class='date-subheader'>".$entry->date."</h3>";
						$varHTML .= "<p class='entry'>" . $entry->content . "</p>";
					}
					$varHTML .= "</div>";
				}
				
				echo $varHTML;
			?>
		</div>
		<div id="footer">
			<p>
				Created by Miguel de los Reyes. Thanks to Shodor Staff.
			</p>
		</div>
	
</body>

</html>