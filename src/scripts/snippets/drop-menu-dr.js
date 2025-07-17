import {changeElementClassByStatus} from "../utils/index.js"

export default () => {
    const dropdownElements = document.querySelectorAll("[data-dropdown]")
    if (!dropdownElements.length) return

    dropdownElements.forEach((dropdownElement) => {
        const headElement = dropdownElement.querySelector("[data-dropdown-header]")
        const contentElement = dropdownElement.querySelector("[data-dropdown-content]")

        contentElement.style.maxHeight = "0"

        const closeBrothers = () => {
            dropdownElements.forEach((checkDropdownElement) => {
                const checkDropdownMarker = checkDropdownElement.getAttribute("data-dropdown")
                const dropdownMarker = dropdownElement.getAttribute("data-dropdown")

                if (checkDropdownMarker === dropdownMarker) {
                    const checkDropdownItemContent = checkDropdownElement.querySelector("[data-dropdown-content]")

                    changeElementClassByStatus(checkDropdownElement, false, "open")
                    checkDropdownItemContent.style.maxHeight = "0"
                }
            })
        }

        const onClick = () => {
            if (dropdownElement.hasAttribute("data-dropdown-close-others")) closeBrothers()

            changeElementClassByStatus(dropdownElement, true, "open")
            contentElement.style.maxHeight = (+contentElement.scrollHeight + +contentElement.style.paddingTop) + "px"
        }

        if (dropdownElement.hasAttribute("data-dropdown-first")) onClick()

        if (dropdownElement.hasAttribute("data-dropdown-trigger-by-body")) dropdownElement.addEventListener(("click"), () => onClick())
        else headElement.addEventListener(("click"), () => onClick())

    })
}