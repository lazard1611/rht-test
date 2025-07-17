import '../../styles/sections/section-related-products.scss';
import Swiper from 'swiper';
import { setScrollTrigger } from '../utils/index.js';
import getProductCard from '../snippets/get-product-card.js';

//=====================================================================================================================

const mainWrapper = document.querySelector('[data-related-products-wrapper]');
const resultsContainerElement = document.querySelector('[data-related-products-swiper-wrapper]');
const productId = window.localStorage.getItem('related_product_id');
const productsWithBadgesIds = window.localStorage.getItem('product-ids-with-badge').split(' | ').map((item) => {
    return {
        id: item.split(':')[0], 
        content: item.split(':')[1]
    }
});

//=====================================================================================================================

const fetchProductRecommendations = (productId, checkedList, resultsContainerElement, limit = 4) => {
    fetch(`/recommendations/products.json?product_id=${productId}&limit=${limit}&intent=related`, {mode: 'no-cors'})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        if (!data.products.length) return;

        for (const product of data.products) {
            const additionalContent = checkedList.find((checkItem) => checkItem.id === product.id.toString());
            resultsContainerElement.appendChild(getProductCard(product, additionalContent?.content, 'swiper-slide slide'));
        }

        assignSwiper();
        mainWrapper.classList.remove('loading');
    });
}

//=====================================================================================================================

const assignSwiper = () => {
    new Swiper('[data-related-products-swiper]', {
            slidesPerView: 1.2,
            spaceBetween: 30,
            breakpoints: {
                460: {
                    slidesPerView: 1.4,
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 2.4,
                    spaceBetween: 25
                },
                1200: {
                    slidesPerView: 3.5,
                    spaceBetween: 30
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 35
                }
            }
        }
    );
}

//=====================================================================================================================

window.addEventListener('DOMContentLoaded', () => {
    setScrollTrigger(resultsContainerElement, window.innerWidth < 1200 ? 800 : 1200, () => fetchProductRecommendations(productId, productsWithBadgesIds, resultsContainerElement));
});
