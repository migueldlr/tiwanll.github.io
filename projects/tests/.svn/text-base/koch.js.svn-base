window.onload=function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	
	function snowflake(level, x1, y1, x2, y2){
		if(level===0){
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
			snowflake(level-1, x1, y1, x3, y3);
			snowflake(level-1, x3, y3, x4, y4);
			snowflake(level-1, x4, y4, x5, y5);
			snowflake(level-1, x5, y5, x2, y2);
		}
	}
	var sqrt3over2 = Math.sqrt(3)/2;
	var x1 = 10;
	var y1 = canvas.height/3;
	var length = canvas.width-(x1*2);
	var x2 = x1+length;
	var y2 = y1;
	var x3 = (x1+x2)/2;
	var y3 = y1+(length*sqrt3over2);
	
	function makesnowflake(level){
		snowflake(level, x1, y1, x2, y2);
		snowflake(level, x2, y2, x3, y3);
		snowflake(level, x3, y3, x1, y1);
	}
	
	makesnowflake(3);
}
 // Split the line into segments, each segment will be 1/3
            // the length of the line in both the x and y direction.

// A line that used to look like this:
//
//    _________________________
// x1,y1                     x2,y2
//
// Will now look like this,where each number represents
// a segment that is about to be drawn:
//
//             x4,y4
//               /\
//            2 /  \ 3
//             /    \
//    ___1__x3,y3  x5,y5__4____   
//x1,y1                      x2,y2
//
// The same equations below can be used for lines that look like
// / and \ as well.