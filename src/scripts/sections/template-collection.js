import '../../styles/sections/template-collection.scss';
import 'nouislider/dist/nouislider.css';
import {createStorefrontApiClient} from '@shopify/storefront-api-client';
import noUiSlider from 'nouislider';
import fade from '../snippets/fade-animation.js';

//=====================================================================================================================

const client = createStorefrontApiClient({
    storeDomain: window.Shopify.shop + window.Shopify.routes.root,
    apiVersion: '2024-10',
    publicAccessToken: 'bc90caf0f1b360a92c538e30766ce6ac',
});

//=====================================================================================================================

const filterInputs = [...document.querySelectorAll('[data-filter-input]')];
const filterClearBtn = document.querySelector('[data-filter-clear-button]');
const productsContainer = document.querySelector('[data-collection-products-container]');
const paginationContainer = document.querySelector('[data-collection-pagination]');

//=====================================================================================================================

const toggleLoader = (status) => {
    const productsLoading = document.querySelector('[data-collection-loading]');

    if (status === 'active') {
        productsLoading.classList.remove('active');
        productsContainer.classList.add('active');
    }
    else if (status === 'disabled') {
        productsLoading.classList.add('active');
        productsContainer.classList.remove('active');
    }
}

//=====================================================================================================================

const renderProducts = (products) => {
    if (!products.length) {
        productsContainer.innerHTML = window.no_products_text;
        return;
    }

    let forloopIndex = 0;

    for (const product of products) {
        let remainder = (forloopIndex + 1) % 3;

        const setProductLabel = () => {
            let productLabel = '';

            if (product.metafields.length && product.metafields.some((metafield) => {return metafield?.namespace == 'opk' && metafield?.key == 'product_badge'})) {
                for (const metafield of product.metafields) {
                    if (metafield.namespace == 'opk' && metafield.key == 'product_badge') {
                        productLabel = `<div class="product-card__badge ${metafield.value.toLowerCase().replace(' ', '_')}">${metafield.value}</div>`;
                        break;
                    }
                }
            }
            else if (product.variants.nodes[0].compareAtPrice?.amount) {
                productLabel = `<div class="product-card__badge sale">Sale</div>`;
            }

            return productLabel;
        }

        const setProductPrices = () => {
            if (product.variants.nodes[0].compareAtPrice?.amount) {
                return `
                    <div class="product-card__compare-price">€ ${convertPrice(+product.variants.nodes[0].compareAtPrice.amount)}</div>
                    <div class="product-card__price">€ ${+product.variants.nodes[0].price.amount}</div>
                `;
            } else {
                return `
                    <div class="product-card__price">€ ${+product.variants.nodes[0].price.amount}</div>
                `;
            }
        }

        productsContainer.innerHTML += `
            <div class="product-card js-fade-collection">
                <a href="${`/products/${product.handle}`}" class="product-card__image-wrapper">
                    <img class="product-card__image" src="${product.images.nodes[0] && product.images.nodes[0].url}" alt="${product.title}" width="auto" height="auto" loading="lazy">
                    ${setProductLabel()}
                </a>
                <a href="${`/products/${product.handle}`}" class="product-card__info">
                    <h3 class="product-card__title">${product.title}</h3>
                    <div class="product-card__price-container">
                        ${setProductPrices()}
                    </div>
                </a>
            </div>
        `;

        if (remainder === 0) {
            if (forloopIndex != 0 && forloopIndex != 11) {
                productsContainer.innerHTML += `<div class="horizontal-line"></div>`;
            }
        }

        forloopIndex++;
    }
}

//=====================================================================================================================

const updateFilterClearBtn = () => {
    if (filterInputs.some((filterInput) => {return filterInput.checked})) {
        filterClearBtn.classList.add('active');
    }
    else {
        filterClearBtn.classList.remove('active');
    }
}

//=====================================================================================================================

