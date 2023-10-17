//wrap more
const buttonMore = document.querySelectorAll('.items-wrap .btn-action-more');
buttonMore.forEach(function (item) {
	item.addEventListener('click', function(e) {
		this.closest('.items-wrap').classList.toggle('show-all')
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
})


//field counter
let fieldCounter = document.getElementsByClassName('frm-field-counter')
let counterTotalText = document.querySelectorAll('[data-counter-text]')

function fieldCounterResult() {
	for (i = 0; i < counterTotalText.length; i++) {
		console.log(counterTotalText.length)
		let counterTotal = counterTotalText[i].dataset.counterText
		for (j = 0; j < fieldCounter.length; j++) {
			if (fieldCounter[j].dataset.counter == counterTotal) {
				let counterValue = fieldCounter[j].querySelector('input').value
				let counterPrice = fieldCounter[j].dataset.price
				let counterResult = counterValue * counterPrice
				counterTotalText[j].textContent = counterResult
			}
		}
	}
}

function fieldCounterButtons(index) {
	return `
        <button class="field-counter-button" data-index="${index}" data-type="plus"></button>
        <button class="field-counter-button" data-index="${index}" data-type="minus"></button>
    `
}
function fieldCounterCreator() {
	for (i = 0; i < fieldCounter.length; i++) {
		fieldCounter[i].insertAdjacentHTML('beforeend', fieldCounterButtons(i))
		fieldCounter[i].onclick = function (event) {
			const type = event.target.dataset.type
			const index = event.target.dataset.index
			if (index) {
				const fieldCounterPlus = fieldCounter[index].children[1]
				const fieldCounterMinus = fieldCounter[index].children[2]
				const fieldCounterInput = fieldCounter[index].children[0]
				if (type === 'plus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) + 1
				} else if (type === 'minus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) - 1
				}
				if (Number(fieldCounterInput.value) > 0) {
					fieldCounterMinus.removeAttribute('disabled')
				} else if (Number(fieldCounterInput.value) < 1) {
					fieldCounterMinus.setAttribute('disabled', true)
				}
				fieldCounterResult();
			}
		}
	}
}

fieldCounterCreator();
fieldCounterResult();


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})

//mobile menu
const menuButton = document.querySelectorAll('.popup-menu-wrap .btn-menu');
for (i = 0;i < menuButton.length;i++) {
	menuButton[i].addEventListener('click', function(e) {
		if (innerWidth < 1024) {
			if (this.parentElement.classList.contains('submenu')) {
				this.parentElement.classList.toggle('open')
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		}
	})
}




$(document).ready(function () {

	if (!!$('.header').offset()) {
		$(window).scroll(function () {
			let windowTop = $(window).scrollTop();
			if (windowTop > 150) {
				$('.wrap').addClass('header-fix');
			} else {
				$('.wrap').removeClass('header-fix');
			}
		});
	}


	//file input 
	$('.js-field-file .js-file-button').on('click', function () {
		$(this).parent().find('input').click();
		return false;
	})
	$('.js-field-file input[type=file]').on('change', function () {
		let fileName = ('' + $(this).val());
		if (fileName == "") {
			fileName = $(this).parent().find('.js-file-button').attr('data-title');
			$(this).parent().removeClass('active').find('.js-file-button').find('.button-title').html(fileName);
		} else {
			$(this).parent().addClass('active').find('.js-file-button').find('.button-title').html(fileName);
		}
	});

	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		if ($(this).parents('.frm-select-toggle').length>0) {
			if ($(this).is(':checked')) {
				$('.popup-outer-box').removeClass('active');
				$('body').addClass('popup-open');
				popupCurrent = $(this).attr('data-popup');
				$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
			}
		} else {
			$('.popup-outer-box').removeClass('active');
			$('body').addClass('popup-open');
			popupCurrent = $(this).attr('data-popup');
			$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
			return false;
		}
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})

	//popup-select-box
	if (!!$('.popup-select-box').offset()) {
		$('.popup-select-box .slider').slick({
			dots: false,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
		});

	}
	
	
	//gallery slider
	if (!!$('.photos-slider-box').offset()) {
		let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: false,
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
						nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
					}
				},
			]
		});
		//pSlider.slick('refresh');
		//pSliderPreview.slick('refresh');
		$('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.photos-slider-box .elm-photo[data-slide="0"]').parent('.sl-wrap').addClass('active');
	}
});