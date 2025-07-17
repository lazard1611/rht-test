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

/***/ "./src/styles/sections/header.scss":
/*!*****************************************!*\
  !*** ./src/styles/sections/header.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://allaboutinterior/./src/styles/sections/header.scss?");

/***/ }),

/***/ "./src/scripts/sections/header.js":
/*!****************************************!*\
  !*** ./src/scripts/sections/header.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_header_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/sections/header.scss */ \"./src/styles/sections/header.scss\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ \"./src/scripts/utils/index.js\");\n/* harmony import */ var _snippets_drop_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../snippets/drop-menu.js */ \"./src/scripts/snippets/drop-menu.js\");\n\n\n\nconst header = () => {\n  const SELECTORS = {\n    header: '.js-header',\n    menuTrigger: '.js-header-trigger',\n    languageList: '.js-language-list'\n  };\n  const CLASSNAMES = {\n    bodyOpenMenuState: 'body--open_menu_state',\n    headerScrollState: 'header--scroll_state',\n    bodyScrollPos: 'header--pos_state'\n  };\n  const $body = document.body;\n  const $header = document.querySelector(SELECTORS.header);\n  const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);\n  let isMenuOpen = false;\n  let prevScrollPos = window.scrollY;\n  const headerHeight = $header.clientHeight;\n  const handleTriggerClick = () => {\n    if (!isMenuOpen) {\n      $body.classList.add(CLASSNAMES.bodyOpenMenuState);\n      isMenuOpen = true;\n    } else {\n      $body.classList.remove(CLASSNAMES.bodyOpenMenuState);\n      isMenuOpen = false;\n    }\n  };\n  const headerScroll = scrollY => {\n    if (scrollY > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {\n      $header.classList.add(CLASSNAMES.headerScrollState);\n    } else if (scrollY <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {\n      $header.classList.remove(CLASSNAMES.headerScrollState);\n    }\n    if (prevScrollPos < window.scrollY && scrollY > headerHeight) {\n      $header.classList.add(CLASSNAMES.bodyScrollPos);\n    } else {\n      $header.classList.remove(CLASSNAMES.bodyScrollPos);\n    }\n    prevScrollPos = window.scrollY;\n  };\n  const initializeEventListeners = () => {\n    if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.exist)($menuTriggers)) return;\n    $menuTriggers.forEach($trigger => {\n      $trigger.addEventListener('click', () => {\n        handleTriggerClick();\n      });\n    });\n  };\n  if (!$header) return;\n  (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.onWindowScroll)(headerScroll);\n  initializeEventListeners();\n  const changeLanguage = () => {\n    const $langLists = $header.querySelectorAll(SELECTORS.languageList);\n    if (!$langLists.length) return;\n    const goToUrl = value => {\n      const nlPath = window.nlPath;\n      const enPath = window.enPath;\n      const langCode = value.toLowerCase();\n      if (langCode == 'nl') {\n        window.location.href = nlPath;\n      } else {\n        window.location.href = enPath;\n      }\n    };\n    $langLists.forEach($langList => {\n      const $langItems = $langList.querySelectorAll('input[type=\"radio\"]');\n      if (!$langItems.length) return;\n      $langItems.forEach($langItem => {\n        $langItem.addEventListener('click', () => {\n          if ($langItem.checked) {\n            goToUrl($langItem.value);\n          }\n        });\n        if ($langItem.checked) {\n          // goToUrl($langItem.value);\n        }\n      });\n    });\n  };\n  changeLanguage();\n};\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  header();\n  (0,_snippets_drop_menu_js__WEBPACK_IMPORTED_MODULE_2__.drop)();\n});\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/sections/header.js?");

/***/ }),

