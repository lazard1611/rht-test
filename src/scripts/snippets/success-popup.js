import clearAllInput from '../snippets/clear-form.js';

const SELECTORS = {
    popup: '.js-contact-popup',
    popupWrap: '.js-contact-popup-wrap',
    popupClose: '.js-contact-popup-close',    
}

const CLASSNAME = {
    popup: 'popup-close',
    error: 'error'
}

const popupHandler = ({ form, formEl }) => {
    const $popup = document.querySelector(SELECTORS.popup);
    if (!$popup) return;
    const $form = document.querySelector(form);
    if (!$form) return;

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (document.body.classList.contains(CLASSNAME.popup)) {
            document.body.classList.remove(CLASSNAME.popup);
        }
    })

    $popup.addEventListener('click', (e) => {
        const $wrap = e.target.closest(SELECTORS.popupWrap);
        const $btn = e.target.closest(SELECTORS.popupClose);        

        if (!$wrap || $btn) {
            document.body.classList.add(CLASSNAME.popup);

            clearAllInput({
                form: $form,
                formEl: formEl
            });
        }        
    })
}

export default popupHandler;