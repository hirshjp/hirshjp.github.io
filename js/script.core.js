;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.contactForm.init();

		},

		windowLoad: function(){

			var self = this;

			self.fullScreen.init();
			self.navigation();

		},


		/**
		**	Full screen
		**/


		fullScreen:{

			init: function(){

				var self = this;

				self.w = $(window);
				self.slide = $('.section');

				self.calculation();

				self.w.on('resize', function(){

					self.calculation();

				});

			},

			calculation: function(){

				var self = this;

				if(self.w.width() > 767){

					self.wHeight = self.w.height();

					self.slide.height(self.wHeight);
					
				}
				else{

					self.wHeight = self.w.height();

					self.slide.css({
						'height': 'auto'
					});

					self.slide.each(function(){

						var $this = $(this),
							height = $this.height();

						if(height < self.wHeight){
							
							$this.height(self.wHeight);

						}

					});

				}

			},

		},



		/**
		**	Main navigation
		**/


	    navigation : function(){

	    	var self = this;

	    	$(".navigation a").on("click",function(event){

	    		event.preventDefault();

	    		var id = $(this).attr("href"),
	    			index = $(id).index();

	    		if($(window).width() > 767){

	    			$("#content").moveTo(index+1);   		
	    		
	    		}
	    		else{

					var offset = $(id).offset().top;

			    	$('html,body').stop().animate({

						scrollTop: offset

			    	},1000);


	    		}


	    	});

	    	$('.nav_btn').on('click', function(){

	    		$('#nav').toggleClass('opened');

	    	});

	    	$(document).on('click', function(event){

	    		if(!$(event.target).closest('#nav').length){

	    			$('#nav').removeClass('opened');
	    		
	    		}

	    	});

	    },



		/**
		**	Contact Form
		**/

		contactForm: {

			init: function(){

				var self = this;

				self.cF = $('.ajax-contact-form');


				self.cF.on("submit", { obj: this }, self.eventHandler);

			},

			eventHandler: function(event){

				event.preventDefault();

				var self = event.data.obj,
				$this = $(this);

				if(!self.clientValidation($this) || self.cF.hasClass('informed')){

					return false;
				};

				$.ajax({
					url: 'contact_form/contact_process.php', 
					type: 'post',
					data: $this.serialize(),
					success: function(data){

						var type = data.indexOf("success") != -1 ? 'success' : 'error';
						self.showMessage(data, type);

					}
				});

			},

			clientValidation: function(form){

				var self = this,
				collection = form.find('[required]'),
				minCCollection = form.find('[data-min-characters]'),
				message = "";

				collection.each(function(i, el){

					if($(el).val() == ""){

						message += "All required fields must be filled! <br>";
						return false;

					}

				});

				minCCollection.each(function(i, el){

					message += self.minCharacters($(el));

				});

				if(message !== "" && !form.hasClass('informed')){

					self.showMessage(message, 'error');

				}

				return message === "";
			},

			minCharacters: function(el){

				var amount = el.data('min-characters');

				return el.val().length < amount ? '"'+el.data('field-name') + '"  field should contain minimum '+amount+' characters!' + "<br>" : "";

			},

			showMessage: function(data, type){

				var template = $("<div class='info_box t_hide' data-type='"+type+"'><p>"+data+"</p></div>"),
				f = this.cF;

				if(type === "success") f.find('input, textarea').val("");

				f.addClass('informed');

				template.appendTo(f).slideDown(function(){

					$(this)
					.delay(4000)
					.slideUp(function(){

						f.removeClass('informed');
						$(this).remove();

					});

				});

			},

   		},




	}


	$(document).ready(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);