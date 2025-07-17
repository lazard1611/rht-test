import gsap from 'gsap';

const SELECTORS = {
    section: '.js-product-animation',
    scaleItem: '.js-scale-fade-item',
}

const productAnim = () => {    
    const $section = document.querySelector(SELECTORS.section);
    if (!$section) return;

    const $items = $section.querySelectorAll(SELECTORS.scaleItem);  
    if (!$items.length) return;   

    gsap.fromTo($items,
        {
            autoAlpha: 0,
            scale: 0.5,
        },
        {
            duration: 0.4,
            stagger: 0.15,
            autoAlpha: 1,                          
            scale: 1,            
            ease: 'power1.out',
    })    
}

export default productAnim;