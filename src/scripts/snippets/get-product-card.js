import {priceTransform} from "../utils/index.js";

export default (product, badge = undefined, additionalClass) => {
    const productCardElement = document.createElement("a")
    const firstAvailableVariant = product.variants.find((variant) => !!variant);

    productCardElement.href = '/products/' + `${product.handle}`
    productCardElement.className = "js-product-fade product-card " + additionalClass;

    const getBadge = () => {
        if (!badge && !firstAvailableVariant.compare_at_price) return ""

        if (badge) return `<div class="product-card__badge ${badge.toLowerCase().split(' ').join('_')}">${badge}</div>`
        else if (firstAvailableVariant.compare_at_price) return '<div class="product-card__badge sale">Sale</div>'
    }

    productCardElement.innerHTML = `
        ${getBadge()}
        
        <div class="product-card__image-wrapper">
            <img 
                class="product-card__image" src="${product.featured_image}" 
                alt="Product image"
                width="auto" 
                height="auto" 
                loading="lazy"
            />
        </div>
        
        <div class="product-card__info">
            <h3 class="product-card__title">${product.title}</h3>
            <div class="product-card__price-container">
                ${firstAvailableVariant.compare_at_price ? '<div class="product-card__compare-price">' + priceTransform(firstAvailableVariant.compare_at_price, true) + '</div>' : ''}
                <div class="product-card__price">${priceTransform(firstAvailableVariant.price, true)}</div>
            </div>
        </div>
    `

    if (productCardElement) return productCardElement
}