const assignPagination = () => {
    const paginationSelect = document.querySelector('[data-collection-pagination-select]');
    const paginationPrevBtn = document.querySelector('[data-collection-pagination-prev-btn]');
    const paginationNextBtn = document.querySelector('[data-collection-pagination-next-btn]');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }

    paginationSelect && paginationSelect.addEventListener('change', () => {
        scrollToTop();
        getProducts();
    });

    paginationPrevBtn && paginationPrevBtn.addEventListener('click', () => {
        if (paginationSelect.selectedIndex > 0) {
            paginationSelect.selectedIndex = paginationSelect.selectedIndex - 1;
            scrollToTop();
            getProducts();
        }
    });

    paginationNextBtn && paginationNextBtn.addEventListener('click', () => {
        if (paginationSelect.selectedIndex < paginationSelect.options.length - 1) {
            paginationSelect.selectedIndex = paginationSelect.selectedIndex + 1;
            scrollToTop();
            getProducts();
        } 
    });
}

//=====================================================================================================================

const renderPagination = (cursors) => {
    if (cursors.length <= history.state.variables.first) {
        paginationContainer.classList.remove('active');
        return;
    }

    const filteredCursors = [];
    const itemsPerPage = history.state.variables.first;

    const totalPages = Math.ceil(cursors.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
        const cursorIndex = i * itemsPerPage;
        if (cursorIndex < cursors.length) {
            const cursor = cursors[cursorIndex];
            if (i == 0) {
                filteredCursors.push({ cursor: null, index: 1 });
            }
            else {
                filteredCursors.push({ cursor, index: i + 1 });
            }
        }
    }

    // console.log(cursors);
    // console.log(filteredCursors);

    let activeCursor = new URLSearchParams(window.location.search).get('cursor') || null;
    const potentialActiveIndex = filteredCursors.findIndex(({ cursor }) => cursor === activeCursor);
    const activeIndex = potentialActiveIndex >= 0 ? potentialActiveIndex : 0;

    if (potentialActiveIndex < 0) {
        activeCursor = null;
    }

    paginationContainer.innerHTML = '';

    const assignPrevBtn = () => {
        if (activeIndex > 0) {
            const prevCursor = filteredCursors[activeIndex - 1];
            return (`
                <button class="collection__pagination-btn" data-collection-pagination-prev-btn="${prevCursor.cursor}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <path d="M9 17L1 9L9 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${window.pagination_prev_btn_title}</span>
                </button>
            `);
        }
        return '';
    }

    const assignSelect = () => {
        let options = '';

        for (const filteredCursor of filteredCursors) {
            options += `<option value="${filteredCursor.cursor}" ${activeIndex === (filteredCursor.index - 1) ? 'selected' : ''}>${filteredCursor.index}</option>`;
        }

        return (`
            <div class="collection__pagination-select-wrapper">
                <select class="collection__pagination-select" data-collection-pagination-select>${options}</select>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M0.999999 1L9 9L17 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        `);
    }

    const assignNextBtn = () => {
        if (activeIndex < (filteredCursors.length - 1)) {
            const nextCursor = filteredCursors[activeIndex + 1];
            return (`
                <button class="collection__pagination-btn" data-collection-pagination-next-btn="${nextCursor.cursor}">
                    <span>${window.pagination_next_btn_title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                        <path d="M0.999999 17L9 9L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `);
        }
        return '';
    }

    paginationContainer.innerHTML = `
        <div class="collection__pagination-info">${window.pagination_info_text}</div>
        ${assignPrevBtn()}
        ${assignSelect()}
        ${assignNextBtn()}
    `;

    paginationContainer.classList.add('active');

    assignPagination();
}


//=====================================================================================================================

const setUpPagination = async () => {
    const paginationCursors = [];
    let after = null;

    const getProductsRecursive = async () => {
        const settings = {
            variables: {
                ...history.state.variables,
                first: 250,
                after: after
            }
        }

        const query = (
            `query filterProducts(
                $filters: [ProductFilter!], 
                $handle: String, 
                $sortKey: ProductCollectionSortKeys, 
                $reverse: Boolean, 
                $first: Int, 
                $after: String
            ) {
                collection (handle: $handle) {
                    handle,
                    products (
                        first: $first,
                        filters: $filters,
                        sortKey: $sortKey,
                        reverse: $reverse,
                        after: $after
                    ) {
                        edges {
                            cursor
                        }
                        pageInfo {
                            endCursor,
                            hasNextPage,
                        }
                    }
                }
            }`
        )

        const response = await client.request(query, settings);
        // console.log(response);
        paginationCursors.push(...response.data.collection.products.edges.map(({cursor}) => cursor));

        if (response.data.collection.products.pageInfo.hasNextPage) {
            after = response.data.collection.products.pageInfo.endCursor;
            await getProductsRecursive();
        }
    }

    await getProductsRecursive();
    renderPagination(paginationCursors);
}

