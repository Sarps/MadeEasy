/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

 var topics = [
	"Simple Wiper Mecahnism",
	"2 Position Complex Motion Generation",
	"3 Position Complex Motion Generation",
	"Simple Wiper Mecahnism",
	"2 Position Complex Motion Generation",
	"3 Position Complex Motion Generation",
	"Simple Wiper Mecahnism",
	"2 Position Complex Motion Generation",
	"3 Position Complex Motion Generation",
	"Simple Wiper Mecahnism",
	"2 Position Complex Motion Generation",
	"3 Position Complex Motion Generation"
 ];
 
(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {
	   

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	});
	
	/**************************************************************
	*
	***************************************************************/
	
	$('#switch').click(function(){
		$('.logobig').css({position: "absolute"}).animate({right: "6px", top: "6px", height: "42px"}, "slow", function(){
			$('.col-twelve').slideToggle("slow", function(){
				$('.col-twelve').html("");
				$('.col-twelve').append('<a class="button reclaim">&copy; 2017 Emmanuel Oppong-Sarpong - KNUST</a>');
				var topic = $('<a href=".\\tutorial.html"></a>').addClass('button stroke topic');
				for ( var i=0; i<topics.length; i++) {
					topic.text(topics[i]);  topic.id = i;
					$('.col-twelve').append(topic.clone());
				}
			}).slideToggle("slow");
		});	
	});
	
	/**************************************************************
	*
	***************************************************************/
	
	$('.topic').click(function(){
		window.location = "\\tutorial.html"
		$('.col-twelve').css({position: "absolute"}).animate({right: "10"});
	});

 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);