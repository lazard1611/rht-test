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

/***/ "./src/styles/sections/footer.scss":
/*!*****************************************!*\
  !*** ./src/styles/sections/footer.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://allaboutinterior/./src/styles/sections/footer.scss?");

/***/ }),

/***/ "./src/scripts/sections/footer.js":
/*!****************************************!*\
  !*** ./src/scripts/sections/footer.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_footer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/sections/footer.scss */ \"./src/styles/sections/footer.scss\");\n/* harmony import */ var _snippets_input_field_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../snippets/input-field.js */ \"./src/scripts/snippets/input-field.js\");\n/* harmony import */ var _snippets_success_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../snippets/success-popup.js */ \"./src/scripts/snippets/success-popup.js\");\n\n\n\nconst SELECTORS = {\n  form: '.js-newsletter-form',\n  formField: '.js-newsletter-form-field',\n  input: '.js-input-field'\n};\nconst CLASSNAME = {\n  error: 'error'\n};\nconst newsLetter = () => {\n  const $form = document.querySelector(SELECTORS.form);\n  if (!$form) return;\n  const $input = $form.querySelector(SELECTORS.input);\n  const $formField = $form.querySelector(SELECTORS.formField);\n  const submitButton = $form.querySelector(\"button[type='submit']\");\n  const checkURLParameter = (param, value) => {\n    const urlParams = new URLSearchParams(window.location.search);\n    return urlParams.get(param) === value;\n  };\n  if (checkURLParameter('form_type', 'customer')) {\n    $formField.classList.add(CLASSNAME.error);\n  }\n  if (checkURLParameter('customer_posted', 'true')) {\n    $formField.classList.remove(CLASSNAME.error);\n  }\n};\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  (0,_snippets_input_field_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  newsLetter();\n  (0,_snippets_success_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n    form: SELECTORS.form,\n    formEl: SELECTORS.input\n  });\n});\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/sections/footer.js?");

/***/ }),

/***/ "./src/scripts/snippets/clear-form.js":
/*!********************************************!*\
  !*** ./src/scripts/snippets/clear-form.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst clearAllInput = _ref => {\n  let {\n    form,\n    formEl\n  } = _ref;\n  const $formElements = form.querySelectorAll(formEl);\n  if (!$formElements.length) return;\n  $formElements.forEach($formEl => {\n    if ($formEl.tagName == 'INPUT' || $formEl.tagName == 'TEXTAREA') {\n      $formEl.value = '';\n    }\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (clearAllInput);\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/snippets/clear-form.js?");

/***/ }),

/***/ "./src/scripts/snippets/input-field.js":
/*!*********************************************!*\
  !*** ./src/scripts/snippets/input-field.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst SELECTORS = {\n  inptut: '.js-input-field'\n};\nconst CLASSNAME = {\n  active: 'fill_state'\n};\nconst inputField = () => {\n  const $inputs = document.querySelectorAll(SELECTORS.inptut);\n  if (!$inputs.length) return;\n  const isEmpty = input => {\n    if (input.value !== \"\") {\n      input.parentElement?.classList.add(CLASSNAME.active);\n    } else {\n      input.parentElement?.classList.remove(CLASSNAME.active);\n    }\n  };\n  $inputs.forEach($input => {\n    isEmpty($input);\n    $input.addEventListener('input', e => {\n      isEmpty(e.target);\n    });\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (inputField);\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/snippets/input-field.js?");

/***/ }),

/***/ "./src/scripts/snippets/success-popup.js":
/*!***********************************************!*\
  !*** ./src/scripts/snippets/success-popup.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _snippets_clear_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../snippets/clear-form.js */ \"./src/scripts/snippets/clear-form.js\");\n\nconst SELECTORS = {\n  popup: '.js-contact-popup',\n  popupWrap: '.js-contact-popup-wrap',\n  popupClose: '.js-contact-popup-close'\n};\nconst CLASSNAME = {\n  popup: 'popup-close',\n  error: 'error'\n};\nconst popupHandler = _ref => {\n  let {\n    form,\n    formEl\n  } = _ref;\n  const $popup = document.querySelector(SELECTORS.popup);\n  if (!$popup) return;\n  const $form = document.querySelector(form);\n  if (!$form) return;\n  $form.addEventListener('submit', e => {\n    e.preventDefault();\n    if (document.body.classList.contains(CLASSNAME.popup)) {\n      document.body.classList.remove(CLASSNAME.popup);\n    }\n  });\n  $popup.addEventListener('click', e => {\n    const $wrap = e.target.closest(SELECTORS.popupWrap);\n    const $btn = e.target.closest(SELECTORS.popupClose);\n    if (!$wrap || $btn) {\n      document.body.classList.add(CLASSNAME.popup);\n      (0,_snippets_clear_form_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        form: $form,\n        formEl: formEl\n      });\n    }\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (popupHandler);\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/snippets/success-popup.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/sections/footer.js");
/******/ 	
/******/ })()
;