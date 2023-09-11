"use strict"
//===animation
AOS.init();
//==========

//======gototopbtn
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
	return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
	if (scrollContainer().scrollTop > showOnPx) {
		backToTopButton.classList.remove("back-to-top_hidden")
	} else {
		backToTopButton.classList.add("back-to-top_hidden")
	}
})
const goToTop = () => {
	document.body.scrollIntoView({
		behavior: "smooth",
	});
};
backToTopButton.addEventListener("click", goToTop)
//=================
//======burger+goto
document.addEventListener("DOMContentLoaded", function () {
	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var wrapper = document.querySelector('.wrapper');
	var webitem = document.querySelector('.web__item');


	burger.addEventListener('click', function (event) {
		burger.classList.toggle('active');
		menu.classList.toggle('active');
		wrapper.classList.toggle('active');
		body.classList.toggle('lock');
	});
	webitem.addEventListener('click', function (event) {
		if (menu.classList.contains('active')) {
			burger.classList.toggle('active');
			menu.classList.toggle('active');
			wrapper.classList.toggle('active');
			body.classList.toggle('lock');
		}
	});
});
document.addEventListener("DOMContentLoaded", function () {
	var web = document.querySelector('.web');
	var questions = document.querySelector('.questions');

	questions.addEventListener('click', function (event) {
		web.classList.toggle('active');
		event.stopPropagation(); // Предотвращаем всплытие события клика
	});

	document.addEventListener('click', function (event) {
		if (web.classList.contains('active')) {
			web.classList.remove('active');
		}
	});

	window.addEventListener('scroll', function () {
		if (web.classList.contains('active')) {
			web.classList.remove('active');
		}
	});
});



//паралакс эффект для фона
let herobg = document.getElementById('hero__bg');
let heroar = document.getElementById('hero__ar');
window.addEventListener('scroll', function () {
	let value = window.scrollY;
	herobg.style.top = value * -0.20 + 'px';
	heroar.style.bottom = value * 0.10 + 50 + 'px';
})
//паралакс эффект для фона
let btnbg = document.getElementById('btnbg');
window.addEventListener('scroll', function () {
	let value = window.scrollY;
	if (value > 80) {
		btnbg.style.background = 'linear-gradient(#1f1f1f, #1c1c1c) padding-box, linear-gradient(51deg, #0958fa 13.86%, #09fa32 93.66%) border-box';
	} else {
		btnbg.style.background = 'linear-gradient(#24330d, #24330d) padding-box, linear-gradient(51deg, #0958fa 13.86%, #09fa32 93.66%) border-box';
	}
});



document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var herobody = document.querySelector('.hero__body');
	var wrapper = document.querySelector('.wrapper');


	if (targetElement.closest('[data-goto]')) {
		burger.classList.contains('active') ?
			burger.classList.remove('active') : null;
		menu.classList.contains('active') ?
			menu.classList.remove('active') : null;
		herobody.classList.contains('active') ?
			herobody.classList.remove('active') : null;
		wrapper.classList.contains('active') ?
			wrapper.classList.remove('active') : null;
		body.classList.contains('lock') ?
			body.classList.remove('lock') : null;

		const goTo = targetElement.closest('[data-goto]').dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector('.header').offsetHeight;

		if (goToElement) {
			window.scrollTo({
				top: goToElement.offsetTop - (headerHeight + 35),
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}
}
//==========

//=====ibg=======
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
//============


//====SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});

	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация спойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function(item){
			return'(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function(item, index, self){
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Обьекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function(item){
				if(item.value === mediaBreakpoint && item.type === mediaType){
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function(){
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});

	}

	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}



	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}


	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}


	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}



	//Slide Toggle
	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}


	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//=======
//======swipermaxwidth======

// // Получаем ссылку на элемент, к которому нужно добавить класс
// const element = document.querySelector('.swiper');

// //Функция для проверки ширины экрана и добавления класса
// function checkScreenWidth() {
// 	if (window.innerWidth < 390) {
// 		element.classList.add('swiper');
// 	} else {
// 		element.classList.remove('swiper');
// 	}
// }

// // Вызываем функцию при загрузке страницы и при изменении размера окна
// checkScreenWidth();
// window.addEventListener('resize', checkScreenWidth);
// //=========================

// //======swiper
// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'

// const swiper = new Swiper('.swiper', {
// 	// Optional parameters
// 	direction: 'horizontal',
// 	// loop: true,
// 	autoHeight: true,
// 	// slidesPerView:2,
// 	// If we need pagination
// 	pagination: {
// 		el: '.swiper-pagination',
// 	},

// 	// Navigation arrows
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},

// 	// And if we need scrollbar
// 	scrollbar: {
// 		el: '.swiper-scrollbar',
// 	},

// 	// breakpoints: {
// 	// 	478: {
// 	// 		slidesPerView: 2,
// 	// 	},
// 	// },
// });
// //===========

// //======paralax
// var scene = document.getElementById('scene');
// var parallaxInstance = new Parallax(scene);
// //=============

