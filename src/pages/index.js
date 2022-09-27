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

// Начала скрипта

const howToFind = new PopupHowToFind('.popup_type_how-to-find')

document.querySelector('.button_for_how-to-find').addEventListener('click',function(){
	howToFind.open();
})
// Конец скрипта
const principlesTweenData = {
	selector: '.principles__card',
	horizontalShift: false,
	triggerSelector: '.principles',
	pinState: true,
	tabletWidth: 768,
	start: '80px top',
	end: 'right'
};

const principlesHeadingTweenData = {
	selector: '.principles__heading',
	horizontalShift: false,
	triggerSelector: '.principles',
	pinState: false,
	tabletWidth: 768,
	start: '80px top',
	end: 'right '
};


const horizontalContainerTweenData = {
	selector: '.horizontal-container__content',
	horizontalShift: -(1 - (document.querySelector('.horizontal-container').clientWidth/5845))*100 - (window.innerWidth - 1000)/200 ,
	triggerSelector: '.horizontal-container__content',
	pinState: true,
	snap: 0,
	tabletWidth: 768,
	start:  'left',
	end: 'bottom'
};


const horizontalContainerTween = new Tween(horizontalContainerTweenData);
const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);
const separator = document.querySelector('.animation-separator');

principlesTween.toggleTween();
principlesHeadingTween.toggleTween();
horizontalContainerTween.toggleTween();
resizeSeparator();

window.addEventListener('resize', () => {
	principlesTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});
window.addEventListener('resize', () => {
	principlesHeadingTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});
window.addEventListener('resize', () => {
	horizontalContainerTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});

function resizeSeparator () {
	separator.style.height = parseInt(document.querySelector('.principles').style.width.match(/\d+/))/4 + 'px';
};



document
	.querySelectorAll('[data-attribute-anchor]')
	.forEach((link) => scrollToAnchor(link));
// FAQ
const faqQuestion = document.querySelectorAll('.faq-qst__question');
let previousQuestion;
faqQuestion.forEach((element) => {element.addEventListener('click', () => { previousQuestion = toggleFaqQuestion(element);});});
function toggleFaqQuestion (element) {
	const answer = element.parentNode.querySelector('.faq-qst__answer');
	const icon = element.querySelector('.faq-qst__icon');
	if (!answer.classList.contains('faq-qst__answer_opened')) {
		answer.classList.add('faq-qst__answer_opened');
		icon.classList.add('faq-qst__icon_opened');
		element.classList.add('faq-qst__question_opened');
		if (previousQuestion && previousQuestion != element) {
			previousQuestion.parentNode.querySelector('.faq-qst__answer').classList.remove('faq-qst__answer_opened');
			previousQuestion.querySelector('.faq-qst__icon').classList.remove('faq-qst__icon_opened');
			previousQuestion.classList.remove('faq-qst__question_opened');
		}
	} else {
		answer.classList.remove('faq-qst__answer_opened');
		icon.classList.remove('faq-qst__icon_opened');
		element.classList.remove('faq-qst__question_opened');
	}
	return element;
};
