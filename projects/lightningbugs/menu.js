$(window).load(function(){
	$("#arrow").click(hideshow);
	$("canvas").click(hideshow);
	
	function hideshow(){
		$("#menu").toggleClass("hidden");
		if($("#arrow").text() == "<"){
			$("#arrow").text(">");
		}else if($("#arrow").text() == ">"){
			$("#arrow").text("<");
		}
	}
});