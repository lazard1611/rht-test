import Swiper from "swiper";
import '../../styles/sections/section-preview-collections.scss'

const initSwiper = () => {
    new Swiper("[data-section-preview-collection-swiper]", {
            slidesPerView: 2.8,
            spaceBetween: 30,
            breakpoints: {
                460: {
                    slidesPerView: 3.4,
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                1920: {
                    slidesPerView: 5,
                    spaceBetween: 70,
                }
            }
        }
    )
}

window.addEventListener(("DOMContentLoaded"), () => initSwiper())