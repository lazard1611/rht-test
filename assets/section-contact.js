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

/***/ "./src/styles/sections/section-contact.scss":
/*!**************************************************!*\
  !*** ./src/styles/sections/section-contact.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://allaboutinterior/./src/styles/sections/section-contact.scss?");

/***/ }),

/***/ "./src/scripts/sections/section-contact.js":
/*!*************************************************!*\
  !*** ./src/scripts/sections/section-contact.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_section_contact_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/sections/section-contact.scss */ \"./src/styles/sections/section-contact.scss\");\n/* harmony import */ var _snippets_success_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../snippets/success-popup.js */ \"./src/scripts/snippets/success-popup.js\");\n/* harmony import */ var _snippets_clear_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../snippets/clear-form.js */ \"./src/scripts/snippets/clear-form.js\");\n\n\n\nconst SELECTORS = {\n  form: '.js-contact-form',\n  formElWrap: '.js-form-element-wrap',\n  formEl: '.js-form-element',\n  optionList: '.js-dropdown-list'\n};\nconst CLASSNAME = {\n  error: 'error'\n};\nconst validationForm = () => {\n  const $form = document.querySelector(SELECTORS.form);\n  if (!$form) return;\n  const $btn = $form.querySelector('button[type=\"submit\"]');\n  if (!$btn) return;\n  const $formElWrap = $form.querySelectorAll(SELECTORS.formElWrap);\n  if (!$formElWrap.length) return;\n  const formElements = {\n    text: false,\n    email: false,\n    tel: false,\n    select: false,\n    textarea: false,\n    checkbox: false\n  };\n  const restrictTelInput = () => {\n    const $input = document.querySelector('input[type=\"tel\"]');\n    $input.addEventListener('input', e => {\n      $input.value = $input.value.replace(/[^0-9\\s-]/g, '');\n    });\n  };\n  restrictTelInput();\n  const validChar = function (el) {\n    let minNumb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n    const value = el.value.trim();\n    return value.length >= minNumb;\n  };\n  const validateEmail = email => {\n    let re = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n    return re.test(String(email).toLowerCase());\n  };\n  const validateOption = () => {\n    const $optionLists = $form.querySelectorAll(SELECTORS.optionList);\n    if (!$optionLists.length) return;\n    $optionLists.forEach($optionList => {\n      const $inputs = $optionList.querySelectorAll('input');\n      if (!$inputs.length) return false;\n      let isEnableCheckbox = Array.from($inputs).some($input => $input.checked);\n      formElements.select = isEnableCheckbox;\n    });\n  };\n  setTimeout(() => {\n    (0,_snippets_clear_form_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n      form: $form,\n      formEl: SELECTORS.formEl\n    });\n  }, 10);\n  const handelErrorClass = formElements => {\n    for (const elementType in formElements) {\n      const $element = document.querySelector(`.js-form-element[type=\"${elementType}\"]`);\n      if ($element) {\n        const $parentWrap = $element.closest(SELECTORS.formElWrap);\n        if (!formElements[elementType]) {\n          $parentWrap.classList.add('error');\n        } else {\n          $parentWrap.classList.remove('error');\n        }\n      }\n    }\n  };\n  const handleFormEl = () => {\n    $formElWrap.forEach($element => {\n      const $input = $element.querySelector(SELECTORS.formEl);\n      if ($input.type == 'text') {\n        formElements.text = validChar($input, 2);\n      }\n      if ($input.type == 'email' && !formElements.email) {\n        formElements.email = validateEmail($input.value);\n        formElements.tel = validateEmail($input.value);\n      }\n      if ($input.type == 'tel' && !formElements.tel) {\n        formElements.tel = validChar($input, 8);\n        formElements.email = validChar($input, 8);\n      }\n      if ($input.type == 'textarea') {\n        formElements.textarea = validChar($input, 10);\n      }\n      if ($input.type == 'checkbox') {\n        formElements.checkbox = $input.checked;\n      }\n    });\n    validateOption();\n    handelErrorClass(formElements);\n    console.log('formElements', formElements);\n  };\n  let isSubmit = false;\n  const isFormValid = formElements => {\n    return Object.values(formElements).every(value => value === true);\n  };\n  $btn.addEventListener('click', e => {\n    e.preventDefault();\n    e.stopPropagation();\n    handleFormEl();\n    isSubmit = true;\n    if (isSubmit) {\n      $form.addEventListener('input', () => {\n        handleFormEl();\n      });\n    }\n    if (isFormValid(formElements)) {\n      $form.submit();\n    }\n  });\n};\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  (0,_snippets_success_popup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    form: SELECTORS.form,\n    formEl: SELECTORS.formEl\n  });\n  validationForm();\n  dropdown();\n});\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/sections/section-contact.js?");

/***/ }),

/***/ "./src/scripts/snippets/clear-form.js":
/*!********************************************!*\
  !*** ./src/scripts/snippets/clear-form.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst clearAllInput = _ref => {\n  let {\n    form,\n    formEl\n  } = _ref;\n  const $formElements = form.querySelectorAll(formEl);\n  if (!$formElements.length) return;\n  $formElements.forEach($formEl => {\n    if ($formEl.tagName == 'INPUT' || $formEl.tagName == 'TEXTAREA') {\n      $formEl.value = '';\n    }\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (clearAllInput);\n\n//# sourceURL=webpack://allaboutinterior/./src/scripts/snippets/clear-form.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/sections/section-contact.js");
/******/ 	
/******/ })()
;