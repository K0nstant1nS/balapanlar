import "./index.css";
import { PopupWithCourse } from "../components/PopupWithCourse.js";
import { PopupWithPartner } from "../components/PopupWithPartner.js";
import { PopupWithBurger } from "../components/PopupWithBurger.js";
import { checkScreenWidth } from "../components/headerState.js";
import { Tween } from "../components/tween.js";
import { scrollToAnchor } from "../utils.js/anchorLinkScroll.js";
import { selector } from "gsap";

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

const principlesTweenData = {
	selector: ".principles",
	horizontalShift: -66.66666666,
	triggerSelector: ".principles",
	pinState: true,
	tabletWidth: 769,
	start: "top top",
	end: "bottom"
};

const principlesHeadingTweenData = {
	selector: ".principles__heading",
	horizontalShift: 66.66666666,
	triggerSelector: ".principles",
	pinState: false,
	tabletWidth: 769,
	start: "top top",
	end: "bottom"
};

//Старт моего кода
const horizontalContainerTweenData = {
	selector: ".horizontal-container__content",
	horizontalShift: -(1 - (window.innerWidth - 200)/5725)*100 , //-75.53,
	triggerSelector: ".horizontal-container__content",
	pinState: true,
	tabletWidth: 769,
	start: /*document.querySelector(".principles").getBoundingClientRect().height*/ document.querySelector(".principles").offsetHeight + 50 + " top", //Math.round(document.querySelector(".principles").getBoundingClientRect().height) + "px top",
	end: "2972.5px top" //document.querySelector(".principles").offsetHeight + document.querySelector(".horizontal-container").offsetHeight + " top"
};

console.log(window.innerWidth)





const horizontalContainerTween = new Tween(horizontalContainerTweenData);

horizontalContainerTween.toggleTween();

window.addEventListener("resize", horizontalContainerTween.toggleTween);
//Конец моего кода

const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);

principlesTween.toggleTween();
principlesHeadingTween.toggleTween();

window.addEventListener("resize", principlesTween.toggleTween);
window.addEventListener("resize", principlesHeadingTween.toggleTween);

document
	.querySelectorAll("[data-attribute-anchor]")
	.forEach((link) => scrollToAnchor(link));
