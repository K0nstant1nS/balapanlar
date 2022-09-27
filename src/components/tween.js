import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Tween {
	constructor(tweenData) {
		this.data = tweenData;
		let sections = gsap.utils.toArray(tweenData.selector);
		this.tween = gsap.to(sections, {
			xPercent: tweenData.horizontalShift || -100 * (sections.length - 1) - this.data.horizontalShift,
			ease: 'none',
			scrollTrigger: {
				start: tweenData.start,
				trigger: this.data.triggerSelector,
				pin: true,
				scrub: 1,
				snap: 0,
				end: () => '+=' + document.querySelector(this.data.triggerSelector).offsetWidth/4,
				invalidateOnRefresh: true
			},
		});
	}

	toggleTween = () => {
		if (window.innerWidth <= this.data.tabletWidth) {
			this.tween.scrollTrigger.disable();
		} else {
			this.tween.scrollTrigger.enable();
		}
	};
}

export { Tween };
