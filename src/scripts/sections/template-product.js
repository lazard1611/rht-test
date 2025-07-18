import gsap from 'gsap';
import '../../styles/sections/template-product.scss';
import Swiper from "swiper";
import {Pagination, Navigation, EffectFade} from "swiper/modules";
import productAnim from '../snippets/product-animation.js';

import {setButtonQuantityLogic} from "../snippets/qunatity.js"
import {changeElementClassByStatus, changeElementClassByClassContains, changeClassByAttribute} from "../utils/index.js"
import {priceTransform} from "../utils/index.js"

import {break_points} from "../utils/constants.js";
import {buildFormData} from '../functions/buildFormData.js';
import Accordion from '../snippets/accordion.js'; 

let activeVariant;
let activeOptions;
let variants, newInventoryList = [];
let swiper;

let quantityButtonElement;
const colorObj = JSON.parse(window.colorObject);

productAnim();


const initSwiper = () => {
    const swiperContainer = document.querySelector("[data-template-product-swiper]");
    if (!swiperContainer) return;
    const slidesPerViewTablet = parseInt(swiperContainer.dataset.slidesTablet || 2);
    const slidesPerViewDesktop = parseInt(swiperContainer.dataset.slidesDesktop || 1);    
    const slidesIndent = parseInt(swiperContainer.dataset.slidesIndent || 10);          
    
    swiper = new Swiper("[data-template-product-swiper]", {
            modules: [Pagination, Navigation, EffectFade],
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
            },
            breakpoints: {
                768: {
                    slidesPerView: slidesPerViewTablet,
                    spaceBetween: slidesIndent,
                },
                1200: {
                    slidesPerView: slidesPerViewDesktop,
                    spaceBetween: slidesIndent,
                }
            }
        }
    )
}

const handleMediaVariant = (nameColor) => {        
    const currentColorVariant = colorObj.find(item => item.title === nameColor);
    if (!currentColorVariant) return;

    if (typeof swiper !== 'undefined' && swiper.destroy) {
        swiper.destroy(true, true);
        swiper = null;        
    }

    const galleryContainers = document.querySelectorAll('.js-product-media');
    if (!galleryContainers.length) return;    

    galleryContainers.forEach((galleryContainer) => {
        galleryContainer.innerHTML = '';

        for (const imgUrl of currentColorVariant.images) {
            const imgHTML = `
                <img 
                    class="template-product__gallery-image swiper-slide slide js-scale-fade-item"
                    src="${imgUrl}" 
                    alt=""
                    width="auto"
                    height="auto"
                    loading="lazy"
                >
            `;
            galleryContainer.insertAdjacentHTML('beforeend', imgHTML);        
        }
    })        

    gsap.fromTo('.js-scale-fade-item',
        {
            autoAlpha: 0,
            scale: 0.5,
        },
        {
            duration: 0.3,
            stagger: 0.1,
            autoAlpha: 1,                          
            scale: 1,            
            ease: 'power1.out',
    })
    
    setTimeout(() => initSwiper(), 200);
}

const updateBadges = () => {
    const saleBadgeElement = document.querySelector("[data-template-product-sale-badge-sale]")

    if (saleBadgeElement) changeElementClassByStatus(saleBadgeElement, !activeVariant.compare_at_price, "hidden")
}

const onUpdateQuantityButton = (limit = undefined, available) => {
    const decreaseElement = quantityButtonElement.querySelector("[data-decrease]")
    const increaseElement = quantityButtonElement.querySelector("[data-increase]")
    const valueElement = quantityButtonElement.querySelector("[data-value]")

    valueElement.textContent = available ? 1 : 0
    valueElement.setAttribute("data-value", +limit)

    if (limit <= 1) {
        available = false;
    }

    changeElementClassByStatus(decreaseElement, true, "disabled")
    changeElementClassByStatus(increaseElement, !available, "disabled")
}

const onUpdatePrice = () => {
    const productPriceElement = document.querySelector("[data-template-product-price]")
    const productOldPriceElement = document.querySelector("[data-template-product-compered-price]")

    productPriceElement.textContent = priceTransform(activeVariant.price * activeVariant.quantity, true)
    productOldPriceElement.textContent = priceTransform(activeVariant.compare_at_price * activeVariant.quantity, true)

    productOldPriceElement && changeElementClassByStatus(productOldPriceElement, !activeVariant.compare_at_price, "hidden")
}

