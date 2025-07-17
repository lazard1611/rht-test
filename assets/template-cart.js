/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/sections/template-cart.scss":
/*!************************************************!*\
  !*** ./src/styles/sections/template-cart.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://allaboutinterior/./src/styles/sections/template-cart.scss?");

/***/ }),

/***/ "./src/scripts/sections/template-cart.js":
/*!***********************************************!*\
  !*** ./src/scripts/sections/template-cart.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_template_cart_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/sections/template-cart.scss */ \"./src/styles/sections/template-cart.scss\");\n\n\n//=====================================================================================================================\n\nconst cartContainer = document.querySelector('[data-cart-wrapper]');\nconst cartCountBlocks = document.querySelectorAll('[data-item-count]');\nconst cartNoteTextarea = document.querySelector('[data-cart-note-textarea]');\n\n//=====================================================================================================================\n\nconst replaceContent = html => {\n  const cartMainContainer = document.querySelector('[data-cart-main-container]');\n  const newContainer = document.createElement('div');\n  const parser = new DOMParser();\n  const newContent = parser.parseFromString(html, 'text/html');\n  newContainer.className = 'cart__wrapper-main-container';\n  newContainer.setAttribute('data-cart-main-container', '');\n  newContainer.innerHTML = newContent.querySelector('[data-cart-main-container]').innerHTML;\n  cartContainer.replaceChild(newContainer, cartMainContainer);\n};\n\n//=====================================================================================================================\n\nconst rerenderCart = () => {\n  fetch('/cart?view=ajax&timestamp=' + Date.now(), {\n    credentials: 'same-origin',\n    method: 'GET'\n  }).then(content => {\n    content.text().then(html => {\n      replaceContent(html);\n    }).then(() => {\n      assignProducts();\n      setTimeout(() => {\n        cartContainer.classList.remove('loading');\n      }, 1);\n    });\n  });\n};\n\n//=====================================================================================================================\n\nconst debounce = (fn, delay) => {\n  let timer;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};\nconst sendFetchToCartAPI = (productId, productQuantity, callback) => {\n  cartContainer.classList.add('loading');\n  cartChange(productId, productQuantity, callback);\n};\nconst newDebounce = debounce(sendFetchToCartAPI, 500);\n\n//=====================================================================================================================\n\nconst cartChange = (productId, productQuantity) => {\n  const productToChange = {\n    'id': productId,\n    'quantity': productQuantity\n  };\n  fetch(window.Shopify.routes.root + 'cart/change.js', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'X-Requested-With': 'XMLHttpRequest'\n    },\n    credentials: 'same-origin',\n    body: JSON.stringify(productToChange)\n  }).then(cart => {\n    cart.json().then(content => {\n      for (const cartCountBlock of cartCountBlocks) {\n        cartCountBlock.textContent = content['item_count'];\n      }\n      rerenderCart();\n    });\n  }).catch(error => {\n    console.log(error);\n  });\n};\n\n//=====================================================================================================================\n\nconst assignProducts = () => {\n  for (const product of document.querySelectorAll('[data-cart-product]')) {\n    const productId = product.getAttribute('data-cart-product');\n    const productQuantity = product.querySelector('[data-button-quantity]');\n    const productRemoveBtn = product.querySelector('[data-cart-product-remove-btn]');\n    if (productQuantity) {\n      const productQuantityDecreaseBtn = productQuantity.querySelector('[data-decrease]');\n      const productQuantityValue = productQuantity.querySelector('[data-value]');\n      const productQuantityIncreaseBtn = productQuantity.querySelector('[data-increase]');\n      const decreaseBtnCheck = () => {\n        if (+productQuantityValue.textContent <= 1) {\n          productQuantityDecreaseBtn.classList.add('disabled');\n        } else {\n          productQuantityDecreaseBtn.classList.remove('disabled');\n        }\n      };\n      const increaseBtnCheck = () => {\n        if (+productQuantityValue.textContent === +productQuantityValue.getAttribute('data-value')) {\n          productQuantityIncreaseBtn.classList.add('disabled');\n        } else {\n          productQuantityIncreaseBtn.classList.remove('disabled');\n        }\n      };\n      productQuantityDecreaseBtn.addEventListener('click', e => {\n        e.preventDefault();\n        e.stopPropagation();\n        if (+productQuantityValue.textContent > 1) {\n          productQuantityValue.textContent = +productQuantityValue.textContent - 1;\n          newDebounce(productId, productQuantityValue.textContent);\n        }\n        decreaseBtnCheck();\n        increaseBtnCheck();\n      });\n      productQuantityIncreaseBtn.addEventListener('click', e => {\n        e.preventDefault();\n        e.stopPropagation();\n        if (+productQuantityValue.textContent < +productQuantityValue.getAttribute('data-value') || +productQuantityValue.getAttribute('data-value') === 0) {\n          productQuantityValue.textContent = +productQuantityValue.textContent + 1;\n          newDebounce(productId, productQuantityValue.textContent);\n        }\n        decreaseBtnCheck();\n        increaseBtnCheck();\n      });\n      decreaseBtnCheck();\n      increaseBtnCheck();\n    }\n    if (productRemoveBtn) {\n      productRemoveBtn.addEventListener('click', e => {\n        e.preventDefault();\n        e.stopPropagation();\n        newDebounce(productId, 0);\n      });\n    }\n  }\n};\n\n//=====================================================================================================================\n\nconst assignCheckoutBtn = () => {\n  const checkoutBtn = document.querySelector('[data-cart-checkout-btn]');\n  checkoutBtn.addEventListener('click', e => {\n    e.preventDefault();\n    e.stopPropagation();\n    checkoutBtn.classList.add('loading');\n    let attributes = {};\n    attributes['note'] = cartNoteTextarea.value;\n    fetch(window.Shopify.routes.root + 'cart/update.js', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        attributes: attributes\n      })\n    }).then(response => response.json()).then(data => {\n      // console.log(data);\n\n      window.location.href = '/checkout';\n    }).catch(error => {\n      console.log(error);\n    });\n  });\n};\n\n//=====================================================================================================================\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  assignProducts();\n  assignCheckoutBtn();\n  cartContainer.classList.remove('loading');\n});\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/sections/template-cart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/sections/template-cart.js");
/******/ 	
/******/ })()
;