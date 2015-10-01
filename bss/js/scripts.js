/**
* Handles smooth scrolling on click of anchor link
*/

$(function() {
	$('a').click(function() {
	//console.log("click")
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      		var target = $(this.hash);
      		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      			if (target.length) {
        			$('html,body').animate({
          			scrollTop: target.offset().top
        			}, 1000);
        			return false;
      			}
    		}
  	});
});

$(function(){
  $("#darkness").click(function(){
    if($("#side-menu").hasClass("show")){
      $("#side-menu").removeClass("show");
      $("#darkness").removeClass("show");
    }
  });
});

$(function(){
  $('#menutrigger').click(function(){
    console.log("Hi!");
    $("#side-menu").addClass("show");
    $("#darkness").addClass("show");
  });
});

