var display;
window.onload=function(){
	var biggest = 0;
	display = document.getElementById("display");
	
	$("#mini img").hover(
		function(){
			var src = $(this).attr("src");
			$(".selected").removeClass("selected");
			$(this).toggleClass("selected");
			display.innerHTML = "<img src='"+src+"' />";
		}, function(){
			
		}
	);
}