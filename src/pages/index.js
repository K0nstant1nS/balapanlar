import "./index.css";
import { PopupWithCourse } from "../components/PopupWithCourse.js";
import { PopupWithPartner } from "../components/PopupWithPartner.js";
import { PopupWithBurger } from "../components/PopupWithBurger.js";
import { checkScreenWidth } from "../components/headerState.js";
import { Tween } from "../components/tween.js";
import { scrollToAnchor } from "../utils.js/anchorLinkScroll.js";

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
	tabletWidth: 768,
};

const principlesHeadingTweenData = {
	selector: ".principles__heading",
	horizontalShift: 66.66666666,
	triggerSelector: ".principles",
	pinState: false,
	tabletWidth: 768,
};

const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);

principlesTween.toggleTween();
principlesHeadingTween.toggleTween();

window.addEventListener("resize", principlesTween.toggleTween);
window.addEventListener("resize", principlesHeadingTween.toggleTween);

document
	.querySelectorAll("[data-attribute-anchor]")
	.forEach((link) => scrollToAnchor(link));
