const SELECTORS = {
    inptut: '.js-input-field',
}

const CLASSNAME = {
    active: 'fill_state'
}

const inputField = () => {
    const $inputs = document.querySelectorAll(SELECTORS.inptut);
    if (!$inputs.length) return;

    const isEmpty = (input) => {        
        if (input.value !== "") {
            input.parentElement?.classList.add(CLASSNAME.active);
        } else {            
            input.parentElement?.classList.remove(CLASSNAME.active);
        }
    }

    $inputs.forEach(($input) => {
        isEmpty($input);

        $input.addEventListener('input', (e) => {             
            isEmpty(e.target);
        });
    })
}

export default inputField;