const setDetailsButtonLogic = () => {
    const detailsButton = document.querySelector("[data-template-product-details-button]")
    const detailsSection = document.querySelector("[data-template-product-details]")

    if (!detailsButton || !detailsSection) return

    detailsButton.addEventListener(("click"), () => detailsSection.scrollIntoView({behavior: "smooth"}))
}

const setSelectOptionsLogic = () => {
    const selectOptionElements = document.querySelectorAll("[data-product-options-select]")

    selectOptionElements.forEach((selectElement) => {
        const optionElements = selectElement.querySelectorAll("[data-product-option]")
        const activeOptionElement = selectElement.querySelector("[data-product-options-select-active]")
        const activeTitleElement = selectElement.querySelector("[data-product-options-select-active-title]")
        const optionGroupPosition = selectElement.getAttribute("data-product-option-position")

        const onChangeActiveOption = (newActiveOptionElement) => {
            const optionValue = newActiveOptionElement.getAttribute("data-product-option")           
            
            activeTitleElement.textContent = newActiveOptionElement.textContent
            optionElements.forEach((option) => option.textContent === newActiveOptionElement.textContent ? changeElementClassByClassContains(option, "active") : changeElementClassByStatus(option, false, "active"))

            onChangeActiveVariant(optionGroupPosition, optionValue, window.localStorage.getItem("inventoryList").split(" | "));
            changeElementClassByClassContains(selectElement, "active");
        }

        optionElements.forEach((option) => option.addEventListener(("click"), () => onChangeActiveOption(option, optionGroupPosition)))

        activeOptionElement.addEventListener(("click"), () => changeElementClassByClassContains(selectElement, "active"))

        window.addEventListener(("click"), (event) => {
            if (selectElement.classList.contains("active") && !selectElement.contains(event.target)) changeElementClassByClassContains(selectElement, "active")
        })
    })
}

const setGroupOptionsLogic = () => {
    const groupOptionElements = document.querySelectorAll("[data-product-option-group]")

    groupOptionElements.forEach((groupOptionElement) => {
        const optionElements = groupOptionElement.querySelectorAll("[data-product-option]")
        const optionGroupPosition = groupOptionElement.getAttribute("data-product-option-position")

        const onChangeActiveOption = (newOptionIndex) => {
            const optionValue = optionElements[newOptionIndex].getAttribute("data-product-option");            
            handleMediaVariant(optionValue);

            optionElements.forEach((option, optionIndex) => changeElementClassByStatus(option, optionIndex === newOptionIndex, "active"))
            onChangeActiveVariant(optionGroupPosition, optionValue, window.localStorage.getItem("inventoryList").split(" | "))
        }

        optionElements.forEach((optionElement, index) => {
            optionElement.addEventListener(("click"), () => onChangeActiveOption(index))
        })
    })
}

const setCartButtonTrigger = () => {
    const addToCartBtn = document.querySelector('[data-template-product-cart-button]');
    const valueElement = quantityButtonElement.querySelector("[data-value]");
    const cartQuantityElements = document.querySelectorAll('[data-item-count]');

    addToCartBtn.addEventListener('click', () => {
        const formData = new FormData();
        const items = [];

        variants.find((variant) => {
            if (variant.public_title === null || variant.public_title.replace(/\s+/g, '') === activeOptions.join('/').replace(/\s+/g, '')) {
                items.push({
                    'id': variant.id,
                    'quantity': +valueElement.innerText
                });
            }
        });

        buildFormData(formData, 'items', items);

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            changeElementClassByStatus(addToCartBtn, true, 'success');
            addToCartBtn.textContent = window.localStorage.getItem('cartButtonSuccessTitle');

            for (const cartQuantityElement of cartQuantityElements) {
                cartQuantityElement.innerHTML = +cartQuantityElement.innerText + +valueElement.innerText;
            }

            variants.find((variant, index) => {
                for (const line_item of data.items) {
                    if (variant.id === line_item.id) {
                        newInventoryList[index] = +window.localStorage.getItem("inventoryList").split(" | ")[index] - +line_item.quantity;
                    }
                }
            });
    
            if (document.querySelectorAll('[data-product-option-group]') && document.querySelectorAll('[data-product-option-group]').length) {
                const firstGroupOptionElement = document.querySelectorAll('[data-product-option-group]')[0];
                const optionElements = firstGroupOptionElement.querySelectorAll('[data-product-option]');
                const optionGroupPosition = firstGroupOptionElement.getAttribute('data-product-option-position');
        
                const optionValue = optionElements[0].getAttribute("data-product-option");
                onChangeActiveVariant(optionGroupPosition, optionValue, window.localStorage.getItem("inventoryList").split(" | "));
            }
    
            setTimeout(() => {
                changeElementClassByStatus(addToCartBtn, false, "success");
                addToCartBtn.textContent = window.localStorage.getItem("cartButtonTitle");
            }, 1000);
        })
        .catch((error) => {
            console.log(error);
        });
    });
}

