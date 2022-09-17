import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Tween {
	constructor(tweenData) {
		this.data = tweenData;
		this.tween = gsap.to(tweenData.selector, {
			onStart: function(){

			},
			onComplete: function(){
			},
			xPercent: tweenData.horizontalShift,
			ease: "none",
			scrollTrigger: {
				trigger: this.data.triggerSelector,
				pin: tweenData.pinState,
				start: tweenData.start, //"top",
				scrub: 1,
				snap: 0,
				end: tweenData.end,
				pinType: "transform",
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
