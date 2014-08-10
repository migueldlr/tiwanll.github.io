var size = 10;
var shadows = false;
window.onload=function(){
	canvas = document.getElementById("canvas");
	
	ctx = canvas.getContext("2d");
	resetSize();
	/*if (canvas.addEventListener) {
		// IE9, Chrome, Safari, Opera
		canvas.addEventListener("mousewheel", MouseWheelHandler, false);
		// Firefox
		canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	}*/
	canvas.addEventListener("mousedown", point, false);
	putCircle(randupto(0, canvas.width), randupto(0, canvas.height));
	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});
	
	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			resetSize();
			putCircle(randupto(0, canvas.width), randupto(0, canvas.height));
		}               
	}
}

function resetSize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function randupto(min, max){
	x = max - min;
	return min + Math.floor(Math.random()*x);
}

function randomhex(){
	var hexcode = "";
	var hexNumbers = "0123456789ABCDEF";
	
	for(var i=0; i<6; i++){
		num = randupto(0, 15);
		hexcode += hexNumbers[num];
	}
	return "#"+hexcode;
}

function oncircle(r, xc, yc, x1, y1){
	return Math.pow((xc - x1), 2) + Math.pow((yc - y1), 2) == r*r;
}

function putCircle(x, y){
	var runOnce = false;
	var radius = randupto(5, 100);
	var xc = randupto(0, canvas.width);
	var yc = randupto(0, canvas.height);
	if(shadows){
		ctx.shadowColor = '#000';
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
    }
	while(!ctx.isPointInPath(x, y) || !runOnce){
		radius = randupto(5, 100);
		xc = randupto(0, canvas.width);
		yc = randupto(0, canvas.height);
		ctx.beginPath();
    	ctx.arc(xc,yc,radius,0,2*Math.PI);
    	ctx.closePath();
    	ctx.fillStyle = randomhex();
   		ctx.fill();
   		runOnce = true;
	}
	colorthings();
}

function point(e){
	var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    resetSize();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
	putCircle(mouseX, mouseY);
}

function showMouse(e){
	var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(mouseX,mouseY,size,0,2*Math.PI);
    ctx.stroke();
}

function MouseWheelHandler(e){
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	size+=delta;
	size = size < 0 ? 0 : size;
	showMouse(e);
	return false;
}

function comphue(hue){
	var newhue = hue + 180;
	if(newhue > 360){
		newhue -= 360;
	}
	return newhue;
}

