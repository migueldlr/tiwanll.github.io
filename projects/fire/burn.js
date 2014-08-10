// Global arrays to store x and y values of the tree positions on the canvas
var xCoord;
var yCoord;
var onFire;
var burnTime;
var TREE_SIZE = 20;
var NUM_TREES = 100;
var NUM_ROWS = 10;
var NUM_COLUMNS = 10;
var IGNITE_RADIUS = 100	;
var BURN_RATE = 50;
var BURN_LENGTH = 4;
var TIME_STEP_MS = 500;
var SPACING = 5;
var FOREST_TYPE = "random";
var BURN_RATE_TYPE = "proportional";
var timePassed = 0;
var newCan;
var myPen;
var Interval;

// Tree graphics
var IMAGES = document.getElementsByTagName("img");
var BURNED_IMAGE = BURN_LENGTH;


function makeForest(){
	$("#resize").resizable({ stop: function(event, ui) {
    	$("canvas", this).each(function() { 
      	  $(this).attr({ width: ui.size.width, height: ui.size.height });
    	});
	} });
	//prepares the canvas. 
	newCan = document.getElementById("theForest");
	
	//creates the pen for drawing on canvas.
	myPen = newCan.getContext("2d");
	
	xCoord = new Array(NUM_TREES);
	yCoord = new Array(NUM_TREES);
	onFire = new Array(NUM_TREES);
	burnTime = new Array(NUM_TREES);
	
	timePassed = 0;
	
	if(FOREST_TYPE == "random"){
		makeRandomForest();
	}else{
		NUM_TREES = NUM_ROWS*NUM_COLUMNS;
		makeGridForest();
	}
	
	// Adds an event listener to the canvas to detect any mouse click
	// within the canvas; when triggered, startFire() is called.
	newCan.addEventListener("mousedown", startFire, false);
	newCan.addEventListener("onmousemove", showMouse(event), false);
	newCan.addEventListener("onmouseout", clearMouse, false);
	
	document.getElementById("results").innerHTML="0 burned, " + NUM_TREES + " unburned.<br />0% burned.<br />0 time steps taken.";
}

function makeRandomForest(){
	// These variables will hold randomly generated numbers, 
	// which will be used as coordinates for a tree. 
	// Tip: reuse these (perhaps in a loop) if you want multiple trees
	var randomX, randomY;
	
	// To keep the trees inside the <canvas> subtract 
	// the half the size of rectangles from the canvas size 500-(20/2) = 490
	var hSize = newCan.height - (TREE_SIZE/2);
	var wSize = newCan.width - (TREE_SIZE/2);
	
	var i = 0;
	while(i<NUM_TREES){
		// Now do this multiple times to grow your forest			
		randomX= Math.floor(Math.random() * wSize) + TREE_SIZE/2;
		randomY= Math.floor(Math.random() * hSize) + TREE_SIZE/2;

	
		// We need to keep track of the location of our trees
		// Store x,y coordinates in arrays
		xCoord[i] = randomX;
		yCoord[i] = randomY;
		
		onFire[i] = false;
		burnTime[i] = 0;
		
		overlaps = false;
		for(var othertree=0; othertree<i; othertree++){
			if(Math.abs(xCoord[i]-xCoord[othertree])<TREE_SIZE && Math.abs(yCoord[i]-yCoord[othertree])<TREE_SIZE){
				overlaps = true;
			}
		}
		
		if(!overlaps){
			i++;
		}
	}
}

function makeGridForest(){
	var numRow = NUM_ROWS;
	var numColumn = NUM_COLUMNS;
	var x = (newCan.width - (numColumn*TREE_SIZE) - ((numColumn-1)*SPACING))/2 + (TREE_SIZE/2);
	var y = (newCan.height - (numRow*TREE_SIZE) - ((numRow-1)*SPACING))/2;
	var index;
	
	for(var i=0; i<numRow; i++){
		for(var j=0; j<numColumn; j++){
			index = i*numColumn+j;
			xCoord[index] = x;
			yCoord[index] = y;
			onFire[index] = false;
			burnTime[index] = 0;

			x+=(TREE_SIZE+SPACING);
		}
		x = (newCan.width - (numColumn*TREE_SIZE) - ((numColumn-1)*SPACING))/2 + (TREE_SIZE/2);
		y+=(TREE_SIZE+SPACING);
	}
}

function changeInput(type){
	if(type=="rowcol"){
		document.getElementById("trees").style.display = "none";
		document.getElementById("rowsandcolumns").style.display = "block";
	}else{
		document.getElementById("trees").style.display = "block";
		document.getElementById("rowsandcolumns").style.display = "none";
	}
}

function initInput(){
	NUM_TREES =     document.getElementById("numberoftrees").value;
	IGNITE_RADIUS = document.getElementById("burnradius").value;
	BURN_RATE =     document.getElementById("burnrate").value;
	TIME_STEP_MS =  document.getElementById("timestep").value;
	NUM_ROWS =      document.getElementById("numberofrows").value;
	NUM_COLUMNS =   document.getElementById("numberofcolumns").value;
	if(document.getElementById("random").checked){
		FOREST_TYPE = "random";
	}else{
		FOREST_TYPE = "grid";
	}
	
	if(document.getElementById("proportional").checked){
		BURN_RATE_TYPE = "proportional";
	}else{
		BURN_RATE_TYPE = "flat";
	}
}

function reset(){
	clearInterval(Interval);
	initInput();
	makeForest();
	display();
	document.getElementById("resumeButton").disabled = true;
	document.getElementById("pauseButton").disabled = true;
}

