'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Homepage = function () {
	function Homepage() {
		(0, _classCallCheck3.default)(this, Homepage);

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
			self.createCanvas(self.canvases, self.options);
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
			$('ul.menu').hasClass('active') ? $('ul.menu').removeClass('active') : $('ul.menu').addClass('active');

			$('i.overlay').hasClass('active') ? $('i.overlay').removeClass('active') : $('i.overlay').addClass('active');
		});
	}

	(0, _createClass3.default)(Homepage, [{
		key: 'createCanvas',
		value: function createCanvas(data, options) {
			var self = this;

			for (var i = 0; i < data.length; i++) {
				var myCanvas = document.getElementById(data[i]);
				myCanvas.width = 250;
				myCanvas.height = 250;

				var ctx = myCanvas.getContext("2d");
				self.drawPieSlice(ctx, options);
			}
		}
	}, {
		key: 'drawPieSlice',
		value: function drawPieSlice(ctx, options) {
			ctx.beginPath();
			ctx.moveTo(options[0], options[1]);
			ctx.arc(options[0], options[1], options[2], options[3], options[4]);
			ctx.closePath();

			var grad1 = ctx.createLinearGradient(0, 0, 200, 0, 0, 0);

			grad1.addColorStop(1, "#1f2944");
			grad1.addColorStop(0.5, "#1b5964");

			ctx.fillStyle = grad1;
			ctx.fill();
		}
	}, {
		key: 'createEvents',
		value: function createEvents(data) {
			var self = this;

			for (var i = 0; i < data.length; i++) {
				$('#' + data[i]).closest('.shapes').on('click', function () {
					if (!$(this).hasClass('active')) {
						self.chooseItem(data, $(this).find('canvas').attr('id'));
						self.makeInterval($(this).find('canvas').attr('id'));
					}
				});
			}
		}
	}, {
		key: 'chooseItem',
		value: function chooseItem(data, selectedId) {
			var self = this;
			var $selectedElement = $('#' + selectedId).closest('.shapes');

			for (var i = 0; i < data.length; i++) {
				if (data[i] !== selectedId) {
					var $element = $('#' + data[i]).closest('.shapes');

					$element.animate({ top: 1000 }, 1000, function () {
						$('#' + selectedId).closest('.shapes').find('.none-visible').removeClass('none-visible');
						$selectedElement.animate({ left: 0 }, 1000, 'easeOutQuad', function () {

							self.intervalData.push(setInterval(function () {
								self.smallCircle(selectedId);
							}, 50));
						});
					});
				}
			}
		}
	}, {
		key: 'makeInterval',
		value: function makeInterval(selectedId) {
			var self = this;

			var interval = setInterval(function () {
				self.makeCircle(selectedId, interval);
			}, 19);
		}
	}, {
		key: 'makeCircle',
		value: function makeCircle(selectedId, interval) {
			var self = this;
			var $element = $('.content-area');

			if (self.animateOptions[3] >= 1.1) {
				self.animateOptions[3] = self.animateOptions[3] - 0.1;
				self.createCanvas([selectedId], self.animateOptions);
			} else if (self.animateOptions[3] !== 1.001) {
				self.animateOptions[3] = 1.001;
				clearInterval(interval);
				self.createCanvas([selectedId], self.animateOptions);
			} else {
				self.createCanvas([selectedId], self.animateOptions);
			}
		}
	}, {
		key: 'smallCircle',
		value: function smallCircle(selectedId, interval) {
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
			} else if (self.animateOptions[2] <= smallSize) {

				var $element = $('#pageTitle');
				var elementTop = $('#pageTitle').offset().top;
				var elementLeft = $('#pageTitle').offset().left;

				if ($(window).width() < 768) {
					$('.content-area').addClass('active').animate({ top: 24 }, 2000, 'easeOutQuad');
				} else {
					$('.content-area').addClass('active').animate({ top: 72 }, 2000, 'easeOutQuad');
				}

				$('.' + selectedId + '-content').addClass('active');

				$('#pageTitle').addClass('active').animate({ top: -500 }, 2000, 'easeOutQuad', function () {
					$('.icon-back').addClass('active');
				});

				for (var i = 0; i < self.intervalData.length; i++) {
					clearInterval(self.intervalData[i]);
				}

				return false;
			}
		}
	}, {
		key: 'setBodyHeight',
		value: function setBodyHeight() {
			var headerHeight = $('.header').height();
			var windowHeight = $(window).height();
			var contentHeight = windowHeight - headerHeight;

			$('.page-container').css('height', contentHeight + 'px');
		}
	}, {
		key: 'resetScreen',
		value: function resetScreen(data, options) {
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
	}]);
	return Homepage;
}();

var homepage = new Homepage();