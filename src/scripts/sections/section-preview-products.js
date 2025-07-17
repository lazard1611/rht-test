import Swiper from "swiper";
import swiperControllers from "../snippets/swiper-controllers.js";
import '../../styles/sections/section-preview-products.scss'

let swiper

const initSwiper = () => {
    swiper = new Swiper("[data-section-preview-products-swiper]", {
            slidesPerView: 1.2,
            spaceBetween: 30,
            breakpoints: {
                460: {
                    slidesPerView: 1.4,
                    spaceBetween: 25,
                },
                768: {
                    slidesPerView: 2.4,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 4.1,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 4.5,
                    spaceBetween: 35,
                }
            }
        }
    )

    swiperControllers(swiper, "section-preview-products", 4);
}

window.addEventListener(("DOMContentLoaded"), () => {
    initSwiper()
})