function startFire(event) {
    
	var distance = new Array();
	
	// Stores the mouse button press coordinates and adjusts 
	// them to x,y coordinates only within the canvas.
	// So these are the x,y coordinates of the fire origin. 
	var xFire = event.offsetX;
	var yFire = event.offsetY;
	
	// This will loop through how many times?
	for(var i = 0; i < NUM_TREES; i++){
		// Determines and stores the distance between the flame and a tree
		distance[i] = findDistance(xCoord[i], yCoord[i], xFire, yFire);
		
		/* Here's a tip: since you're looping through the trees, finding
			each one's distance from the user's mouse click, you could
			test that distance right now to see if it's within the 
			IGNITE_RADIUS. If so, the Burn Rate determines the probability
			that the tree will catch fire. If that's the case, then you 
			indicate the tree is on fire visually and keep track 
			programmatically.*/ 

	}
	
	checkInitialFire(distance);
	display();
	
	Interval = setInterval("step();", TIME_STEP_MS);
	document.getElementById("resumeButton").disabled = true;
	document.getElementById("pauseButton").disabled = false;
	
}

function resume(){
	//Sets the interval for the time step based on the time step in milliseconds
	Interval = setInterval("step();", TIME_STEP_MS);
	document.getElementById("pauseButton").disabled = false;
	document.getElementById("resumeButton").disabled = true;
}

//Called when the pause button is clicked
function pause(){
	clearInterval(Interval);
	document.getElementById("resumeButton").disabled = false;
	document.getElementById("pauseButton").disabled = true;
}

//Called on an interval
function step(){
	timePassed++;
	checkFire();
	incrementFire();
	display();
	if(allBurned()){
		end();
	}
}

function end(){
	clearInterval(Interval);
	document.getElementById("resumeButton").disabled = true;
	document.getElementById("pauseButton").disabled = true;
	outputResults();
}

function outputResults(){
	var countUnburned = 0;
	var countBurned = 0;
	for(var i = 0; i < NUM_TREES; i++){
		if(burnTime[i] == 0){
			countUnburned++;
		}else{
			countBurned++;
		}
	}
	document.getElementById("results").innerHTML=countBurned + " burned, " + countUnburned + " unburned.<br />" + (countBurned/NUM_TREES)*100 + "% burned.<br />" + timePassed + " time steps taken"; 
}

function checkInitialFire(distance){
	for(var i = 0; i < NUM_TREES; i++){
		if(distance[i] <= IGNITE_RADIUS && burnTime[i] == 0 && Math.floor(Math.random()*100)+1 < BURN_RATE){
			onFire[i] = true;
		}
	}
}

function allBurned(){
	var counter = 0;
	for(var i = 0; i < NUM_TREES; i++){
		if(!onFire[i]){
			counter++;
		}
	}
	if(counter == NUM_TREES){
		return true;
	}else{
		return false;
	}
}

function incrementFire(){
	for(var i = 0; i < NUM_TREES; i++){
		if(onFire[i]){
			burnTime[i]++;
		}
		
		if(burnTime[i] >= BURN_LENGTH){
			onFire[i] = false;
		}
	}
}

function checkFire(){
	var distanceToFire;
	for(var i = 0; i < NUM_TREES; i++){
		for(var j = 0; j < NUM_TREES; j++){
			if(i == j || onFire[i]){
				continue;
			}
			
			distanceToFire = findDistance(xCoord[i], yCoord[i], xCoord[j], yCoord[j]);
			
			if(BURN_RATE_TYPE == "proportional"){
				var proportional = (IGNITE_RADIUS-distanceToFire)/IGNITE_RADIUS;
				if(distanceToFire <= IGNITE_RADIUS && burnTime[i] == 0 && onFire[j] && burnTime[j] > 0 && proportional > (1-BURN_RATE)){
					onFire[i] = true;
					break;
				}
			}else{
				if(distanceToFire <= IGNITE_RADIUS && burnTime[i] == 0 && onFire[j] && burnTime[j] > 0 && Math.floor(Math.random()*100)+1 < BURN_RATE){
					onFire[i] = true;
					break;
				}
			}
		}
	}
}

function display(){
	var x;
	var y;
	myPen.clearRect(0,0,newCan.width,newCan.height);
	for(var i = 0; i < NUM_TREES; i++){
		x = xCoord[i]-(TREE_SIZE/2);
		y = yCoord[i]-(TREE_SIZE/2);
		if(burnTime[i] >= BURN_LENGTH){
			myPen.drawImage(IMAGES[BURNED_IMAGE], x, y);
		}else{
			myPen.drawImage(IMAGES[burnTime[i]], x, y);
		}
	}
	
	outputResults();
}

function findDistance(x1, y1, x2, y2){
	/*
	Hit detection using Pythagorean Theorem! REAL WORLD USE of math!!! :)
	a^2 + b^2 = c^2     a squared plus b squared equals c squared
	*/
	
	// Find the distance between 2 points: the fire and the tree.
	var distance = Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
	return(distance);
}

function showMouse(e){
	var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    display();
    myPen.fillStyle="black";
    myPen.beginPath();
    myPen.arc(mouseX,mouseY,IGNITE_RADIUS,0,2*Math.PI);
    myPen.stroke();


    document.getElementById("mouselocation").innerHTML = mouseX + ", " + mouseY;
}

function clearMouse(){
	display();
	document.getElementById("mouselocation").innerHTML = "";
}