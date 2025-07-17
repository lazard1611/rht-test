import Swiper from "swiper"
import {setScrollTrigger} from "../utils/index.js"
import getProductCard from "../snippets/get-product-card.js"
import fade from '../snippets/fade-animation.js';

import '../../styles/sections/template-related-products.scss'

const initSwiper = () => {
    new Swiper("[data-template-related-products-swiper]", {
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
                    slidesPerView: 3.5,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 35,
                }
            }
        }
    )
}

const fetchProductRecommendations = (productId, checkedList, resultsContainerElement, limit = 4) => {
    fetch(`/recommendations/products.json?product_id=${productId}&limit=${limit}&intent=related`, {mode: "no-cors"})
        .then(response => response.json())
        .then(({products}) => {
            if (!products.length) return

            products.forEach(async (product) => {
                const additionalContent = checkedList.find((checkItem) => checkItem.id === product.id.toString())
                await resultsContainerElement.appendChild(getProductCard(product, additionalContent?.content, "swiper-slide slide"))
            })

            initSwiper();
            fade('.js-product-fade');
        })
}

window.addEventListener("DOMContentLoaded", () => {
    const resultsContainerElement = document.querySelector("[data-template-related-products-swiper-wrapper]")
    const productId = JSON.parse(window.localStorage.getItem("product-id"))
    const productIdsWithBadge = window.localStorage.getItem("product-ids-with-badge").split(" | ").map((item) => {
        return {id: item.split(":")[0], content: item.split(":")[1]}
    })

    setScrollTrigger(resultsContainerElement, window.innerWidth < 1200 ? 800 : 1200, () => fetchProductRecommendations(productId, productIdsWithBadge, resultsContainerElement))
})