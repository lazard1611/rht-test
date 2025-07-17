import '../../styles/sections/section-contact.scss';
import popupHandler from '../snippets/success-popup.js';
import clearAllInput from '../snippets/clear-form.js';

const SELECTORS = {    
    form: '.js-contact-form',
    formElWrap: '.js-form-element-wrap',
    formEl: '.js-form-element',
    optionList: '.js-dropdown-list'
}

const CLASSNAME = {    
    error: 'error'
}

const validationForm = () => {
    const $form = document.querySelector(SELECTORS.form);
    if (!$form) return;
    const $btn = $form.querySelector('button[type="submit"]');
    if (!$btn) return;       
    const $formElWrap = $form.querySelectorAll(SELECTORS.formElWrap);
    if (!$formElWrap.length) return;   

    const formElements = {
        text: false,
        email: false,
        tel: false,
        select: false,
        textarea: false,
        checkbox: false
    }    
    
    const restrictTelInput = () => {
        const $input = document.querySelector('input[type="tel"]'); 

        $input.addEventListener('input', (e) => {            
            $input.value = $input.value.replace(/[^0-9\s-]/g, '');
        });     
    }

    restrictTelInput();

    const validChar = (el, minNumb = 1) => {       
        const value = el.value.trim();
        return value.length >= minNumb;  
    }

    const validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateOption = () => {
        const $optionLists = $form.querySelectorAll(SELECTORS.optionList);
        if (!$optionLists.length) return; 
        
        $optionLists.forEach(($optionList) => {
            const $inputs = $optionList.querySelectorAll('input');
            if (!$inputs.length) return false; 
            
            let isEnableCheckbox = Array.from($inputs).some(($input) => $input.checked);
            formElements.select = isEnableCheckbox;                        
        });        
    }     

    setTimeout(() => {
        clearAllInput({
            form: $form,
            formEl: SELECTORS.formEl
        });        
    }, 10)
    
    const handelErrorClass = (formElements) => {        
        for (const elementType in formElements) { 
            const $element = document.querySelector(`.js-form-element[type="${elementType}"]`);

            if ($element) {
                const $parentWrap = $element.closest(SELECTORS.formElWrap);

                if (!formElements[elementType]) {
                    $parentWrap.classList.add('error');                                   
                } else {
                    $parentWrap.classList.remove('error');    
                }
            }          
        }
    }    

    const handleFormEl = () => {            

        $formElWrap.forEach(($element) => {
            const $input = $element.querySelector(SELECTORS.formEl);             

            if ($input.type == 'text') {                
                formElements.text = validChar($input, 2);                
            }

            if ($input.type == 'email' && !formElements.email) {             
                formElements.email = validateEmail($input.value);
                formElements.tel = validateEmail($input.value);                             
            }

            if ($input.type == 'tel' && !formElements.tel) {               
                formElements.tel = validChar($input, 8);
                formElements.email = validChar($input, 8);                                         
            }

            if ($input.type == 'textarea') {               
                formElements.textarea = validChar($input, 10);               
            }

            if ($input.type == 'checkbox') {                   
                formElements.checkbox = $input.checked;                
            }         
        });

        validateOption();
        handelErrorClass(formElements);

        console.log('formElements', formElements);        
    } 

    let isSubmit = false;  
    
    const isFormValid = (formElements) => {
        return Object.values(formElements).every(value => value === true);
    } 

    $btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();                
        handleFormEl();
        isSubmit = true;

        if (isSubmit) {
            $form.addEventListener('input', () => {
                handleFormEl();
            })
        }  

        if (isFormValid(formElements)) {            
            $form.submit(); 
        }
    })     
}

document.addEventListener("DOMContentLoaded", () => {
    popupHandler({ 
        form: SELECTORS.form,
        formEl: SELECTORS.formEl
    });
    validationForm();
    dropdown();
});
