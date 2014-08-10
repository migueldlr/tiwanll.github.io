function Canvas(){
	this.ctxt = getElementById("output").getContext("2d");
}

Canvas.clear = function(){
	this.ctxt.clearRect(0,0,canvas.width,canvas.height);
}

Canvas.redraw = function(){
	this.clear();
	for(i=0;i<carList.length;i++) {
		carList[i].draw();
	}
}