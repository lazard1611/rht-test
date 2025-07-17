import '../../styles/sections/template-404.scss';
import gsap from "gsap";

const SELECTORS = {
    vase: '.js-vase',
    crack: '.js-vase-crack',
    splinter: '.js-vase-splinter',
}

const vaseAnimation = () => {
    const $vase = document.querySelector(SELECTORS.vase);
    if (!$vase) return;

    const $crack = $vase.querySelectorAll(SELECTORS.crack);
    if (!$crack.length) return;
    const $splinter = $vase.querySelector(SELECTORS.splinter);
    if (!$splinter) return;

    const svgCrackLength = $crack[0].getTotalLength();
    console.log(svgCrackLength);

    const tl = gsap.timeline({
    });

    tl.addLabel('start')
        .fromTo($crack,
            {
                strokeDasharray: svgCrackLength,
                strokeDashoffset: svgCrackLength,
            },
            {
                strokeDashoffset: 0,
                duration: 1,
                delay: 0.4
            }
            )
        .to($splinter,
            {
                duration: 0.6,
                y: 72,
                ease: "power1"
            }, 'start+=1.4'
        )
        .to($splinter,
            {
                duration: 0.5,
                rotate: 110,
                transformOrigin: 'center',
                ease: "power1"
            }, 'start+=1.6')
        .to($splinter,
            {
                duration: 0.6,
                rotate: 130,
                transformOrigin: 'center',
                ease: "bounce"
            }, 'start+=2')


}

document.addEventListener("DOMContentLoaded", () => {
    vaseAnimation();
});