/***/ "./src/scripts/snippets/drop-menu.js":
/*!*******************************************!*\
  !*** ./src/scripts/snippets/drop-menu.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drop: function() { return /* binding */ drop; }\n/* harmony export */ });\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants.js */ \"./src/scripts/utils/constants.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ \"./src/scripts/utils/index.js\");\n\n\nconst drop = () => {\n  const SELECTORS = {\n    drop: '.js-drop-menu'\n  };\n  let isClick = false;\n  const handleStyleBody = dropBody => {\n    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.onWindowResize)(() => {\n      if (_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.break_points.mediaPoint0 > window.innerWidth) {\n        dropBody.style.maxHeight = dropBody.scrollHeight + 'px';\n      }\n    });\n  };\n  const handleRemoveActiveState = dropBody => {\n    const $drops = document.querySelectorAll(SELECTORS.drop);\n    if (!$drops.length) return;\n    $drops.forEach($drop => {\n      $drop.classList.remove('active');\n      const $spoilerBody = $drop.children[$drop.children.length - 1];\n      $spoilerBody.style.maxHeight = null;\n    });\n  };\n  const handleActiveState = e => {\n    const targetEl = e.target;\n    const $drop = targetEl.closest(SELECTORS.drop);\n    if (!$drop) {\n      handleRemoveActiveState();\n      isClick = false;\n      return;\n    }\n    const $spoilerBody = $drop.children[$drop.children.length - 1];\n    const $spoilerHead = $drop.children[0];\n    handleRemoveActiveState();\n    if (!isClick) {\n      $drop.classList.add('active');\n      handleStyleBody($spoilerBody);\n      isClick = true;\n    } else {\n      handleRemoveActiveState();\n      $spoilerBody.style.maxHeight = null;\n      isClick = false;\n    }\n  };\n  window.addEventListener('click', handleActiveState);\n};\n\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/snippets/drop-menu.js?");

/***/ }),

/***/ "./src/scripts/utils/constants.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/constants.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   break_points: function() { return /* binding */ break_points; }\n/* harmony export */ });\nconst break_points = {\n  mediaPoint0: 1200,\n  mediaPoint1: 1024,\n  mediaPoint2: 768,\n  mediaPoint3: 480,\n  mediaPoint4: 375\n};\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/utils/constants.js?");

/***/ }),

