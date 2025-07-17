import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

const SELECTORS = {
    section: '.js-animate-section-svg',
    wrap: '.js-animate-svg',
}

const animateSvg = () => {
    const $decorWraps = document.querySelectorAll(SELECTORS.wrap);   
    if (!$decorWraps.length) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    $decorWraps.forEach(($decorWrap, index) => {       
        const $svgArr = $decorWrap.querySelectorAll('svg');
        if (!$svgArr.length) return;
        const $parentSection = $decorWrap.closest(SELECTORS.section);       

        const tl = gsap.timeline({ repeat: -1 });        

        ScrollTrigger.create({
            trigger: $parentSection,
            start: "top bottom",
            end: "bottom top",
            // markers: true,
            onEnter: () => {
                tl.play();
            },
            onEnterBack: () => {
                tl.play();
            },
            onLeave: () => {
                tl.pause();
            },
            onLeaveBack: () => {
                tl.pause();
            },
            animation: tl
        });

        $svgArr.forEach(($svg) => {           

            tl.to($svg,
            {                
                duration: 1,
                onStart: () => {
                    $svg.classList.add('active');                     
                },
                onComplete: () => {
                    $svg.classList.remove('active');                    
                }
            });            
        })
        tl.pause();
        
    })
}

export default animateSvg;