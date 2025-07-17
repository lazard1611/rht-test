import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { break_points } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

const SELECTORS = {
	section: '.js-fade-section',	
}

const fade = (item = '.js-fade', killElements = false) => {
	let mm = gsap.matchMedia();	
	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;
	ScrollTrigger.refresh();

	$sections.forEach(($section) => {
		const $fadeEl = $section.querySelectorAll(item);
		if (!$fadeEl.length) return;	
	
		gsap.set($fadeEl, {
			y: -20,
			opacity: 0,
		});

		const initScrollAnimation = (positionScroll) => {
			ScrollTrigger.batch($fadeEl, {
				start: positionScroll,
				once: true,
				invalidateOnRefresh: true,			
				onEnter: (batch) =>
					gsap.to(batch, {
						duration: 0.6,
						opacity: 1,
						y: 0,
						stagger: 0.2,
						ease: 'none',
						onComplete: () => {     
							if (killElements) {							

								batch.forEach(el => {							
									gsap.set(el, { clearProps: "all" });
								});
							}                
						}
					})													
			});	
		}  
	
		mm.add(`(min-width: ${break_points.mediaPoint2}px)`, () => {
			const positionScroll = 'top 85%';
			initScrollAnimation(positionScroll);
		});
	
		mm.add(`(max-width: ${break_points.mediaPoint2 - 1}px)`, () => {
			const positionScroll = 'top 97%';
			initScrollAnimation(positionScroll);
		});
	
	})
};

export const refreshTrigger = () => {	
	ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	fade();
}

export default fade;
