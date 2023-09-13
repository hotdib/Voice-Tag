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
//======gototopbtn


//======burger+goto
document.addEventListener("DOMContentLoaded", function () {
	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var wrapper = document.querySelector('.wrapper');
	var webitem = document.querySelector('.web__item');


	burger.addEventListener('click', function (event) {
		popupClose(document.getElementById('popup')); // Закрываем попап с id "popup"
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

	document.addEventListener('DOMContentLoaded', function () {
		if (window.innerWidth > 767) { // Проверяем ширину экрана
			let herobn = document.getElementById('hero__bn');
			let value = window.scrollY;
			herobn.style.top = value * -0.08 + 'px'; // Ваш код для установки стиля
		}
	});
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
//паралакс эффект для фона



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
//=====ibg=======



//========Очищаем поля ввода====

// Получаем все кнопки с атрибутом data-textarea-id
const clearButtons = document.querySelectorAll('.form__textarea-btn[data-textarea-id]');

// Добавляем обработчик клика на каждую кнопку
clearButtons.forEach(button => {
	button.addEventListener('click', function () {
		// Получаем ID связанного textarea из атрибута data-textarea-id
		const textareaId = button.getAttribute('data-textarea-id');

		// Находим соответствующий textarea
		const textarea = document.getElementById(textareaId);

		// Очищаем текст в textarea
		textarea.value = '';
	});
});

//========Очищаем поля ввода====

//========Отправка формы====

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if (error === 0) {
			form.classList.add('_sending');

			// Здесь был код для AJAX-запроса, я закомментирую его, так как у вас временное значение response = 1
			// let response = await fetch('', {
			// 	method: 'POST',
			// 	body: formData
			// });

			let response = 1;

			if (response === 1) {
				// Успешно отправлена
				form.reset();
				form.classList.remove('_sending');
				popupClose(document.getElementById('popup')); // Закрываем попап с id "popup"
				popupOpen(document.getElementById('popup2')); // Открываем попап с id "popup2"
				setTimeout(function () {
					popupClose(document.getElementById('popup2')); // Закрываем попап с id "popup" через 2 секунды
				}, 2000);
			} else {
				// Ошибка отправки
				alert('Error, Sorry :(');
				form.classList.remove('_sending');
			}
		} else {
			alert('Please fill out all required fields ^_^');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
		let checkBoxChecked = false;

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox") {
				if (input.checked) {
					checkBoxChecked = true;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}

		if (!checkBoxChecked) {
			error++;
			let index = 0; index < formReq.length; index++
			const input = formReq[index];
			formAddError(input);
		}

		return error;
	}


	function formAddError(input) {
		if (input.getAttribute("type") === "checkbox") {
			const grandParent = input.parentElement.parentElement; // Получаем родителя родителя только для чекбоксов
			grandParent.classList.add('_error'); // Добавляем класс родителю родителя
		} else {
			input.parentElement.classList.add('_error'); // Для других элементов добавляем класс родителю
		}
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		if (input.getAttribute("type") === "checkbox") {
			const grandParent = input.parentElement.parentElement;
			grandParent.classList.remove('_error');
		} else {
			input.parentElement.classList.remove('_error');
		}
		input.classList.remove('_error');
	}


	// Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});

//========Отправка формы====



//========Логика расчёта цены====
// Получаем все радиокнопки и элементы цены
const radioButtons = document.querySelectorAll('.amount__input');
const priceDiscount = document.getElementById('pricediscount');
const priceFull = document.getElementById('pricefull');
const priceCents = document.querySelector('.price__cents');

// Получаем все чекбоксы
const checkboxes = document.querySelectorAll('.which__input');

// Обработчик события для радиокнопок
radioButtons.forEach(radioButton => {
	radioButton.addEventListener('change', updatePrice);
});

// Обработчик события для чекбоксов
checkboxes.forEach(checkbox => {
	checkbox.addEventListener('change', updatePrice);
});

// Функция для обновления цен
function updatePrice() {
	// Получаем выбранное значение радиокнопки
	const selectedValue = document.querySelector('.amount__input:checked').value;

	// Изначальные значения скидки и полной цены
	let discount = 0;
	let fullPrice = 0;

	// Определение скидки и полной цены в зависимости от выбора радиокнопки
	switch (selectedValue) {
		case '1':
			discount = 24;
			fullPrice = 35;
			break;
		case '2':
			discount = 34;
			fullPrice = 45;
			break;
		case '3':
			discount = 44;
			fullPrice = 55;
			break;
		case '4':
			discount = 54;
			fullPrice = 65;
			break;
		default:
			console.error('Недопустимое значение радиокнопки: ' + selectedValue);
	}

	// Подсчет количества выбранных чекбоксов
	const checkedCheckboxes = document.querySelectorAll('.which__input:checked').length;

	// Рассчет дополнительной скидки на основе выбранных чекбоксов
	let additionalDiscount = 0;
	if (checkedCheckboxes >= 2) {
		if (checkedCheckboxes === 2) {
			additionalDiscount = 10;
		} else if (checkedCheckboxes === 3) {
			additionalDiscount = 15;
		} else if (checkedCheckboxes === 4) {
			additionalDiscount = 20;
		}
	}

	// Обновление текста элементов цены и сообщения о выборе чекбоксов
	if (checkedCheckboxes === 0) {
		priceDiscount.textContent = '';
		priceFull.textContent = '';
		priceCents.textContent = 'Please select at least one voice';
		priceCents.style.color = 'red';
		let formReq = document.querySelectorAll('._req');
		let index = 0; index < formReq.length; index++
		const input = formReq[index];
		formAddError(input);

		function formAddError(input) {
			if (input.getAttribute("type") === "checkbox") {
				const grandParent = input.parentElement.parentElement; // Получаем родителя родителя только для чекбоксов
				grandParent.classList.add('_error'); // Добавляем класс родителю родителя
			} else {
				input.parentElement.classList.add('_error'); // Для других элементов добавляем класс родителю
			}
			input.classList.add('_error');
		}

	} else {
		priceDiscount.textContent = '$' + (discount + additionalDiscount);
		priceFull.textContent = '$' + (fullPrice + additionalDiscount);
		priceCents.textContent = '90';
		priceCents.style.color = 'initial';
		let formReq = document.querySelectorAll('._req');
		let index = 0; index < formReq.length; index++
		const input = formReq[index];
		formRemoveError(input);
		function formRemoveError(input) {
			if (input.getAttribute("type") === "checkbox") {
				const grandParent = input.parentElement.parentElement;
				grandParent.classList.remove('_error');
			} else {
				input.parentElement.classList.remove('_error');
			}
			input.classList.remove('_error');
		}
	}
}

// Инициализация цен и сообщения при загрузке страницы
updatePrice();

//========Логика расчёта цены====


//========POPUP====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var herobody = document.querySelector('.hero__body');
	var wrapper = document.querySelector('.wrapper');
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

	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
	}
	curentPopup.classList.add('open');
	curentPopup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	});
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();


document.addEventListener("DOMContentLoaded", function () {
	const closeButton = document.getElementById("popup-close");

	closeButton.addEventListener("click", function () {
		this.style.transform = "rotate(180deg)";
		setTimeout(() => {
			// Здесь вы можете добавить код для закрытия попапа или выполнения других действий
			// Например, закрыть попап: document.querySelector(".popup").style.display = "none";
		}, 500); // Примерно через 500 миллисекунд (0.5 секунды) анимация завершится
	});
});


//========POPUP====




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
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Обьекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
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

