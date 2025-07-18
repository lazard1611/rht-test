import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

const SELECTORS = {
    section: '.js-flicker-section',
    centerSvg: '.js-flicker-center',
    haloSvg: '.js-flicker-halo',
}

const flickerCircle = () => {
    const $sections = document.querySelectorAll(SELECTORS.section);  
    if (!$sections.length) return;

    gsap.registerPlugin(ScrollTrigger);

    $sections.forEach(($section) => {
        const $svgCenter = $section.querySelectorAll(SELECTORS.centerSvg);
        if (!$svgCenter.length) return;
        const $svgHalo = $section.querySelectorAll(SELECTORS.haloSvg);
        if (!$svgHalo.length) return;

        const tl = gsap.timeline({
            repeat: -1,
            pause: true,
            // yoyo: true,
        });

        ScrollTrigger.create({
            trigger: $section,
            start: "top bottom",
            end: "bottom top",
            markers: false,
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

        tl.addLabel('start')
        .to($svgCenter,
            {
                duration: 0.5,
                scale: 1.4,
                transformOrigin: 'center'
            },
            )
        .to($svgHalo,
            {
                duration: 0.6,
                scale: 1.3,
                opacity: 0.4,
                transformOrigin: 'center',
                ease: "power1"
            }, 'start+=0.35'
        )
        .to($svgHalo,
            {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                transformOrigin: 'center',
                ease: "power1"
            }, 'start+=1.2')
        .fromTo($svgCenter,
            {
                scale: 1.3,
                opacity: 0.8,
                transformOrigin: 'center',
            },
            {
                duration: 0.5,
                scale: 1,
                transformOrigin: 'center',
                opacity: 1,
                ease: "power1"
            }, 'start+=1.6')

    })

}

export default flickerCircle;