const onChangeActiveVariant = (optionGroupPosition, newActiveOption) => {
    activeOptions[optionGroupPosition] = newActiveOption.trim()
    let variantAvailableStatus = false;

    variants.find((variant, index) => {
        if (variant.public_title === null || variant.public_title.replace(/\s+/g, '') === activeOptions.join('/').replace(/\s+/g, '')) {
            activeVariant = {...activeVariant, ...variant, quantity: 1}
            variantAvailableStatus = variant.available

            if (newInventoryList[index] <= 0) {
                variantAvailableStatus = false;
            }

            updateBadges()
            onUpdateQuantityButton(newInventoryList[index], variantAvailableStatus)
            return onUpdatePrice()
        }
    })

    changeClassByAttribute("data-template-product-cart-button", !variantAvailableStatus, "disabled", true)
}

const updateInventoryList = () => {    
    newInventoryList = window.localStorage.getItem("inventoryList").split(" | ");

    fetch(window.Shopify.routes.root + 'cart.js', {method: 'GET'})
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);

        variants.find((variant, index) => {
            for (const line_item of data.items) {
                if (variant.id === line_item.id) {
                    newInventoryList[index] = +window.localStorage.getItem("inventoryList").split(" | ")[index] - +line_item.quantity;
                }
            }
        });

        if (document.querySelectorAll('[data-product-option-group]') && document.querySelectorAll('[data-product-option-group]').length) {
            const firstGroupOptionElement = document.querySelectorAll('[data-product-option-group]')[0];
            const optionElements = firstGroupOptionElement.querySelectorAll('[data-product-option]');
            const optionGroupPosition = firstGroupOptionElement.getAttribute('data-product-option-position');
    
            const optionValue = optionElements[0].getAttribute("data-product-option");
            onChangeActiveVariant(optionGroupPosition, optionValue, window.localStorage.getItem("inventoryList").split(" | "));
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    quantityButtonElement = document.querySelector("[data-button-quantity]")

    variants = JSON.parse(window.localStorage.getItem("productVariants"))
    activeVariant = {...JSON.parse(window.localStorage.getItem("activeVariant")), quantity: 1}

    updateInventoryList(window.localStorage.getItem("inventoryList").split(" | "));

    activeOptions = activeVariant.options;

    // if (window.innerWidth <= break_points.mediaPoint0) initSwiper();    

    setDetailsButtonLogic();
    setSelectOptionsLogic(window.localStorage.getItem("inventoryList").split(" | "));
    setGroupOptionsLogic(window.localStorage.getItem("inventoryList").split(" | "));
    setCartButtonTrigger(window.localStorage.getItem("inventoryList").split(" | "));
    setButtonQuantityLogic(quantityButtonElement, (newQuantity) => {
        activeVariant = {...activeVariant, quantity: newQuantity}
        onUpdatePrice()
    })

    // window.addEventListener("resize", () => {
    //     if (window.innerWidth >= break_points.mediaPoint0 && swiper) swiper.destroy()
    //     else if (window.innerWidth <= break_points.mediaPoint0 && swiper?.destroyed || !swiper) initSwiper()
    // });
    // setTimeout(() => initSwiper, 100)
    initSwiper();

    const accordion = Accordion({
        triggers: document.querySelectorAll('.accordion__head'),
        activeStateName: 'accordion__item--active-mod',
    });
});
