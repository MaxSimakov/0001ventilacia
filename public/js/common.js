"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
var scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		var link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function afterClose() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null; // 	document.querySelector("html").classList.remove("fixed")
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		var menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(function (element) {
				return element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.remove("fixed");
			});
			document.querySelector("html").style.marginRight = null;
		}
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : ''; // console.log(el.innerHTML);

				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary d-lg-none  mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl, _Swiper;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = document.body.dataset.bg;

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function setFixedNav() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', function () {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	var swiperProduction = new Swiper('.sProduction .slider-index', {
		// Optional parameters
		loop: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true
		},
		// Responsive breakpoints
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 20
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 40
			}
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sProduction .swiper-button-next',
			prevEl: '.sProduction .swiper-button-prev'
		}
	});
	var swiperClients = new Swiper('.sClients .slider-index', {
		// Optional parameters
		loop: true,
		watchOverflow: true,
		slidesPerView: 2,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true
		},
		autoplay: {
			delay: 5000
		},
		// Responsive breakpoints
		breakpoints: {
			400: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 30
			},
			1200: {
				slidesPerView: 5
			},
			1400: {
				slidesPerView: 6,
				spaceBetween: 35
			}
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sClients .swiper-button-next',
			prevEl: '.sClients .swiper-button-prev'
		}
	});
	var swiperManufacture = new Swiper('.sManufacture .slider-index', {
		// Optional parameters
		loop: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true
		},
		// Responsive breakpoints
		breakpoints: {
			450: {
				slidesPerView: 1,
				spaceBetween: 40
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 40
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 40
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 40
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 60
			}
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sManufacture .swiper-button-next',
			prevEl: '.sManufacture .swiper-button-prev'
		}
	}); //luckyone js

	var prodCardThumb = new Swiper('.sProdCard-thumb-js', (_Swiper = {
		slidesPerView: 'auto',
		spaceBetween: 10,
		freeMode: true,
		loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	}, _defineProperty(_Swiper, "slideToClickedSlide", true), _defineProperty(_Swiper, "lazy", {
		loadPrevNext: true,
		loadPrevNextAmount: 6
	}), _Swiper));
	var prodCardSlider = new Swiper('.sProdCard-slider-js', {
		spaceBetween: 30,
		thumbs: {
			swiper: prodCardThumb
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3
		},
		loop: true
	}); //end luckyone js
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }