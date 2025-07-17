import '../../styles/sections/section-slider-with-previw.scss';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade} from 'swiper/modules';


const SELECTORS = {
    section: '.js-section-slider-previw',
    mainSlider: '.js-slider-previw-main',       
    thimbSlider: '.js-slider-previw-thimb',       
    mainImg: '.js-slider-previw-main-img',       
    mainSlideNext: '.swiper-slide-next',
    mainSlidePrev: '.swiper-slide-prev',          
    fractionSlider: '.js-slider-previw-fraction',       
    nextBtn: '.js-slider-previw-btn-next',
    prevBtn: '.js-slider-previw-btn-prev',           
    previwWrap: '.js-slider-previw-thimb', 
}   

const CLASSNAME = {
    img: 'slider_previw__thimb_img',    
}

const sliderPreviw = () => {   
    const $sections = document.querySelectorAll(SELECTORS.section);
    if (!$sections.length) return;

    $sections.forEach(($section) => {
        const $mainSlider = $section.querySelector(SELECTORS.mainSlider);  
        if (!$mainSlider) return;  
        const $thimbSlider = $section.querySelector(SELECTORS.thimbSlider);  
        if (!$thimbSlider) return;                 
            
        let swiperThimb = new Swiper($thimbSlider, {
            modules: [EffectFade],
            loop: true,
            slideToClickedSlide: true,                     
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            } 
        })

        let swiperMain = new Swiper($mainSlider, {
            modules: [Navigation, Pagination, EffectFade],
            loop: true,                   
            effect: 'fade',                       

            fadeEffect: {
                crossFade: true
            }, 
            
            navigation: {
                nextEl: SELECTORS.nextBtn,
                prevEl: SELECTORS.prevBtn,
            },
    
            pagination: {
                el: SELECTORS.fractionSlider,
                clickable: true,
                type: "fraction",
            },
        });      
    
        const handlerSlideNext = () => {  
            if (swiperMain.realIndex == swiperMain.slides.length - 1) {
                swiperThimb.slideTo(0);
            } else {               
                swiperThimb.slideTo(swiperMain.realIndex + 1);
            }
        }
        
        const handlerSlidePrev = () => {
            if (swiperMain.realIndex == 0) {
                swiperThimb.slideTo(swiperMain.realIndex + 1);
            } else {
                swiperThimb.slideTo(swiperMain.realIndex - 1);
            }
        }

        setTimeout(() => {
            handlerSlideNext();  
        }, 100);    
        
        swiperMain.on("slideNextTransitionStart", () => handlerSlideNext());  
        swiperMain.on("slidePrevTransitionStart", () => handlerSlidePrev());     
    })         
}

document.addEventListener("DOMContentLoaded", () => { 
    sliderPreviw();   
});