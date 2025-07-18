import {changeElementClassByStatus} from "../utils/index.js"

export const setButtonQuantityLogic = (buttonElement, callback = () => {
}, blockDecreaseWhenZero = true) => {
    if (!buttonElement) return
    const decreaseElement = buttonElement.querySelector("[data-decrease]")
    const increaseElement = buttonElement.querySelector("[data-increase]")
    const valueElement = buttonElement.querySelector("[data-value]")

    increaseElement.addEventListener(("click"), (event) => {
        event.preventDefault()
        event.stopPropagation()
        const newValue = ++valueElement.textContent

        if (!!(+valueElement.getAttribute("data-value") | undefined) && newValue === (+valueElement.getAttribute("data-value") | undefined)) changeElementClassByStatus(increaseElement, true, "disabled")
        changeElementClassByStatus(decreaseElement, false, "disabled")

        // console.log(+valueElement.getAttribute("data-value") | undefined);
        // console.log(valueElement.textContent);
        // console.log(valueElement.getAttribute('data-value'));
        
        
        valueElement.textContent = newValue
        callback(newValue)
    })

    decreaseElement.addEventListener(("click"), (event) => {
        event.preventDefault()
        event.stopPropagation()
        const newValue = --valueElement.textContent

        if (blockDecreaseWhenZero) changeElementClassByStatus(decreaseElement, !(newValue - 1), "disabled")
        if (!!(+valueElement.getAttribute("data-value") | undefined) && newValue < (+valueElement.getAttribute("data-value") | undefined)) changeElementClassByStatus(increaseElement, false, "disabled")

        // console.log(+valueElement.getAttribute("data-value") | undefined);
        // console.log(valueElement.textContent);
        // console.log(valueElement.getAttribute('data-value'));

        valueElement.textContent = newValue || 1
        callback(newValue)
    })
}
