//datepicker
new AirDatepicker('#date-input');



//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')

function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('tabs-active')) {
			tabsBlocks[iTab].classList.remove('tabs-active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('tabs-active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('tabs-active')
					}
				}
			}
		}
	}

}

for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].tabs-active')
			tabsNavElements ? tabsNavElements.classList.remove('tabs-active') : false
			e.target.closest('[data-tab]').classList.add('tabs-active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()


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
	


	//side menu
	if (!!$('.js-side-menu').offset()) {
		let stickyTop = $('.js-side-menu').offset().top - 30;
		$(window).scroll(function () {
			let windowTop = $(window).scrollTop();
			let sideBottomMax = $(window).outerHeight() + windowTop - $('.js-side-menu-bottom').position().top + 120;
			let sideBottom = windowTop + $(window).outerHeight() - $('.js-side-menu-bottom').position().top - 60
			$('.js-side-menu').css('bottom', sideBottom)
			if (stickyTop < windowTop) {
				$('.wrap').addClass('side-menu-fixed');
			} else {
				$('.wrap').removeClass('side-menu-fixed');
			}
			if ($('.js-side-menu').outerHeight() < sideBottomMax) {
				$('.wrap').addClass('side-menu-fixed-bottom');
			}  else {
				$('.wrap').removeClass('side-menu-fixed-bottom');
			}
			let idElements = $('.js-side-menu').parents('.page-full').find('[id]')
			idElements.each(function(index) {
				if (($(this).offset().top > $(window).scrollTop()) && (($(this).offset().top - $(window).scrollTop()) < 100)) {
					let curSection = $(this).attr('id');
					$('.js-side-menu .active').removeClass('active');
					$('.js-side-menu').find('[href="#'+curSection+'"]').addClass('active');
					return false;
				}
			})
			
		});
	}
	
	
	
	//article more
	$('.js-text-more-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').parents('.text-more-wrap').find('.text-hidden-wrap').slideUp(200);
		} else {
			$(this).addClass('active').parents('.text-more-wrap').find('.text-hidden-wrap').slideDown(200);
		}
		return false;
	})
	
	
	//sort
	$('.js-popup-sort').on('click', '.js-btn-sort', function() {
		if ($(this).hasClass('active-up')) {
			$(this).removeClass('active-up').addClass('active')
			console.log('a-up')
		} else if ($(this).hasClass('active')) {
			$(this).removeClass('active').addClass('active-up')
			console.log('a')
		} else {
			console.log('else')
			$(this).parents('.menu').find('.active').removeClass('active');
			$(this).parents('.menu').find('.active-up').removeClass('active-up');
			$(this).addClass('active');
		}
		return false;
	})
	
	
	//filter
	$('.js-filter-toggle').on('click', function() {
		$('body').toggleClass('filter-show');
		$(this).toggleClass('filter-show');
		return false;
	})

	//btn tgl
	$('.js-btn-tgl:not(.tgl-one)').on('click', function () {
		$(this).toggleClass('active');
		return false;
	})
	$('.js-btn-tgl.tgl-one').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).parents('.tgl-wrap').find('.js-btn-tgl.active').removeClass('active');
			$(this).addClass('active');
		}
		return false;
	})
	
	//history toggle
	$('.history-box .button-toggle').on('click', function() {
		if ($(this).parents('.history-box').hasClass('active')) {
			$(this).parents('.history-box').removeClass('active').find('.content-inner-wrap').slideUp(200);
		} else {
			$(this).parents('.history-box').addClass('active').find('.content-inner-wrap').slideDown(200);
		}
		return false;
	})

	//content toggle action
	$('input[data-content]').each(function () {
		if ($(this).is(':checked')) {
			let selectContent = $(this).attr('data-content');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		}
	})
	$('input[data-content-check]').each(function () {//or data-content-uncheck
		if ($(this).is(':checked')) {
			let selectContent = $(this).attr('data-content-check');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		} else {
			let selectContent = $(this).attr('data-content-uncheck');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		}
	})
	$('input[data-content], input[data-content-check]').on('click', function () {
		$('.frm-content.active').removeClass('active');
		$('input[data-content]').each(function () {
			if ($(this).is(':checked')) {
				let selectContent = $(this).attr('data-content');
				$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
			}
		})
		$('input[data-content-check]').each(function () {//or data-content-uncheck
			if ($(this).is(':checked')) {
				let selectContent = $(this).attr('data-content-check');
				$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
			} else {
				let selectContent = $(this).attr('data-content-uncheck');
				$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
			}
		})
		if ($(this).is(':checked')) {
			let selectContent = $(this).attr('data-content-check');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		} else {
			let selectContent = $(this).attr('data-content-uncheck');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		}
	})
	$('.btn[data-content]').on('click', function () {
		let dataContent = $(this).attr('data-content');
		$(this).attr('disabled', 'disabled');
		$('.frm-content[data-content="' + dataContent + '"]').slideDown(200);
		return false;
	})

	//animate anchor scroll
	$('.js-anchor-button').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		$(anchor.attr('href')).find('.js-btn-popup-toggle').addClass('active')
	});

	//header
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
				$(this).parent('.frm-select-toggle').addClass('active');
				$('.popup-outer-box').removeClass('active');
				$('body').addClass('popup-open');
				popupCurrent = $(this).attr('data-popup');
				$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
			} else {
				$(this).parent('.frm-select-toggle').removeClass('active');
			}
		} else {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active')
				$('body').removeClass('popup-open');
				$('body').removeClass('popup-contacts-open');
				$('.popup-outer-box').removeClass('active');
				$('.js-popup-open.active').removeClass('active')
			} else {
				$('.js-popup-open.active').removeClass('active')
				$(this).addClass('active')
				$('.popup-outer-box').removeClass('active');
				$('body').addClass('popup-open');
				if ($(this).attr('data-popup') == 'popup-contacts') {
					$('body').addClass('popup-contacts-open');
				}
				popupCurrent = $(this).attr('data-popup');
				$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
			}
			return false;
		}
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('body').removeClass('popup-contacts-open');
		$('.popup-outer-box').removeClass('active');
		$('.js-popup-open.active').removeClass('active')
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-contacts-open');
			$('.js-popup-open.active').removeClass('active')
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

	//tiles-main-slider-box
	if (!!$('.tiles-main-slider-box').offset()) {
		$('.tiles-main-slider-box .slider').slick({
			dots: true,
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
			responsive: [
				{
					breakpoint: 1600,
					settings: {
						prevArrow: false,
						nextArrow: false,
					}
				},
			]
		});

	}
	
	//card select
	function cardSelected() {
		$('.card-box .rows-right-wrap .wrap-select').each(function() {
			if ($(this).hasClass('active-prev')) {
				$(this).slideUp(1000)
			}
			$(this).removeClass('active')
			$(this).removeClass('active-prev')
			$(this).removeClass('active-next')
			if ($(this).find('input').is(':checked')) {
				$(this).addClass('active')
				if ($(this).prev('.wrap-select').length>0) {
					$(this).prev('.wrap-select').addClass('active-prev')
				}
				if ($(this).next('.wrap-select').length>0) {
					$(this).next('.wrap-select').addClass('active-next')
				}
				return false;
			}
		})
		$('.card-box .rows-right-wrap .wrap-select.active, .card-box .rows-right-wrap .wrap-select.active-prev, .card-box .rows-right-wrap .wrap-select.active-next').show(0);
	}
	$('.card-box .rows-right-wrap').on('click', '.wrap-select',function() {
		if ($(this).hasClass('active-prev')) {
			if (!$(this).parent('.items-wrap').hasClass('show-all')) {
				$(this).parent('.items-wrap').find('.active-next').removeClass('active-next').slideUp(200);
			} else {
				$(this).parent('.items-wrap').find('.active-next').removeClass('active-next')
			}
			$(this).parent('.items-wrap').find('.active').removeClass('active')
			$(this).parent('.items-wrap').find('.active-prev').removeClass('active-prev')
			if (!$(this).parent('.items-wrap').hasClass('show-all')) {
				$(this).addClass('active').prev('.wrap-select').addClass('active-prev').slideDown(200);
				$(this).next('.wrap-select').addClass('active-next')
			} else {
				$(this).addClass('active').prev('.wrap-select').addClass('active-prev')
				$(this).next('.wrap-select').addClass('active-next')
			}
		}
		else if ($(this).hasClass('active-next')) {
			if (!$(this).parent('.items-wrap').hasClass('show-all')) {
				$(this).parent('.items-wrap').find('.active-prev').removeClass('active-prev').slideUp(200);
			} else {
				$(this).parent('.items-wrap').find('.active-prev').removeClass('active-prev')
			}
			$(this).parent('.items-wrap').find('.active').removeClass('active')
			$(this).parent('.items-wrap').find('.active-next').removeClass('active-next')
			$(this).addClass('active').prev('.wrap-select').addClass('active-prev')
			if (!$(this).parent('.items-wrap').hasClass('show-all')) {
				$(this).next('.wrap-select').addClass('active-next').slideDown(200)
			} else {
				$(this).next('.wrap-select').addClass('active-next')
			}
		}
		else {
			$(this).parent('.items-wrap').find('.active-prev').removeClass('active-prev')
			$(this).parent('.items-wrap').find('.active-next').removeClass('active-next')
			$(this).parent('.items-wrap').find('.active').removeClass('active')
			$(this).addClass('active')
			$(this).prev('.wrap-select').addClass('active-prev')
			$(this).next('.wrap-select').addClass('active-next')
		}
	})
	$('.card-box .rows-right-wrap .wrap-more-bottom .btn-action-more').on('click', function() {
		$(this).parents('.items-wrap').toggleClass('show-all')
		$(this).parents('.items-wrap').find('.wrap-select').hide(0)
		$(this).parents('.items-wrap').find('.active').show(0)
		$(this).parents('.items-wrap').find('.active-next').show(0)
		$(this).parents('.items-wrap').find('.active-prev').show(0)
		
		return false
	})
	cardSelected()


	//item-tile-catalog
	if (!!$('.item-tile-catalog').offset()) {
		$('.item-tile-catalog .tile-slider').slick({
			dots: true,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						dots: true,
					}
				},
			]
		});

	}
	
	
	//more wrap
	$('.more-wrap .btn').on('click', function() {
		if ($(this).find('[data-show]').length > 0) {
			$(this).parent('.more-wrap').prev('.items-wrap').toggleClass('show-all');
			return false;
		}
	})
	
	
	//field-size enter
	$('.field-size .form-input').bind('keypress', function(e) {
		if (e.keyCode == 13) {
			if ($(this).closest('.frm-field').next('.frm-field').length>0) {
				$(this).parents('.frm-field').next('.frm-field').find('.form-input').focus();
			}
		}
	})
	
	
	
});