/***/ "./src/scripts/utils/index.js":
/*!************************************!*\
  !*** ./src/scripts/utils/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   changeClassByAttribute: function() { return /* binding */ changeClassByAttribute; },\n/* harmony export */   changeClassByAttributeContains: function() { return /* binding */ changeClassByAttributeContains; },\n/* harmony export */   changeElementAttributeByContains: function() { return /* binding */ changeElementAttributeByContains; },\n/* harmony export */   changeElementAttributeByStatus: function() { return /* binding */ changeElementAttributeByStatus; },\n/* harmony export */   changeElementClassByClassContains: function() { return /* binding */ changeElementClassByClassContains; },\n/* harmony export */   changeElementClassByStatus: function() { return /* binding */ changeElementClassByStatus; },\n/* harmony export */   debounce: function() { return /* binding */ debounce; },\n/* harmony export */   debounceImmediate: function() { return /* binding */ debounceImmediate; },\n/* harmony export */   detectUsersOS: function() { return /* binding */ detectUsersOS; },\n/* harmony export */   documentReady: function() { return /* binding */ documentReady; },\n/* harmony export */   exist: function() { return /* binding */ exist; },\n/* harmony export */   getDiscountPercent: function() { return /* binding */ getDiscountPercent; },\n/* harmony export */   getGeneratedKey: function() { return /* binding */ getGeneratedKey; },\n/* harmony export */   getObjectOfElements: function() { return /* binding */ getObjectOfElements; },\n/* harmony export */   getRandom: function() { return /* binding */ getRandom; },\n/* harmony export */   getRandomInt: function() { return /* binding */ getRandomInt; },\n/* harmony export */   getWindowSize: function() { return /* binding */ getWindowSize; },\n/* harmony export */   isElementContainsClass: function() { return /* binding */ isElementContainsClass; },\n/* harmony export */   isFunction: function() { return /* binding */ isFunction; },\n/* harmony export */   isTouchDevice: function() { return /* binding */ isTouchDevice; },\n/* harmony export */   onWindowChangeOrientation: function() { return /* binding */ onWindowChangeOrientation; },\n/* harmony export */   onWindowResize: function() { return /* binding */ onWindowResize; },\n/* harmony export */   onWindowScroll: function() { return /* binding */ onWindowScroll; },\n/* harmony export */   page: function() { return /* binding */ page; },\n/* harmony export */   pageLoad: function() { return /* binding */ pageLoad; },\n/* harmony export */   priceTransform: function() { return /* binding */ priceTransform; },\n/* harmony export */   setScrollTrigger: function() { return /* binding */ setScrollTrigger; }\n/* harmony export */ });\nconst exist = elementOrArray => {\n  if (!elementOrArray && elementOrArray !== 0) return false;\n  if (elementOrArray.length === 0) {\n    return false;\n  }\n  return true;\n};\nfunction debounce(delay, fn) {\n  let timerId;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n    if (timerId) {\n      clearTimeout(timerId);\n    }\n    timerId = setTimeout(() => {\n      fn(...args);\n      timerId = null;\n    }, delay);\n  };\n}\nfunction debounceImmediate(delay, fn) {\n  let fired = false;\n  return function () {\n    if (!fired) {\n      fn(...arguments);\n      fired = true;\n      setTimeout(() => {\n        fired = false;\n      }, delay);\n    }\n  };\n}\nconst isTouchDevice = () => {\n  return 'ontouchstart' in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;\n};\nconst getRandomInt = (min, max) => {\n  return Math.floor(Math.random() * (max - min)) + min;\n};\nconst getRandom = (min, max) => {\n  return Math.random() * (max - min) + min;\n};\nconst getGeneratedKey = () => \"10000000-1000-4000-8000-100000000000\".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));\nfunction isFunction(func) {\n  return func instanceof Function;\n}\nfunction getWindowSize() {\n  const windowWidth = window.innerWidth;\n  const windowHeight = window.innerHeight;\n  return {\n    windowWidth,\n    windowHeight\n  };\n}\nconst onWindowResize = cb => {\n  if (!cb && !isFunction(cb)) return;\n  const handleResize = () => {\n    cb();\n  };\n  window.addEventListener('resize', debounce(15, handleResize));\n  handleResize();\n};\nconst detectUsersOS = () => {\n  if (window.navigator.userAgent.indexOf('Win') !== -1) return 'Windows OS';\n  if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Macintosh';\n  if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux OS';\n  if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android OS';\n  if (window.navigator.userAgent.indexOf('like Mac') !== -1) return 'iOS';\n  return null;\n};\nconst onWindowChangeOrientation = cb => {\n  if (!cb && !isFunction(cb) || !isTouchDevice()) return;\n  let {\n    windowWidth\n  } = getWindowSize();\n  const handleResize = () => {\n    const {\n      windowWidth: newWindowWidth\n    } = getWindowSize();\n    if (windowWidth !== newWindowWidth) cb();\n    windowWidth = newWindowWidth;\n  };\n  window.addEventListener('resize', debounce(100, handleResize));\n};\nconst onWindowScroll = cb => {\n  if (!cb && !isFunction(cb)) return;\n  const handleScroll = () => {\n    cb(window.pageYOffset);\n  };\n  window.addEventListener('scroll', debounce(15, handleScroll));\n  handleScroll();\n};\nconst documentReady = cb => {\n  if (!cb && !isFunction(cb)) return;\n  document.addEventListener('DOMContentLoaded', cb);\n};\nconst pageLoad = cb => {\n  if (!cb && !isFunction(cb)) return;\n  window.addEventListener('load', () => {\n    window.loaded = true;\n    cb();\n    window.onWindowLoadCallbacks?.forEach(cbLocal => {\n      if (!cbLocal && !isFunction(cbLocal)) return;\n      cbLocal();\n    });\n    window.onWindowLoadCallbacks = [];\n  });\n};\nconst page = cb => {\n  return cb;\n  // if (!cb && !isFunction(cb)) return;\n\n  // if (window.loaded) {\n  // \tcb();\n  // } else {\n  // \tif (!window.onWindowLoadCallbacks) window.onWindowLoadCallbacks = [];\n  // \twindow.onWindowLoadCallbacks.push(cb);\n  // }\n};\nconst getObjectOfElements = function (objectOfSelectors) {\n  let byParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  let fountByElement = document;\n  let parentKey;\n  const getResult = key => {\n    const result = document.querySelectorAll(objectOfSelectors[key]);\n    return result.length > 1 ? result : result[0];\n  };\n  if (byParent && Object.values(objectOfSelectors)[0]) {\n    fountByElement = document.querySelector(Object.values(objectOfSelectors)[0]);\n    parentKey = Object.keys(objectOfSelectors)[0];\n    Object.values(objectOfSelectors)[0] = fountByElement;\n  }\n  Object.keys(objectOfSelectors).forEach(key => {\n    if (key === parentKey) objectOfSelectors[key] = getResult(key);else objectOfSelectors[key] = getResult(key);\n  });\n  return objectOfSelectors;\n};\nconst isElementContainsClass = function (element, searchClass) {\n  let callbackBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;\n  let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;\n  if (!element) return console.log(element, \"isElementContainsClass, error)\");\n  if (element.classList.contains(searchClass) === callbackBy && typeof callback === \"function\") callback();\n  return element.classList.contains(searchClass);\n};\nconst changeElementClassByStatus = function (element, status, useClass) {\n  let callbackBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;\n  let callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;\n  if (!element) return console.log(element, \"changeElementClassByStatus, element's use class is \" + useClass);\n  if (status) element.classList.add(useClass);else element.classList.remove(useClass);\n  if (status === callbackBy && typeof callback === \"function\") callback();\n};\nconst changeElementClassByClassContains = function (element, useClass) {\n  let callbackBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;\n  let callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;\n  if (!element) return console.log(element, \"changeElementClassByClassContains, element's use class is \" + useClass);\n  if (isElementContainsClass(element, useClass, callbackBy, callback)) element.classList.remove(useClass);else element.classList.add(useClass);\n};\nconst changeClassByAttribute = function (attribute, status, useClass) {\n  let byArrayMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n  if (byArrayMode) {\n    const elements = document.querySelectorAll(`[${attribute}]`);\n    elements.forEach(element => {\n      if (!element) return console.log(element, \"changeClassByAttributeContains, element's attribute \" + attribute);\n      if (status) element.classList.add(useClass);else element.classList.remove(useClass);\n    });\n  } else {\n    const element = document.querySelector(`[${attribute}]`);\n    if (!element) return console.log(element, \"changeClassByAttributeContains, element's attribute \" + attribute);\n    if (status) {\n      element.classList.add(useClass);\n      callback();\n    } else element.classList.remove(useClass);\n  }\n};\nconst changeClassByAttributeContains = function (attribute, useClass) {\n  let byArrayMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  if (byArrayMode) {\n    const elements = document.querySelectorAll(`[${attribute}]`);\n    elements.forEach(element => {\n      if (!element) return console.log(element, \"changeClassByAttributeContains, element's attribute \" + attribute);\n      if (element.classList.contains(\"active\")) element.classList.remove(useClass);else element.classList.add(useClass);\n    });\n  } else {\n    const element = document.querySelector(`[${attribute}]`);\n    if (!element) return console.log(element, \"changeClassByAttributeContains, element's attribute \" + attribute);\n    if (element.classList.contains(\"active\")) element.classList.remove(useClass);else element.classList.add(useClass);\n  }\n};\nconst changeElementAttributeByStatus = function (element, status, attribute) {\n  let attributeValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : \"\";\n  if (status) element.setAttribute(attribute, attributeValue);else element.removeAttribute(attribute);\n};\nconst changeElementAttributeByContains = function (element, attribute) {\n  let attributeValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"\";\n  if (element.hasAttribute(attribute)) element.removeAttribute(attribute);else element.setAttribute(attribute, attributeValue);\n};\nconst setScrollTrigger = (element, distanceToTop, callback) => {\n  let initStatus = false;\n  const checkFrontier = () => {\n    if (!initStatus && element.getBoundingClientRect().top - element.scrollHeight - window.innerHeight < distanceToTop) {\n      initStatus = !initStatus;\n      callback();\n    }\n  };\n  window.addEventListener('scroll', checkFrontier);\n  checkFrontier();\n};\nconst priceTransform = function (price) {\n  let withoutCents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return '€ ' + (price / 100).toFixed(withoutCents ? 0 : 2);\n};\nconst getDiscountPercent = function (oldPrice, newPrice) {\n  let additionalText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  if (oldPrice && newPrice) return ((oldPrice - newPrice) / oldPrice * 100).toFixed(0) + additionalText || '';\n};\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/utils/index.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/sections/header.js");
/******/ 	
/******/ })()
;