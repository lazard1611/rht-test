import '../../styles/sections/template-cart.scss';

//=====================================================================================================================

const cartContainer = document.querySelector('[data-cart-wrapper]');
const cartCountBlocks = document.querySelectorAll('[data-item-count]');
const cartNoteTextarea = document.querySelector('[data-cart-note-textarea]');

//=====================================================================================================================

const replaceContent = (html) => {
    const cartMainContainer = document.querySelector('[data-cart-main-container]');
    const newContainer = document.createElement('div');
    const parser = new DOMParser();
    const newContent = parser.parseFromString(html, 'text/html');

    newContainer.className = 'cart__wrapper-main-container';
    newContainer.setAttribute('data-cart-main-container', '');
    newContainer.innerHTML = newContent.querySelector('[data-cart-main-container]').innerHTML;
    cartContainer.replaceChild(newContainer, cartMainContainer);
}

//=====================================================================================================================

const rerenderCart = () => {
    fetch('/cart?view=ajax&timestamp=' + Date.now(), {
        credentials: 'same-origin',
        method: 'GET'
    })
    .then((content) => {
        content.text()
        .then((html) => {
            replaceContent(html);
        })
        .then(() => {
            assignProducts();
            setTimeout(() => {
                cartContainer.classList.remove('loading');
            }, 1);
        });
    })
}

//=====================================================================================================================

const debounce = (fn, delay) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    }
}

const sendFetchToCartAPI = (productId, productQuantity, callback) => {
    cartContainer.classList.add('loading');
    cartChange(productId, productQuantity, callback);
}

const newDebounce = debounce(sendFetchToCartAPI, 500);

//=====================================================================================================================

const cartChange = (productId, productQuantity) => {
    const productToChange = {
        'id': productId,
        'quantity': productQuantity
    }

    fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        body: JSON.stringify(productToChange)
    })
    .then((cart) => {
        cart.json()
        .then((content) => {
            for (const cartCountBlock of cartCountBlocks) {
                cartCountBlock.textContent = content['item_count'];
            }

            rerenderCart();
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

//=====================================================================================================================

const assignProducts = () => {
    for (const product of document.querySelectorAll('[data-cart-product]')) {
        const productId = product.getAttribute('data-cart-product');
        const productQuantity = product.querySelector('[data-button-quantity]');
        const productRemoveBtn = product.querySelector('[data-cart-product-remove-btn]');

        if (productQuantity) {
            const productQuantityDecreaseBtn = productQuantity.querySelector('[data-decrease]');
            const productQuantityValue = productQuantity.querySelector('[data-value]');
            const productQuantityIncreaseBtn = productQuantity.querySelector('[data-increase]');

            const decreaseBtnCheck = () => {
                if (+productQuantityValue.textContent <= 1) {
                    productQuantityDecreaseBtn.classList.add('disabled');
                }
                else {
                    productQuantityDecreaseBtn.classList.remove('disabled');
                }
            }

            const increaseBtnCheck = () => {
                if (+productQuantityValue.textContent === +productQuantityValue.getAttribute('data-value')) {
                    productQuantityIncreaseBtn.classList.add('disabled');
                }
                else {
                    productQuantityIncreaseBtn.classList.remove('disabled');
                }
            }

            productQuantityDecreaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (+productQuantityValue.textContent > 1) {
                    productQuantityValue.textContent = +productQuantityValue.textContent - 1;
                    newDebounce(productId, productQuantityValue.textContent);
                }

                decreaseBtnCheck();
                increaseBtnCheck();
            });

            productQuantityIncreaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (+productQuantityValue.textContent < +productQuantityValue.getAttribute('data-value') || +productQuantityValue.getAttribute('data-value') === 0) {
                    productQuantityValue.textContent = +productQuantityValue.textContent + 1;
                    newDebounce(productId, productQuantityValue.textContent);
                }

                decreaseBtnCheck();
                increaseBtnCheck();
            });

            decreaseBtnCheck();
            increaseBtnCheck();
        }

        if (productRemoveBtn) {
            productRemoveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                newDebounce(productId, 0);
            });
        }
    }
}

//=====================================================================================================================

const assignCheckoutBtn = () => {
    const checkoutBtn = document.querySelector('[data-cart-checkout-btn]');

    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        checkoutBtn.classList.add('loading');

        let attributes = {};
        attributes['note'] = cartNoteTextarea.value;

        fetch(window.Shopify.routes.root + 'cart/update.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                attributes: attributes
            })
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            window.location.href = '/checkout';
        })
        .catch((error) => {
            console.log(error);
        });
    });
}

//=====================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
    assignProducts();
    assignCheckoutBtn();

    cartContainer.classList.remove('loading');
});