//=====================================================================================================================

const getProducts = async (withoutCursors) => {
    let newQuery = '?';
    productsContainer.innerHTML = '';
    paginationContainer.classList.remove('active');
    toggleLoader('disabled');
    fade('.js-fade', true);

    const filters = filterInputs.reduce((acc, {type, name, value, checked}) => {
        if (type === 'checkbox' && !checked) return acc;

        newQuery += `${name}=${value}&`;

        if (name.includes('.p.m.')) {
            const [namespace, key] = name.split('.p.m.')[1].split('.');
            const obj = ({
                productMetafield: {
                    namespace,
                    key,
                    value
                }
            });

            return [...acc, obj];
        } 
        else if (name.includes('v.option')) {
            const [_, key] = name.split('v.option');
            const obj = ({
                variantOption: {
                    name: key.replace('.', ''),
                    value
                }
            });

            return [...acc, obj];
        } 
        else if (name.includes('p.tag')) {
            const obj = ({
                tag: value
            });

            return [...acc, obj];
        } 
        else if (name.includes('p.vendor')) {
            const obj = ({
                productVendor: value,
            });

            return [...acc, obj];
        } 
        else if (name.includes('p.product_type')) {
            const obj = ({
                productType: value,
            });

            return [...acc, obj];
        } 
        else if (name.includes('v.availability')) {            
            if (value == 1) {
                const obj = ({
                    available: true,
                });
    
                return [...acc, obj];
            }
        } 
        else if (name.includes('v.price')) {
            const min = +filterInputs.find(({ name }) => name === 'filter.v.price.gte').value.replace('€', '');
            const max = +filterInputs.find(({ name }) => name === 'filter.v.price.lte').value.replace('€', '');

            const obj = ({
                price: {
                    min,
                    max
                }
            });

            return [...acc, obj];
        }
    }, []);

    let selectedPageCursor = null;
    const paginationSelect = document.querySelector('[data-collection-pagination-select]');
    if (withoutCursors) {
        selectedPageCursor = null;
    } 
    else if (paginationSelect && paginationSelect.value !== 'null') {
        selectedPageCursor = paginationSelect.value;
        newQuery += `cursor=${selectedPageCursor}&`;
    }

    history.pushState({
        variables: {
            filters,
            handle: window.collection_handle,
            first: 12,
            after: selectedPageCursor || null
        }
    }, '', newQuery);

    const query = (
        `query filterProducts(
            $filters: [ProductFilter!],
            $handle: String,
            $first: Int,
            $after: String
        ) @inContext(language: ${window.Shopify.locale.toUpperCase()}) {
            collection (handle: $handle) {
                handle,
                products (
                    first: $first,
                    filters: $filters,
                    after: $after
                ) {
                    nodes {
                        id,
                        onlineStoreUrl,
                        handle,
                        title,
                        availableForSale,
                        variants (first: 1) {
                            nodes {
                                id,
                                price {
                                    amount
                                },
                                compareAtPrice {
                                    amount
                                }
                            }
                        },
                        images (first: 1) {
                            nodes {
                                url
                            }
                        },
                        metafields (identifiers: [
                            {
                                namespace: "opk", 
                                key: "product_badge"
                            }
                        ]) {
                            namespace
                            key
                            value
                        },
                        options (first: 250) {
                            name
                            values
                        }
                    },
                    filters {
                        id,
                        label,
                        type,
                        values {
                            count,
                            id,
                            input,
                            label
                        }
                    },
                    pageInfo {
                        startCursor,
                        endCursor,
                        hasNextPage,
                        hasPreviousPage
                    }
                }
            }
        }`
    );

    const response = await client.request(query, history.state);
    // console.log(response);

    renderProducts(response.data.collection.products.nodes);
    updateFilterClearBtn();
    setUpPagination();
    toggleLoader('active');
    fade('.js-fade-collection');  
}

