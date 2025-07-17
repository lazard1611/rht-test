import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { break_points } from '../utils/constants.js';

const SELECTORS = {
    section: '.js-title-section',
    title: '.js-title-fade',
    elements: '.js-title-el',   
    scaleItem: '.js-scale-fade-item',
}

const titleAnimation = (killElements = false) => {    
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let mm = gsap.matchMedia();	

    const $sections = document.querySelectorAll(SELECTORS.section);
    if (!$sections.length) return;

    $sections.forEach(($section) => {        
        const $title = $section.querySelector(SELECTORS.title);        
        const $el = $section.querySelectorAll(SELECTORS.elements);
        const $items = $section.querySelectorAll(SELECTORS.scaleItem);     
        
        let wordTitle = null;

        if ($title) {
            wordTitle = new SplitText($title, { type:"words" });
            wordTitle = wordTitle.words;
        }
        
        let heightHeader = 80;        
    
        const calcHeightHeader = () => {
            const $header = document.querySelector('header');
            if (!$header) return;
            heightHeader = $header.clientHeight;
        }
    
        calcHeightHeader();

        const duration = 0.6;
    
        const setParams = {           
            autoAlpha:0,            
            y: -20,                
            ease:"power1.in",        
        }
    
        if (wordTitle) {
            gsap.set(wordTitle, setParams);
        }
        
        gsap.set($el, setParams);

        if ($items.length) {
            gsap.set($items, {
                autoAlpha:0,
                scale: 0,
            });
        }                     

        const tl = gsap.timeline({
            paused: true,
        })        
    
        const initScrollAnimation = (positionScroll) => {
            ScrollTrigger.create({            
                trigger: $section,
                start: positionScroll,
                end: `bottom ${heightHeader * 2}`,
                invalidateOnRefresh: true,
                markers: false,
                animation: tl,
            }); 
            
            tl.addLabel('start');        
            
            let delay = '0.4'

            if (wordTitle) {
                tl.to(wordTitle, {
                    duration: duration,                    
                    autoAlpha: 1,
                    stagger: 0.15,
                    y: 0,                                        
                    ease: 'power1.out',                
                }, "start");
            } else {
                delay = '0'
            }
            
            if ($items.length) {
                tl.to($items, {
                    duration: duration,
                    stagger: 0.15,
                    autoAlpha: 1,                          
                    scale: 1,            
                    ease: 'power1.out',
                }, `start+=${delay}`)
            }
            
            if ($el.length) {
                tl.to($el, {
                    duration: duration,                    
                    autoAlpha: 1,
                    y: 0, 
                    stagger: 0.3,                                                        
                    ease: 'power1.out',
                }, "start+=0.6")    
            }                           
        }
        
        mm.add(`(min-width: ${break_points.mediaPoint2}px)`, () => {
            const positionScroll = 'top 85%';
            initScrollAnimation(positionScroll);
        });
    
        mm.add(`(max-width: ${break_points.mediaPoint2 - 1}px)`, () => {
            const positionScroll = 'top 97%';
            initScrollAnimation(positionScroll);
        });    
    });    
}

export default titleAnimation;