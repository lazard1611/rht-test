import '../../styles/sections/template-portfolio.scss';
import {changeElementClassByClassContains} from "../utils/index.js";

const setSelectOptionsLogic = () => {
    const selectElements = document.querySelectorAll("[data-portfolio-blogs-select]")

    selectElements.forEach((selectElement) => {
        const activeOptionElement = selectElement.querySelector("[data-portfolio-blogs-select-active]")

        activeOptionElement.addEventListener(("click"), () => changeElementClassByClassContains(selectElement, "active"))

        window.addEventListener(("click"), (event) => {
            if (selectElement.classList.contains("active") && !selectElement.contains(event.target)) changeElementClassByClassContains(selectElement, "active")
        })
    })
}

window.addEventListener(("DOMContentLoaded"), () => {
    setSelectOptionsLogic()
})