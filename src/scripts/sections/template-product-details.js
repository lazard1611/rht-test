import {changeElementClassByStatus} from "../utils/index.js"

import '../../styles/sections/template-product-details.scss'

const setDetailTabsLogic = () => {
    const tabControllerElements = document.querySelectorAll("[data-template-product-details-tab-controller]")
    const tabContentElements = document.querySelectorAll("[data-template-product-details-tab-content]")

    tabControllerElements.forEach((controllerElement) => {
        controllerElement.addEventListener(("click"), () => {
            const activeControllerKey = controllerElement.getAttribute("data-template-product-details-tab-controller")

            tabControllerElements.forEach((controllerElement) => {
                const controllerKey = controllerElement.getAttribute("data-template-product-details-tab-controller")
                changeElementClassByStatus(controllerElement, controllerKey === activeControllerKey, "active")
            })

            tabContentElements.forEach((contentElement) => {
                const contentKey = contentElement.getAttribute("data-template-product-details-tab-content")
                changeElementClassByStatus(contentElement, contentKey === activeControllerKey, "active")
            })
        })
    })
}

window.addEventListener(("DOMContentLoaded"), () => setDetailTabsLogic())
