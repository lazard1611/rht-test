import '../../styles/sections/footer.scss';
import inputField from '../snippets/input-field.js';
import popupHandler from '../snippets/success-popup.js';

const SELECTORS = {
    form: '.js-newsletter-form',
    formField: '.js-newsletter-form-field',
    input: '.js-input-field',
}

const CLASSNAME = {
    error: 'error'
}

const newsLetter = () => {       

    const $form = document.querySelector(SELECTORS.form);
    if (!$form) return;
    const $input = $form.querySelector(SELECTORS.input);
    const $formField = $form.querySelector(SELECTORS.formField);
    const submitButton = $form.querySelector("button[type='submit']");

    const checkURLParameter = (param, value) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) === value;
    }

    if (checkURLParameter('form_type', 'customer')) {        
        $formField.classList.add(CLASSNAME.error);
    }
    
    if (checkURLParameter('customer_posted', 'true')) {        
        $formField.classList.remove(CLASSNAME.error);
    } 
}

document.addEventListener("DOMContentLoaded", () => {
    inputField();
    newsLetter();
    popupHandler({ 
        form: SELECTORS.form,
        formEl: SELECTORS.input
    });
});