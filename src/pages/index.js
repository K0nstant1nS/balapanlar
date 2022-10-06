import './index.css';
import { PopupWithCourse } from '../components/PopupWithCourse.js';
import { PopupWithPartner } from '../components/PopupWithPartner.js';
import { PopupWithBurger } from '../components/PopupWithBurger.js';
import { checkScreenWidth } from '../components/headerState.js';
import { Tween } from '../components/tween.js';
import { scrollToAnchor } from '../components/anchorLinkScroll.js';
import { PopupHowToFind } from '../components/PopupHowToFind';
import '../components/howToFindMap.js';

const popupHeader = new PopupWithBurger('.popup_type_header');

checkScreenWidth(popupHeader);

window.addEventListener('resize', () => checkScreenWidth(popupHeader));

popupHeader.burgerButton.addEventListener(
	'mousedown',
	popupHeader.toggleBurgerMenu
);

const popup = new PopupWithCourse('.popup_type_course');

document.querySelectorAll('.course-card__popup-button').forEach((btn) => {
	btn.addEventListener('mousedown', () => {
		popup.open(btn.closest('.course-card').cloneNode(true).innerHTML);
	});
});

const popupPartner = new PopupWithPartner('.popup_type_partner');

const partners = document.querySelectorAll('.partners__partner-item');
partners.forEach((partner) => {
	partner.addEventListener('click', (evt) => {
		popupPartner.open(partner.cloneNode(true));
	});
});

const howToFind = new PopupHowToFind('.popup_type_how-to-find')

document.querySelector('.button_for_how-to-find').addEventListener('click',function(){
	howToFind.open();
})

const principlesTweenData = {
	selector: ".principles",
	horizontalShift: -66.66666666,
	triggerSelector: ".principles",
	start: "80px top",
	snap: .5,
	pinState: true,
};

const principlesHeadingTweenData = {
	selector: ".principles__heading",
	horizontalShift: 66.66666666,
	triggerSelector: ".principles",
	start: "80px top",
	snap: .5,
	pinState: false,
};

let cardsWidthSum = 0
document.querySelectorAll(".advantages__card").forEach(function(item){
	cardsWidthSum += item.offsetWidth;
})
const advantagesPadding = parseInt(window.getComputedStyle(document.querySelector(".advantages")).paddingLeft)
const advantagesWidth = cardsWidthSum + document.querySelector(".advantages__title").offsetWidth + advantagesPadding + 40*4;
const advantagesTweenData = {
	selector: ".advantages__content",
	horizontalShift: -100 * (1 - window.innerWidth / (advantagesWidth + window.innerWidth/1.5)),
	triggerSelector: ".advantages",
	start: 'center center',
	pinState: true,
};


const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);
const advantagesTween = new Tween(advantagesTweenData);

principlesTween.toggleTween();
principlesHeadingTween.toggleTween();
advantagesTween.toggleTween();

window.addEventListener("resize", principlesTween.toggleTween);
window.addEventListener("resize", principlesHeadingTween.toggleTween);
window.addEventListener("resize", advantagesTween.toggleTween);

window.addEventListener('resize', () => {
	principlesTween.toggleTween;
	window.location.reload();
});
window.addEventListener('resize', () => {
	principlesHeadingTween.toggleTween;
	window.location.reload();
});
window.addEventListener('resize', () => {
	advantagesTween.toggleTween;
	window.location.reload();
});

document
	.querySelectorAll('[data-attribute-anchor]')
	.forEach((link) => scrollToAnchor(link));

const faqQuestionOpened = ()=>document.querySelectorAll('.faq-qst_opened');
const faqQuestions = ()=>document.querySelectorAll('.faq-qst');

function hideFaqTexts(faq){
	const answers = faq.querySelectorAll('.faq-qst__text');
	answers.forEach(element => {
		element.classList.remove('faq-qst__text_show');
	});
}

function closeFaqs() {
	faqQuestionOpened().forEach(faq => {
		faq.classList.toggle('faq-qst_opened');
		const question = faq.querySelector('.faq-qst__question');
		question.classList.remove('faq-qst__question_opened');
		hideFaqTexts(faq);
		faq.style.height = `${parseInt(faq.dataset.qh)}px`;
	});
}

function openFaq(faq) {
	const button = faq.querySelector('.faq-qst__button');
	button.classList.toggle('faq-qst__button_active');
	if(!faq.classList.contains('faq-qst_opened')){
		closeFaqs();
		faq.classList.add('faq-qst_opened');
		const answers = faq.querySelectorAll('.faq-qst__text');
		const question = faq.querySelector('.faq-qst__question');
		question.classList.add('faq-qst__question_opened');
		answers.forEach(element => {
			element.classList.add('faq-qst__text_show');
		});
		faq.style.height = `${parseInt(faq.dataset.qh) + parseInt(faq.dataset.ah)}px`;
	}else{
		closeFaqs();
	}
}

function getHeightsElem(element) {
	const question = element.querySelector('.faq-qst__question');
	const answers = element.querySelectorAll('.faq-qst__text');
	let answersHeight = 0;
	answers.forEach(answ => {
		answersHeight += answ.offsetHeight;
	});
	return {qh: question.offsetHeight, ah: answersHeight};
}

function resizeFaq() {
	faqQuestions().forEach(element => {
		const heights = getHeightsElem(element);
		element.dataset.qh = heights.qh;
		element.dataset.ah = heights.ah;
		button.style.height = `${heights.qh}px`;
		if(!faq.classList.contains('faq-qst_opened')){
			faq.style.height = `${parseInt(faq.dataset.qh) + parseInt(faq.dataset.ah)}px`;
		}else{
			faq.style.height = `${parseInt(faq.dataset.qh)}px`;
		}
	});
}

function initFaq() {
	faqQuestionOpened().forEach(element => {
		const button = element.querySelector('.faq-qst__button');
		const heights = getHeightsElem(element);
		element.dataset.qh = heights.qh;
		element.dataset.ah = heights.ah;
		button.style.height = `${heights.qh}px`;
		button.addEventListener('click', ()=>openFaq(element));
	});
	closeFaqs();
}

initFaq();
window.addEventListener('resize', () => resizeFaq);
