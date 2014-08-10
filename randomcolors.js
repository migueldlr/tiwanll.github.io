function hslstring(hue, sat, light){
	return "hsl("+hue+", "+sat+"%, "+light+"%)";
}

function colorthings(){
	var hue = randupto(0, 360);
	var saturation = randupto(50, 95);
	var bglight = randupto(10, 35);
	
	//Colors
	
	var bgcolor = hslstring(hue, saturation, bglight);
	var titlecolor = hslstring(hue, saturation, bglight + 25);
	var menucolor = hslstring(hue, saturation, bglight + 55);
	var subheadercolor = hslstring(comphue(hue), saturation, bglight + 55);
	var linkcolor = hslstring(comphue(hue), saturation, bglight + 35);
	var hovercolor = hslstring(comphue(hue), saturation, bglight + 55);
	
	$("body").css("background-color", bgcolor);
	document.getElementById("title").style.backgroundColor = titlecolor;
	document.getElementById("subheader").style.color = titlecolor;
	$("#footer p").css("color", titlecolor);
	
	//Fix for the browser not recognizing the body background color up to a certain point
	window.scroll(0, $(window).scrollTop()-1);
	window.scroll(0, $(window).scrollTop()+1);
	
	//Color menu items
	var menuthings = document.querySelectorAll("#menu, nav li, nav li ul li");
	for(var i=0; i<menuthings.length; i++){
		menuthings[i].style.backgroundColor = menucolor;
	}
	//Color text
	$("nav ul li a").each(function(){
		$(this).css("color", titlecolor);
	});
	//Color currentLink
	document.getElementById("currentLink").style.color = menucolor;
	$("nav ul li #currentLink").parent().css("background-color", titlecolor);
	$("nav ul li").each(function(){ //Adds hover
		$(this).hover(
		function(){
        	$("nav ul li #currentLink").css("color", titlecolor);
        	$("nav ul li #currentLink").parent().css("background-color", menucolor);
        	$(this).css("background-color", titlecolor);
        	$(this).children("a").css("color", menucolor);
        	
   		},
   		function(){
   			$(this).css("background-color", menucolor);
   			$(this).children("a").css("color", titlecolor);
   			$("nav ul li #currentLink").parent().css("background-color", titlecolor);
   			$("nav ul li #currentLink").css("color", menucolor);
   			
   		}
   		);
	});
	$(".section-title").each(function(){ //Colors sections
		$(this).css("color", titlecolor);
	});
	$(".date-subheader").each(function(){
		$(this).css("color", linkcolor);
		$(this).hover(
		function(){
			$(this).css("color", hovercolor);
		},
		function(){
			$(this).css("color", linkcolor);
			if($(this).hasClass("clicked")){
				$(this).css("color", hovercolor);
			}
		});
		if($(this).hasClass("clicked")){
			$(this).css("color", hovercolor);
		}
	});
	
	$(".entry").each(function(){
		$(this).hover(
		function(){
			$(this).prev(".date-subheader").css("color", hovercolor);
		},
		function(){
			$(this).prev(".date-subheader").css("color", linkcolor);
		});
	});
	
	$(".portfolio-link").each(function(){
		$(this).css("color", linkcolor);
		$(this).hover(
		function(){
			$(this).css("color", hovercolor);
		},
		function(){
			$(this).css("color", linkcolor);
			if($(this).hasClass("clicked")){
				$(this).css("color", hovercolor);
			}
		});
		if($(this).hasClass("clicked")){
			$(this).css("color", hovercolor);
		}
	});
	
	

}