<?php session_start(); ?>
<html>
<body>
	<form action="session.php" method="post">
		<input type="submit" name="submit" value="Submit" />
	</form>
	<form action="session.php" method="post">
		<input type="submit" name="reset" value="Reset" />
	</form>
</body>
</html>

<?php
if(!isset($_POST['submit'])){
	$_SESSION['counter'] = 0;
}

if(isset($_POST['submit'])){
	$_SESSION['counter']++;
}

if(isset($_POST['reset'])){
	unset($_POST['submit']);
	unset($_POST['reset']);
}

echo $_SESSION['counter'];

?>