var BUG_HEIGHT = 2;
var BUG_WIDTH = 2;
var NUM_BUGS = 300;
var MIN_RATE = 50;
var MAX_RATE = 300;
var ON_COLOR = "white";
var OFF_COLOR = "black";
var INIT_RADIUS = 0;
var RADIUS_INC = 5;
var RADIUS_CAP = 1000;
var GROUP_TOLERANCE = 3;
var PERCENT_CHANCE = 75;
var DIFF_CHANCE = 10;

var SHOW_LINES = true;
var SHOW_NUMBERS = false;
var MAPPING = true;
var SIZE_BASED = true;

var Bugs;
var Interval;
var step_num = 0;
var sync = true;
var finished = false;
var near_radius = INIT_RADIUS;
var paused = false;

var canvas;
var ctx;

window.onload=function(){ //Onload calling
	//Initializes canvas and context
	canvas = document.getElementById("canvas");
	
	ctx = canvas.getContext("2d");
	
	
	canvasSize();
	
	initInput();
	initEvents();
	
	makeBugs();
	draw();
	
	//Begins running
	Interval = setInterval(step, 1);
};

function Bug(x, y, rate, on, timer, near){ //Class definitions for Bug
	this.x = x;
	this.y = y;
	this.rate = rate;
	this.on = on;
	this.timer = timer;
	this.near = near;
}

