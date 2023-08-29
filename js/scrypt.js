"use strict"

document.addEventListener("DOMContentLoaded", function () {
	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var herobody = document.querySelector('.hero__body');

	burger.addEventListener('click', function (event) {
		burger.classList.toggle('active');
		menu.classList.toggle('active');
		herobody.classList.toggle('active');
		body.classList.toggle('lock');
	});
});

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	var burger = document.querySelector('.menu__icon');
	var menu = document.querySelector('.menu__body');
	var body = document.querySelector('body');
	var herobody = document.querySelector('.hero__body');

	// burger.addEventListener('click', function (event) {
	// 	burger.classList.toggle('active');
	// 	menu.classList.toggle('active');
	// 	herobody.classList.toggle('active');
	// 	body.classList.toggle('lock');
	// });

	if (targetElement.closest('[data-goto]')) {
		burger.classList.contains('active') ?
			burger.classList.remove('active') : null;
		menu.classList.contains('active') ?
			menu.classList.remove('active') : null;
		herobody.classList.contains('active') ?
			herobody.classList.remove('active') : null;
		body.classList.contains('lock') ?
			body.classList.remove('lock') : null;

		const goTo = targetElement.closest('[data-goto]').dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector('.header').offsetHeight;

		if (goToElement) {
			window.scrollTo({
				top: goToElement.offsetTop,
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}
}



function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();


// SPOLLERS
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
}

