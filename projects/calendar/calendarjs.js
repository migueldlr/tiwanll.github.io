$(document).ready(function(){
  $(".headerbox").mouseenter(function(){
	var dayname = $(this).attr('class').split(' ')[1];
	$($("#calendar").find("."+dayname)).each(function(){
	  if($(this).not(".headerbox")){
	    $(this).addClass("hovered");
	  };
	});
  });
  $(".headerbox").mouseleave(function(){
	var dayname = $(this).attr('class').split(' ')[1];
	$($("#calendar").find("."+dayname)).each(function(){
	  if($(this).not(".headerbox")){
	    $(this).removeClass("hovered");
	  };
	});
  });
  $(".headerbox").click(function(){
	var dayname = $(this).attr('class').split(' ')[1];
	$($("#calendar").find("."+dayname)).each(function(){
	  $(this).toggleClass("clicked");
	});
  });
  $("td").click(function(){
  	$(this).toggleClass("clicked");
  });
});