

const clearAllInput = ({form, formEl}) => {
    const $formElements = form.querySelectorAll(formEl);
    if (!$formElements.length) return;        

    $formElements.forEach(($formEl) => {
        if ($formEl.tagName == 'INPUT' || $formEl.tagName == 'TEXTAREA') {               
            $formEl.value = '';
        }
    })
}

export default clearAllInput;