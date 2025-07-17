import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const logoAnimate = () => {
    const SELECTORS = {
        logo: '.js-logo-animate',
        svgEl1: '.js-svg-el-1',
        svgEl2: '.js-svg-el-2',
    }

    const $logos = document.querySelectorAll(SELECTORS.logo);
    if(!$logos) return;

    $logos.forEach(($logo) => {
        const el1 = $logo.querySelector(SELECTORS.svgEl1);
        const el2 = $logo.querySelector(SELECTORS.svgEl2);
        const duration = 0.8;
        const pauseDuration = 0.5;

        const tl = gsap.timeline({
            paused: true,            
            yoyo: false
        })

        ScrollTrigger.create({			
			trigger: document.querySelector('footer'),
			start: '35% bottom',
			end: 'bottom bottom',
			scrub: true,
			markers: false,
			animation: tl,			
		});

        tl.to(
            el1,            
            {
                y: -32,
                ease: 'none',
                duration: duration,                
            }
        )
        .to(
            el2,
            {
                y: 32,
                ease: 'none',
                duration: duration,                
            }
        )        

    })
}

export default logoAnimate;