import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

const sectionTicker = () => {
    const SELECTORS = {
        section: '.js-ticker-section',
        lists: '.js-ticker-list',
        items: '.js-ticker-item',
    }

    const ATTRIBUTES = {
        direction: 'data-direction',
        speed: 'data-speed',
    }

    gsap.registerPlugin(ScrollTrigger);

    const $lists = document.querySelectorAll(SELECTORS.lists);
    if (!$lists.length) return;     
    
    $lists.forEach(($list) => {        
        const $listItems = $list.querySelectorAll(SELECTORS.items);
        if (!$listItems.length) return;
        const directionValue = $list.getAttribute(ATTRIBUTES.direction);
        const duration = parseInt($list.getAttribute(ATTRIBUTES.speed));
        const listContent = $list.innerHTML; 
        const speed = duration ? duration : 10;
        let tl;       
        let resizeTimeout;
        const $parentSection = $list.closest(SELECTORS.section);
        
        const initTicker = (sweech = true) => {
            if (!sweech) return;
            tl = gsap.timeline({
                repeat: - 1,
                paused: !sweech
            });

            let listWidth = $list.offsetWidth;
            const listWidthConst = $list.offsetWidth;                  
            const windowWidth = window.innerWidth + listWidthConst;        
    
            const cloneListItems = (list, listItems) => {        
                listItems.forEach((listItem) => {                    
                    let listWidth = list.offsetWidth;
    
                    if (listWidth < windowWidth) {
                        const cloneItem = listItem.cloneNode(true);                      
                        list.appendChild(cloneItem);           
                    }                                             
                })
            };                        
            
            while (listWidth < windowWidth && listWidth != 0) {
                cloneListItems($list, $listItems);                
                listWidth = $list.offsetWidth;                
            }                               
            
            tl.fromTo($list,
                {
                    x: directionValue == 'right' ? -listWidthConst : 0,
                },
                {
                    duration: speed,
                    x: directionValue == 'right' ? 0 : -listWidthConst,
                    ease: "none",
                }
            );     
        }
        
        ScrollTrigger.create({
            trigger: $parentSection,
            start: "top bottom",
            end: "bottom top",
            // markers: true,
            onEnter: () => {
                $list.innerHTML = listContent;
                initTicker();
            },
            onEnterBack: () => {
                $list.innerHTML = listContent;
                initTicker();
            },
            onLeave: () => {
                tl.pause();
            },
            onLeaveBack: () => {
                tl.pause();
            },
            animation: tl
        });

        // const handleResize = () => {
        //     clearTimeout(resizeTimeout);
        //     $list.innerHTML = listContent;
        //     tl.kill();
        //     initTicker(false);
        //
        //     resizeTimeout = setTimeout(function() {
        //         initTicker();
        //     }, 1000);
        // }
        
        // window.addEventListener('resize', handleResize);
    });
};

export default sectionTicker;
