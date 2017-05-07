class Homepage {
  constructor() {
  	var self = this;
    
		self.canvases = ['w', 'v', 'n', 't'];
		self.options = [125, 125, 115, 5.3, 1];
		self.animateOptions = [125, 125, 115, 5.3, 1];
		self.intervalData = [];

		if ($(window).width() < 768) {
			self.options[2] = 70;
			self.animateOptions[2] = 70;
		}

		if ($('.homepage').length) {
			self.createCanvas(self.canvases, self.options)
			self.createEvents(self.canvases);
		}
		
		self.setBodyHeight();

		$(window).on('resize', function () {
			self.setBodyHeight();
		});

		$('.icon-back').on('click', function () {
			self.resetScreen(self.canvases, self.options);
		});

		$('.icon-hamburger').on('click', function () {
			$('ul.menu').hasClass('active') ?
			$('ul.menu').removeClass('active') :
			$('ul.menu').addClass('active');

			$('i.overlay').hasClass('active') ?
			$('i.overlay').removeClass('active') :
			$('i.overlay').addClass('active');
		});
  }

  createCanvas (data, options) {
  	var self = this;

  	for (var i = 0; i < data.length; i++) {
  		var myCanvas = document.getElementById(data[i]);
			myCanvas.width = 250;
			myCanvas.height = 250;
			 
			var ctx = myCanvas.getContext("2d");
			self.drawPieSlice(ctx, options);
  	}
  }

  drawPieSlice (ctx, options) {
    ctx.beginPath();
    ctx.moveTo(options[0],options[1]);
    ctx.arc(options[0],options[1], options[2], options[3], options[4]);
    ctx.closePath();

    var grad1 = ctx.createLinearGradient(0, 0, 200, 0, 0, 0);

		grad1.addColorStop(1, "#1f2944");
		grad1.addColorStop(0.5, "#1b5964");

		ctx.fillStyle = grad1;
		ctx.fill();
	} 

	createEvents (data) {
		var self = this;

		for (var i = 0; i < data.length; i++) {
			$('#' + data[i]).closest('.shapes').on('click', function () {
				if (!$(this).hasClass('active')) {
					self.chooseItem(data, $(this).find('canvas').attr('id'));
					self.makeInterval($(this).find('canvas').attr('id'));
				}
			})
		}
	}

	chooseItem (data, selectedId) {
		var self = this;
		var $selectedElement = $('#' + selectedId).closest('.shapes');

		for (var i = 0; i < data.length; i++) {
			if (data[i] !== selectedId) {
				var $element = $('#' + data[i]).closest('.shapes');

				$element.animate({top: 1000}, 1000, function () {
					$('#' + selectedId).closest('.shapes').find('.none-visible').removeClass('none-visible');	
					$selectedElement.animate({left: 0}, 1000, 'easeOutQuad', function () {

						self.intervalData.push(setInterval(function () {
							self.smallCircle(selectedId);
						}, 50));
					});
				});
			}
		}
	}

	makeInterval (selectedId) {
		var self = this;

		var interval = setInterval(function () {
			self.makeCircle(selectedId, interval);
		}, 19);
	}

	makeCircle (selectedId, interval) {
		var self = this;
		var $element = $('.content-area');

		if (self.animateOptions[3] >= 1.1) {
			self.animateOptions[3] = self.animateOptions[3] - 0.1;
			self.createCanvas([selectedId], self.animateOptions);
		} else if(self.animateOptions[3] !== 1.001) {
			self.animateOptions[3] = 1.001;
			clearInterval(interval);
			self.createCanvas([selectedId], self.animateOptions);
		} else {
			self.createCanvas([selectedId], self.animateOptions);
		}
	}

	smallCircle (selectedId, interval) {
		var self = this;
		var smallSize = 32;

		if ($(window).width() < 768) {
			smallSize = 24;
		}

		if (!$('#' + selectedId).closest('.shapes').hasClass('active')) {
			$('#' + selectedId).closest('.shapes').addClass('active');
		}

		if (self.animateOptions[2] > smallSize - 1) {

			self.animateOptions[2] = self.animateOptions[2] - 1.8;
			self.createCanvas([selectedId], self.animateOptions);

		} else if(self.animateOptions[2] <= smallSize) {

			var $element = $('#pageTitle');
			var elementTop = $('#pageTitle').offset().top;
			var elementLeft = $('#pageTitle').offset().left;

			if ($(window).width() < 768) {
				$('.content-area').addClass('active')
				.animate({top: 24}, 2000, 'easeOutQuad');
			} else {
				$('.content-area').addClass('active')
				.animate({top: 72}, 2000, 'easeOutQuad');
			}

			$('.' + selectedId + '-content').addClass('active');

			$('#pageTitle').addClass('active')
			.animate({top: -500}, 2000, 'easeOutQuad', function () {
				$('.icon-back').addClass('active');
			});

			for (var i = 0; i < self.intervalData.length; i++) {
				clearInterval(self.intervalData[i]);
			}

			return false;
		}
	}

	setBodyHeight () {
		var headerHeight = $('.header').height();
		var windowHeight = $(window).height();
		var contentHeight = windowHeight - headerHeight;

		$('.page-container').css('height', contentHeight + 'px');
	}

	resetScreen (data, options) {
		var self = this;

		$('.page-container').fadeTo(1000, '0', function () {
			$('.active').removeClass('active');
			$('#pageTitle').removeAttr('style');
			$('.content-area').removeAttr('style');

			for (var i = 0; i < data.length; i++) {
				var $element = $('#' + data[i]).closest('.shapes');

				if (!$element.find('.hide-text').hasClass('none-visible')) {
					$element.find('.hide-text').addClass('none-visible');
				}

				$element.removeAttr('style');
			}

			self.createCanvas(data, options);
			self.animateOptions = self.options.slice(0);

			$('.page-container').fadeTo(1000, '1');
		});
	}
}

let homepage = new Homepage();