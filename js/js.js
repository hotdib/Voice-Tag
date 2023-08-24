

function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

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