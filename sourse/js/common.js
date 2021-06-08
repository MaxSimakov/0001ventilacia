let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
				// 	document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			document.querySelector("html").style.marginRight = null
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				// console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary d-lg-none  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	 
	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
	});

	let prodSliders = document.querySelectorAll(".sProduction");
	// modal window
	prodSliders.forEach((el)=>{

		const swiperProduction = new Swiper(el.querySelector(' .slider-index'), {
			// Optional parameters
			loop: true,
			watchOverflow: true,
			slidesPerView: 1,
			spaceBetween: 20,
			lazy: {
				loadPrevNext: true,
			},
			// Responsive breakpoints
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			},
			// Navigation arrows
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
		});
	})
		
		const swiperClients = new Swiper('.sClients .slider-index', {
			// Optional parameters
			loop: true,
		watchOverflow: true,
		slidesPerView: 2,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true,
		},
		autoplay: {
			delay: 5000,
		},
		// Responsive breakpoints
		breakpoints: {
			400: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
			1200: {
				slidesPerView: 5,
			},
			1400: {
				slidesPerView: 6,
				spaceBetween: 35,

			},
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sClients .swiper-button-next',
			prevEl: '.sClients .swiper-button-prev',
		},
	});
	const swiperManufacture = new Swiper('.sManufacture .slider-index', {
		// Optional parameters
		loop: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true,
		},
		// Responsive breakpoints
		breakpoints: {
			450: {
				slidesPerView: 1,
				spaceBetween: 40,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 40,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 60,
			},
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sManufacture .swiper-button-next',
			prevEl: '.sManufacture .swiper-button-prev',
		},
	});
	//luckyone js
	let slidersParents = document.querySelectorAll('.sPCsliders--js');
	for (let parent of slidersParents){
		let prodCardThumb = new Swiper(parent.querySelector('.sProdCard-thumb-js'), {
			slidesPerView: 'auto',
			spaceBetween: 5,

			freeMode: true,
			loopFillGroupWithBlank: true,
			slideToClickedSlide: true,
			freeModeMomentum: true,
			slideToClickedSlide: true,

			navigation: {
				nextEl: parent.querySelector('.swiper-next'),
				prevEl: parent.querySelector('.swiper-prev'),
			},

			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 6,
			},

			observer: true,
			observeParents: true,
			on: {
				slideChange: function (swiper) {
					if (swiper.$wrapperEl.attr('data-use-subtitles')) {
						let titlesUid = swiper.$wrapperEl.attr('data-subtitles-uid');
						let titlesUidBlock = '.js_' + titlesUid + '_titles';
						$(titlesUidBlock).hide();
						$(titlesUidBlock).eq((swiper.activeIndex - 1)).show();
					}
				}
			}
		});
		let prodCardSlider = new Swiper(parent.querySelector('.sProdCard-slider-js'), {
			spaceBetween: 30,
			thumbs: {
				swiper: prodCardThumb,
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 3,
			},
			loop: true,

			observer: true,
			observeParents: true,
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		});
	}
	//end luckyone js



	const swiperHeaderBlock = new Swiper('.headerBlock__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		speed: 800,
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		// freeModeMomentum: true,

	});

	$(document).on("click", ".has-child> a", function(e){
		e.preventDefault();
		$(this).next().slideToggle(function(){
			$(this).parent().toggleClass('active')
		})
	})
	$(".sidebar__toggle-menu").click(function(){
		$(this).toggleClass('active').next().slideToggle();
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }