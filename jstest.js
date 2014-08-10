$(document).ready(function(){
  $(".section-title").click(function(){
  	var section = $(this).next("div");
  	section.children(".entry").each(function(){
  		$(this).slideToggle(250);
  		$(this).toggleClass("clicked");
  	});
  });
  $(".date-subheader").click(function(){
	$(this).toggleClass("clicked");
    $(this).next(".entry").slideToggle(250);
  });
  
  $(".entry").mouseenter(function(){
    $(this).prev(".date-subheader").addClass("clicked");
  });
  $(".entry").mouseleave(function(){
    $(this).prev(".date-subheader").removeClass("clicked");
  });
});

// This function will be executed when the user scrolls the page.
$(window).scroll(function(e) {
    // Get the position of the location where the scroller starts.
    var scroller_anchor = $(".scroller-anchor").offset().top;
     
    // Check if the user has scrolled and the current position is after the scroller start location and if its not already fixed at the top
    if ($(this).scrollTop() >= scroller_anchor && $('.scroller').css('position') != 'fixed')
    {    // Change the CSS of the scroller to fix it at the top of the screen.
        $('.scroller').toggleClass("scrolled");
        // Changing the height of the scroller anchor to that of scroller so that there is no change in the overall height of the page.
        $('.scroller-anchor').css('height', '24px');
    }
    else if ($(this).scrollTop() < scroller_anchor && $('.scroller').css('position') != 'relative')
    {    // If the user has scrolled back to the location above the scroller anchor place it back into the content.
         
        // Change the height of the scroller anchor to 0 and now we will be adding the scroller back to the content.
        $('.scroller-anchor').css('height', '0px');
         
        // Change the CSS and put it back to its original position.
        $('.scroller').toggleClass("scrolled");
    }
});