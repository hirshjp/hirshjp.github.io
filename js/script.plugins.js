;(function($){

	"use strict";

	$(document).ready(function(){

		/* ------------------------------------------------
			Onepage Scroll	
		------------------------------------------------ */

			if($('#content').length){

				$("#content").onepage_scroll({
				   sectionContainer: ".section",
				   loop: false,
				   responsiveFallback: 767 
				});
	            
			}

        /* ------------------------------------------------
				End Onepage Scroll	
		------------------------------------------------ */

		/* ------------------------------------------------
			owlCarousel	
		------------------------------------------------ */

			if($('.menu_slider').length){

				$(".menu_slider").owlCarousel({
				    nav:true,
				    loop:true,
				    navText: [ '', '' ],
				    items:1
				})
	            
			}

        /* ------------------------------------------------
				End owlCarousel
		------------------------------------------------ */

	});

	$(window).load(function(){

		/* ------------------------------------------------
	    	Parallax
		------------------------------------------------ */

		   if($(".blackout[class*='bg'],.blackout2[class*='bg']").length){

		  	  $(".blackout[class*='bg'],.blackout2[class*='bg']").each(function(){

		     $(this).parallax("50%", 0.2);

		    });

		   }
		/* ------------------------------------------------
		    End Parallax
		------------------------------------------------ */

	});

})(jQuery);