function canvasSize(){ //Sets canvas height
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function initEvents(){
	document.getElementById("SHOW_LINES").addEventListener("change", update);
	document.getElementById("SHOW_NUMBERS").addEventListener("change", update);
	document.getElementById("MAPPING").addEventListener("change", update);
	document.getElementById("SIZE_BASED").addEventListener("change", update);
	
	document.getElementById("start").addEventListener("click", start);
	document.getElementById("stop").addEventListener("click", stop);
}

function initInput(){ //Initializing what the input looks like based on global values
	document.getElementById("reset").addEventListener("click", reset);

	document.getElementById("NUM_BUGS").value = NUM_BUGS;
	document.getElementById("GROUP_TOLERANCE").value = GROUP_TOLERANCE;
	document.getElementById("PERCENT_CHANCE").value = PERCENT_CHANCE;

	document.getElementById("SHOW_LINES").checked = SHOW_LINES;
	document.getElementById("SHOW_NUMBERS").checked = SHOW_NUMBERS;
	document.getElementById("MAPPING").checked = MAPPING;
	document.getElementById("SIZE_BASED").checked = SIZE_BASED;
}

function update(){ //Updating based on checkbox value
	SHOW_LINES = document.getElementById("SHOW_LINES").checked;
	SHOW_NUMBERS = document.getElementById("SHOW_NUMBERS").checked;
	MAPPING = document.getElementById("MAPPING").checked;
	SIZE_BASED = document.getElementById("SIZE_BASED").checked;
	draw();
}

function start(){
	Interval = setInterval(step, 1);
	paused = false;
	
	document.getElementById("start").disabled = true;
	document.getElementById("stop").disabled = false;
}

function stop(){
	clearInterval(Interval);
	
	drawPause();
	paused = true;
	document.getElementById("start").disabled = false;
	document.getElementById("stop").disabled = true;
}

function reset(){ //Resets simulation
	if(checkErrors()){
		return;
	}

	document.getElementById("error").innerHTML = "";

// 	clearInterval(Interval);
	update();
	
	canvasSize();
	
	NUM_BUGS = parseInt(document.getElementById("NUM_BUGS").value);
	GROUP_TOLERANCE = parseInt(document.getElementById("GROUP_TOLERANCE").value);
	PERCENT_CHANCE = parseInt(document.getElementById("PERCENT_CHANCE").value);
	
	//Resets necessary globals
	step_num = 0;
	finished = false;
	near_radius = INIT_RADIUS;
	
	makeBugs();
	draw();
// 	Interval = setInterval(step, 1);
// 	
// 	paused = false;
// 	
// 	document.getElementById("start").disabled = true;
// 	document.getElementById("stop").disabled = false;
}

function checkErrors(){
	var temp_bugs = parseInt(document.getElementById("NUM_BUGS").value);
	var temp_tolerance = parseInt(document.getElementById("GROUP_TOLERANCE").value);
	var temp_chance = parseInt(document.getElementById("PERCENT_CHANCE").value);
	
	var error = "";
	var errorcount = 0;
	
	if(temp_bugs <= 0){
		error += "<br />Number of bugs is too small.";
		errorcount++;
	}
	if(temp_tolerance < 0){
		error += "<br />Group tolerance is negative.";
		errorcount++;
	}
	if(temp_chance < 0){
		error += "<br />Percent chance is negative.";
		errorcount++;
	}
	if(errorcount>1){
		document.getElementById("error").innerHTML = errorcount + " errors:";
		document.getElementById("error").innerHTML += error + "<br />";
		return true;
	}else if(errorcount == 1){
		document.getElementById("error").innerHTML = "1 error:";
		document.getElementById("error").innerHTML += error + "<br />";
		return true;
	}else{
		return false;
	}
}

function distance(x1, y1, x2, y2){ //Distance formula
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function allgrouped(all){ //Checks if all bugs are "grouped"
	all = all ? true : false;
	var sum;
	var average;
	var difference;
	
	
	
	for(var i=0; i<Bugs.length; i++){
		if(Bugs[i].near.length === 0){
			continue;
		}
		sum = 0;
		for(var j=0; j<Bugs[i].near.length; j++){
			sum += Bugs[Bugs[i].near[j]].rate;
		}
		average = sum / Bugs[i].near.length;
		difference = Math.abs(average - Bugs[i].rate);
		if(difference >= GROUP_TOLERANCE){
			return false;
		}
	}
	return true;
}

function findnear(i){ //Creates array of bugs within radius of specified bug
	var near = new Array();
	for(var j=0; j<NUM_BUGS; j++){
		if(i==j){
			continue;
		}
		if(distance(Bugs[i].x, Bugs[i].y, Bugs[j].x, Bugs[j].y) < near_radius){
			near.push(j);
		}
	}
	return near;
}

function newnear(){ //Reevaluates near array for all bugs
	for(var i=0; i<NUM_BUGS; i++){
		Bugs[i].near = findnear(i);
	}
}

function makeBugs(){ //Creates bugs
	var randx;
	var randy;
	var randrate;
	Bugs = new Array(NUM_BUGS);
	for(var i=0; i<NUM_BUGS; i++){
		randx = randupto(0, canvas.width);
		randy = randupto(0, canvas.height);
		randrate = randupto(MIN_RATE, MAX_RATE);
		Bugs[i] = new Bug(randx, randy, randrate, false, new Array());
	}
	for(var i=0; i<NUM_BUGS; i++){
		Bugs[i].near = findnear(i);
	}
}

function drawTimer(){ //Puts time step on screen
	document.getElementById("steps").innerHTML = step_num;
}

function drawRadius(){ //Puts radius on screen
	document.getElementById("radius").innerHTML = near_radius;
}

function drawPause(){
	ctx.fillStyle = "red";
	ctx.font = "50px Arial";
	ctx.fillText("STOPPED", 20, canvas.height-50);
}

function linestoneighbors(i){ //Draws lines to neighbors for a bug
	var neighbor_index;
	for(var j=0; j<Bugs[i].near.length; j++){
		neighbor_index = Bugs[i].near[j];
		if(MAPPING){
			ctx.strokeStyle = colormap(i);
		}else{
			ctx.strokeStyle = ON_COLOR;
		}
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(Bugs[i].x+(BUG_WIDTH/2), Bugs[i].y+(BUG_HEIGHT/2));
		ctx.lineTo(Bugs[neighbor_index].x+(BUG_WIDTH/2), Bugs[neighbor_index].y+(BUG_HEIGHT/2));
		ctx.stroke();
	}
}

function draw(){ //Draws canvas and things
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTimer();
	drawRadius();
	if(paused){
		drawPause();
	}
	for(var i=0; i<NUM_BUGS; i++){
		if(Bugs[i].on){
			ctx.fillStyle = MAPPING ? colormap(i) : ON_COLOR;
		}else{
			ctx.fillStyle = OFF_COLOR;
		}
		ctx.fillRect(Bugs[i].x, Bugs[i].y, BUG_WIDTH, BUG_HEIGHT);
		if(SHOW_LINES && Bugs[i].on){
			linestoneighbors(i);
		}
		if(SHOW_NUMBERS){
			ctx.fillStyle = MAPPING ? colormap(i) : ON_COLOR;
			ctx.font = "16px Arial";
			ctx.fillText(Math.round(Bugs[i].rate), Bugs[i].x+BUG_WIDTH, Bugs[i].y);
		}
	}
}

function colormap(i){ //Returns hsl value based on rate property of specified bug
	var range = MAX_RATE - MIN_RATE;
	var hue = (Bugs[i].rate-MIN_RATE) * (range/360);
	return 'hsl(' + hue + ', 100%, 50%)';
}

function randupto(min, max){ //Random number generator from min to max-1 inclusive
	var x = max - min;
	return min + Math.floor(Math.random()*x);
}

function changeneighbors(i){ //Changes a specified bug's neighbors' values
	var neighbor_index;
	var chance;
	for(var j=0; j<Bugs[i].near.length; j++){
		neighbor_index = Bugs[i].near[j];
		if(SIZE_BASED){
			chance = Bugs[i].near.length >= Bugs[neighbor_index].near.length ? PERCENT_CHANCE : PERCENT_CHANCE - DIFF_CHANCE;
			chance = chance >= 0 ? chance : 0;
		}else{
			chance = PERCENT_CHANCE;
		}
		
		if(randupto(0, 99)<chance){
			Bugs[neighbor_index].rate = (Bugs[i].rate + Bugs[neighbor_index].rate)/2;
		}
	}
}

function move(i){ //Moves bugs
	var randomdir;
	var moved = false;
	while(!moved){
		randomdir = randupto(0, 3);
		switch (randupto(0, 4)) {
		case 0:
			if(Bugs[i].x>0){
				Bugs[i].x--;
				moved = true;
			}
			break;
		case 1:
			if(Bugs[i].x<canvas.width-1){
				Bugs[i].x++;
				moved = true;
			}
			break;
		case 2:
			if(Bugs[i].y>0){
				Bugs[i].y--;
				moved = true;
			}
			break;
		case 3:
			if(Bugs[i].y<canvas.height-1){
				Bugs[i].y++;
				moved = true;
			}
			break;
		}
	}
}

function step(){ //Main iteration
	if(allgrouped() && !finished){
		near_radius += RADIUS_INC;
		newnear();
	}
	if(near_radius > RADIUS_CAP){
		finished = true;
	}
	switchBugs();
	draw();
	step_num++;
}

function switchBugs(){ //Alters state of bugs
	for(var i=0; i<NUM_BUGS; i++){
		if(step_num%Math.round(Bugs[i].rate)===0 && Bugs[i].rate<step_num){
			Bugs[i].on = true;
			if(!finished && sync){
				changeneighbors(i);
			}
		}
		if(Bugs[i].on && Bugs[i].timer < Bugs[i].rate/2){
			Bugs[i].timer++;
		}
		if(Bugs[i].on && Bugs[i].timer >= Bugs[i].rate/2){
			Bugs[i].on = false;
			Bugs[i].timer = 0;
		}
	}
}