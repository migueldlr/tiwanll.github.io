// Global arrays to store x and y values of the tree positions on the canvas
var xCoord = new Array();
var yCoord = new Array();
var onFire = new Array();
var burnTime = new Array();
var TREE_SIZE = 20;
var NUM_TREES = 100;
var IGNITE_RADIUS = 75;
var BURN_RATE = 50;
var BURN_LENGTH = 4;
var TIME_STEP_MS = 500;
var newCan;
var myPen;
var Interval;

function makeForest(){

	//prepares the canvas. 
	newCan = document.getElementById("theForest");
	
	//creates the pen for drawing on canvas.
	myPen = newCan.getContext("2d");
	
	
	// These variables will hold randomly generated numbers, 
	// which will be used as coordinates for a tree. 
	// Tip: reuse these (perhaps in a loop) if you want multiple trees
	var randomX, randomY;
	
	// To keep the trees inside the <canvas> subtract 
	// the half the size of rectangles from the canvas size 500-(20/2) = 490
	var hSize = newCan.height - (TREE_SIZE/2);
	var wSize = newCan.width - (TREE_SIZE/2);
	
	for(var i = 0; i < NUM_TREES; i++){
		// Now do this multiple times to grow your forest			
		randomX= Math.floor(Math.random() * wSize) + TREE_SIZE/2;
		randomY= Math.floor(Math.random() * hSize) + TREE_SIZE/2;

	
		// We need to keep track of the location of our trees
		// Store x,y coordinates in arrays
		xCoord[i] = randomX;
		yCoord[i] = randomY;
		
		onFire[i] = false;
		burnTime[i] = 0;
	
		// For each tree, draw a 20x20 green square at the random x,y coordinates.
		myPen.fillStyle="green";
		myPen.fillRect(xCoord[i]-(TREE_SIZE/2),yCoord[i]-(TREE_SIZE/2),TREE_SIZE,TREE_SIZE);

	}
	// Adds an event listener to the canvas to detect any mouse click
	// within the canvas; when triggered, startFire() is called.
	newCan.addEventListener("mousedown", startFire, false);
}

function initInput(){
	NUM_TREES =     document.getElementById("numberoftrees");
	IGNITE_RADIUS = document.getElementById("burnradius");
	BURN_RATE =     document.getElementById("burnrate");
	TIME_STEP_MS =  document.getElementById("timestep");
}

function reset(){
	initInput();
	makeForest();
	display();
	clearInterval(Interval);
}

function startFire(event) {
    
	var distance = new Array();
	
	// Stores the mouse button press coordinates and adjusts 
	// them to x,y coordinates only within the canvas.
	// So these are the x,y coordinates of the fire origin. 
	var xFire = event.pageX - newCan.offsetLeft;
	var yFire = event.pageY - newCan.offsetTop;
	
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
	
}

function resume(){
	Interval = setInterval("step();", TIME_STEP_MS);
}

function pause(){
	clearInterval(Interval);
}

function step(){
	checkFire();
	incrementFire();
	display();
}

function checkInitialFire(distance){
	for(var i = 0; i < NUM_TREES; i++){
		if(distance[i] <= IGNITE_RADIUS && burnTime[i] == 0){
			onFire[i] = true;
		}else{
			onFire[i] = false;
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
			if(i == j){
				continue;
			}
			
			distanceToFire = findDistance(xCoord[i], yCoord[i], xCoord[j], yCoord[j]);
			
			if(distanceToFire <= IGNITE_RADIUS && burnTime[i] == 0 && onFire[j] && Math.floor(Math.random()*100)+1 < BURN_RATE){
				onFire[i] = true;
			}
		}
	}

}

function display(){
	for(var i = 0; i < NUM_TREES; i++){
		if(burnTime[i] == 0){
			myPen.fillStyle="green";
		}else if(onFire[i]){
			myPen.fillStyle="red";
		}else if(burnTime[i]==BURN_LENGTH){
			myPen.fillStyle="black";
		}
		myPen.fillRect(xCoord[i]-(TREE_SIZE/2),yCoord[i]-(TREE_SIZE/2),TREE_SIZE,TREE_SIZE);
	}
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

