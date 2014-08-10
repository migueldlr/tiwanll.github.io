var canvas;
var ctx;
var level;
var x1, y1, x2, y2, x3, y3;
var length;
var sqrt3over2 = Math.sqrt(3)/2;


window.onload=function(){
	$("#resize").resizable({ stop: function(event, ui) {
    	$("canvas", this).each(function() { 
      	  $(this).attr({ width: ui.size.width, height: ui.size.height });
      	  changelevel(level);
    	});
	} });

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.strokeStyle="#000000";
	level = document.getElementById("level").value;
	
	
	init();
	
	makesnowflake(level);
}

function snowflake(n, x1, y1, x2, y2){
	if(n==0){
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}else{
		var xlen = (x2 - x1) / 3;
		var ylen = (y2 - y1) / 3;
		var x3 = x1 + xlen;
		var y3 = y1 + ylen;
		var x4 = x3 + xlen / 2 + sqrt3over2 * ylen;
		var y4 = y3 - sqrt3over2 * xlen + ylen / 2;
		var x5 = x1 + 2 * xlen;
		var y5 = y1 + 2 * ylen;
		snowflake(n-1, x1, y1, x3, y3);
		snowflake(n-1, x3, y3, x4, y4);
		snowflake(n-1, x4, y4, x5, y5);
		snowflake(n-1, x5, y5, x2, y2);
	}
}

function makesnowflake(n){
	ctx.clearRect (0, 0, canvas.width, canvas.height);
	if(n<0||n>8){
		document.getElementById("error").innerHTML = "Value must be between 0 and 8.";
		return;
	}else{
		document.getElementById("error").innerHTML = "";
		snowflake(n, x1, y1, x2, y2);
		snowflake(n, x2, y2, x3, y3);
		snowflake(n, x3, y3, x1, y1);
	}
}

function changelevel(){
	var level = document.getElementById("level").value;
	init();
	makesnowflake(level);
}

function init(){
	length = canvas.height < canvas.width ? canvas.height/(1.5) : canvas.width/(1.5);
	x1 = (canvas.width-length)/2;
	y1 = (canvas.height-length*(2/3))/2;
	x2 = x1+length;
	y2 = y1;
	x3 = (x1+x2)/2;
	y3 = y1+(length*sqrt3over2);
}