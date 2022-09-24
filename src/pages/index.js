import "./index.css";
import { PopupWithCourse } from "../components/PopupWithCourse.js";
import { PopupWithPartner } from "../components/PopupWithPartner.js";
import { PopupWithBurger } from "../components/PopupWithBurger.js";
import { checkScreenWidth } from "../components/headerState.js";
import { Tween } from "../components/tween.js";
import { scrollToAnchor } from "../utils.js/anchorLinkScroll.js";
import { PopupHowToFind } from "../components/PopupHowToFind";
import "../components/howToFindMap.js";

const cards = document.querySelectorAll(".course-card");

cards.forEach((card) => {
	if (card.querySelector(".course-card__list")) {
		const courseList = card.querySelector(".course-card__list");
		const items = courseList.querySelectorAll(".course-card__list-item");
		if (items.length > 1) {
			for (let i = 1; i < items.length; i++) {
				items[i].style.display = "none";
			}
		}
	}
});

const popupHeader = new PopupWithBurger(".popup_type_header");

checkScreenWidth(popupHeader);

window.addEventListener("resize", () => checkScreenWidth(popupHeader));

popupHeader.burgerButton.addEventListener(
	"mousedown",
	popupHeader.toggleBurgerMenu
);

const popup = new PopupWithCourse(".popup_type_course");

document.querySelectorAll(".course-card__popup-button").forEach((btn) => {
	btn.addEventListener("mousedown", () => {
		popup.open(btn.closest(".course-card").cloneNode(true).innerHTML);
	});
});

const popupPartner = new PopupWithPartner(".popup_type_partner");

const partners = document.querySelectorAll(".partners__partner-item");
partners.forEach((partner) => {
	partner.addEventListener("click", (evt) => {
		popupPartner.open(partner.cloneNode(true));
	});
});

// Начала скрипта

const howToFind = new PopupHowToFind(".popup_type_how-to-find")

document.querySelector(".button_for_how-to-find").addEventListener("click",function(){
	howToFind.open();
})
// Конец скрипта
const principlesTweenData = {
	selector: ".principles__card",
	horizontalShift: false,
	triggerSelector: ".principles",
	pinState: true,
	tabletWidth: 768,
	start: "80px top",
	end: "right"
};

const principlesHeadingTweenData = {
	selector: ".principles__heading",
	horizontalShift: false,
	triggerSelector: ".principles",
	pinState: false,
	tabletWidth: 768,
	start: "80px top",
	end: "right "
};


const horizontalContainerTweenData = {
	selector: ".horizontal-container__content",
	horizontalShift: -(1 - (document.querySelector(".horizontal-container").clientWidth/5885))*100 - (window.innerWidth - 1000)/200 ,
	triggerSelector: ".horizontal-container__content",
	pinState: true,
	snap: 0,
	tabletWidth: 768,
	start:  "left",
	end: "bottom"
};


const horizontalContainerTween = new Tween(horizontalContainerTweenData);
const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);
const separator = document.querySelector('.animation-separator');

principlesTween.toggleTween();
principlesHeadingTween.toggleTween();
horizontalContainerTween.toggleTween();
resizeSeparator();

window.addEventListener("resize", () => {
	principlesTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});
window.addEventListener("resize", () => {
	principlesHeadingTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});
window.addEventListener("resize", () => {
	horizontalContainerTween.toggleTween;
	resizeSeparator();
	window.location.reload();
});

function resizeSeparator () {
	separator.style.height = parseInt(document.querySelector('.principles').style.width.match(/\d+/))/4 + "px";
};



document
	.querySelectorAll("[data-attribute-anchor]")
	.forEach((link) => scrollToAnchor(link));
// FAQ
const faqQuestion = document.querySelectorAll('.faq-qst__button-area');
let previousQuestion;
faqQuestion.forEach((element) => {element.addEventListener('click', () => { previousQuestion = toggleFaqQuestion(element);});});
function toggleFaqQuestion (element) {
	const answer = element.parentNode.parentNode.querySelector('.faq-qst__answer');
	const icon = element.querySelector('.faq-qst__button');
	if (!answer.classList.contains('faq-qst__answer_opened')) {
		answer.classList.add('faq-qst__answer_opened');
		icon.classList.add('faq-qst__button_opened');
		if (previousQuestion && previousQuestion != element) {
			previousQuestion.parentNode.parentNode.querySelector('.faq-qst__answer').classList.remove('faq-qst__answer_opened');
			previousQuestion.querySelector('.faq-qst__button').classList.remove('faq-qst__button_opened');
		}
	} else {
		answer.classList.remove('faq-qst__answer_opened');
		icon.classList.remove('faq-qst__button_opened');
	}
	return element;
};
