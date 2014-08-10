var BUG_HEIGHT = 3;
var BUG_WIDTH = 3;
var NUM_BUGS = 200;
var BLINK_DURATION = 250;
var INTERVAL_SPEED = 1;
var ON_COLOR = "white";
var OFF_COLOR = "black";
var NEAR_RADIUS = 50;
var ALL_TOLERANCE = .1;
var RADIUS_INC = 1;
var SHOW_LINES = true;
var SHOW_NUMBERS = false;

var Bugs;
var Interval;
var step_num = 0;
var sync = true;
var finished = false;

window.onload=function(){
	canvas = document.getElementById("canvas");
	
	ctx = canvas.getContext("2d");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	makeBugs();
	draw();
}

function Bug(x, y, rate, on, timer, near, radius){
	this.x = x;
	this.y = y;
	this.rate = rate;
	this.on = on;
	this.timer = timer;
	this.near = near;
	this.radius = radius;
}

function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function allgrouped(){
	var alltrue = true;
	for(var i=0; i<Bugs.length; i++){
		if(grouped(i)){
			anyfalse = 
			Bugs[i].radius+=RADIUS_INC;
			Bugs[i].near = findnear(i);
			for(var j=0; j<Bugs[i].near.length; j++){
				Bugs[Bugs[i].near[j]].radius += RADIUS_INC;
				Bugs[Bugs[i].near[j]].near = findnear(Bugs[i].near[j]);
			}
		}else{
			alltrue = false;
		}
	}
	return alltrue;
}

function grouped(i){
	var tolerance = ALL_TOLERANCE;
	var sum;
	var average;
	var difference;
	if(Bugs[i].near.length == 0){
		return true;
	}
	sum = 0;
	for(var j=0; j<Bugs[i].near.length; j++){
		sum += Bugs[Bugs[i].near[j]].rate;
	}
	average = sum / Bugs[i].near.length;
	difference = Math.abs(average - Bugs[i].rate)
	if(difference >= tolerance){
		return false;
	}
	return true;
}

function findnear(i){
	var near = new Array();
	for(var j=0; j<NUM_BUGS; j++){
		if(i==j){
			continue;
		}
		if(distance(Bugs[i].x, Bugs[i].y, Bugs[j].x, Bugs[j].y) < Bugs[i].radius){
			near.push(j);
		}
	}
	return near;
}

function newnear(){
	for(var i=0; i<NUM_BUGS; i++){
		Bugs[i].near = findnear(i);
	}
}

function makeBugs(){
	var randx;
	var randy;
	var randrate;
	Bugs = new Array(NUM_BUGS);
	for(var i=0; i<NUM_BUGS; i++){
		randx = randupto(0, canvas.width);
		randy = randupto(0, canvas.height);
		randrate = randupto(100, 400);
		Bugs[i] = new Bug(randx, randy, randrate, false, 0, new Array(), NEAR_RADIUS);
	}
	for(var i=0; i<NUM_BUGS; i++){
		Bugs[i].near = findnear(i);
	}
}

function drawTimer(){
	ctx.fillStyle = ON_COLOR;
	ctx.font = "16px Arial";
	ctx.fillText(step_num, 100, 100);
}

function linestoneighbors(i){
	var neighbor_index;
	for(var j=0; j<Bugs[i].near.length; j++){
		neighbor_index = Bugs[i].near[j];
		ctx.strokeStyle = ON_COLOR;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(Bugs[i].x+(BUG_WIDTH/2), Bugs[i].y+(BUG_HEIGHT/2));
		ctx.lineTo(Bugs[neighbor_index].x+(BUG_WIDTH/2), Bugs[neighbor_index].y+(BUG_HEIGHT/2));
		ctx.stroke();
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTimer();
	for(var i=0; i<NUM_BUGS; i++){
		ctx.fillStyle = Bugs[i].on ? ON_COLOR : OFF_COLOR;
		ctx.fillRect(Bugs[i].x, Bugs[i].y, BUG_WIDTH, BUG_HEIGHT);
		if(SHOW_LINES && Bugs[i].on){
			linestoneighbors(i);
		}
		if(SHOW_NUMBERS){
			ctx.fillStyle = ON_COLOR;
			ctx.font = "16px Arial";
			ctx.fillText(Math.round(Bugs[i].rate), Bugs[i].x+BUG_WIDTH, Bugs[i].y);
		}
	}
}

function randupto(min, max){
	x = max - min;
	return min + Math.floor(Math.random()*x);
}

function changeneighbors(i){
	var neighbor_index;
	for(var j=0; j<Bugs[i].near.length; j++){
		neighbor_index = Bugs[i].near[j];
		if(randupto(0, 100)<25){
			Bugs[neighbor_index].rate = (Bugs[i].rate + Bugs[neighbor_index].rate)/2;
		}
	}
}

function step(){
	if(!finished && allgrouped()){
		finished = true;
	};
	switchBugs();
	draw();
	step_num++;
}

function switchBugs(){
	for(var i=0; i<NUM_BUGS; i++){
		if(step_num%Math.round(Bugs[i].rate)==0 && Bugs[i].rate<=step_num){
			Bugs[i].on = true;
			if(sync){
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

Interval = setInterval(step, 1);