//=====================================================================================================================

const assignProductsFiltering = () => {
    for (const filterInput of filterInputs) {
        filterInput.addEventListener('change', () => {
            getProducts(true);
        });
    }

    filterClearBtn.addEventListener('click', () => {
        for (const filterInput of filterInputs) {
            filterInput.checked = false;
        }

        getProducts(true);
    });
}

//=====================================================================================================================

const assignfilterPopup = () => {
    const filterPopup = document.querySelector('[data-filter-popup]');
    const filterOpenBtns = document.querySelectorAll('[data-filter-open-btn]');
    const filterCloseBtns = document.querySelectorAll('[data-filter-close-btn]');

    for (const filterOpenBtn of filterOpenBtns) {
        filterOpenBtn.addEventListener('click', () => {
            filterPopup.classList.add('active');
            document.body.classList.add('scroll-hidden');
        });
    }

    for (const filterCloseBtn of filterCloseBtns) {
        filterCloseBtn.addEventListener('click', () => {
            filterPopup.classList.remove('active');
            document.body.classList.remove('scroll-hidden');
        });
    }
}

//=====================================================================================================================

const assignFilterItems = () => {
    const filterItems = document.querySelectorAll('[data-filter-item]');

    for (const filterItem of filterItems) {
        const filterItemHead = filterItem.querySelector('[data-filter-item-head]');
        const filterItemPopup = filterItem.querySelector('[data-filter-item-popup]');

        filterItemHead.addEventListener('click', () => {
            if (window.innerWidth >= 1200) {
                for (const fItem of filterItems) {
                    if (filterItem != fItem) {
                        const fItemHead = fItem.querySelector('[data-filter-item-head]');
                        const fItemPopup = fItem.querySelector('[data-filter-item-popup]');
    
                        fItemHead.classList.remove('active');
                        fItemPopup.classList.remove('active');
                    }
                }
            }

            filterItemHead.classList.toggle('active');

            if (window.innerWidth < 1200) {
                if (filterItemPopup.style['max-height'] == '0px') {
                    filterItemPopup.style['max-height'] = filterItemPopup.scrollHeight + 'px';
                } 
                else {
                    filterItemPopup.style['max-height'] = '0px';
                }
            }
            else {
                filterItemPopup.classList.toggle('active');
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (!e.target.closest('[data-filter-item-head]') && !e.target.closest('[data-filter-item-popup]')) {
            for (const filterItem of filterItems) {
                const filterItemHead = filterItem.querySelector('[data-filter-item-head]');
                const filterItemPopup = filterItem.querySelector('[data-filter-item-popup]');
    
                filterItemHead.classList.remove('active');
                filterItemPopup.classList.remove('active');
            }
        }
    });
}

//=====================================================================================================================

const assignPriceRange = () => {
    const priceRangeSlider = document.getElementById('price_range_slider');
    const filterPricesMin = document.querySelector('[data-filter-prices-min]');
    const filterPricesMax = document.querySelector('[data-filter-prices-max]');

    noUiSlider.create(priceRangeSlider, {
        connect: true,
        start: [0, window.max_price_product],
        range: {
            'min': [0],
            'max': [window.max_price_product]
        }
    });

    const debounce = (fn, delay) => {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        }
    }

    const newDebounce = debounce((arg) => getProducts(arg), 500);

    priceRangeSlider.noUiSlider.on('update', (values) => {
        filterPricesMin.value = '€' + (+values[0]).toFixed(0);
        filterPricesMax.value = '€' + (+values[1]).toFixed(0);
        newDebounce(true);
    });
}

//=====================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
    assignProductsFiltering();
    assignfilterPopup();
    assignFilterItems();
    assignPriceRange();
    // getProducts(true);
});
