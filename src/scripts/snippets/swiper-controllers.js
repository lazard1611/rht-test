import {changeElementClassByStatus} from "../utils/index.js";

export default (swiper, parentName, indexMultiplier = undefined, callback = undefined) => {
    const controlElements = document.querySelectorAll(`[data-${parentName}-controller]`)
    const counterElement = document.querySelector(`[data-${parentName}-currnet-index]`)

    const check = () => {
        controlElements.forEach((controlElement) => {
            const attributeValue = controlElement.getAttribute(`data-${parentName}-controller`)

            changeElementClassByStatus(controlElement, attributeValue === "next" && swiper.activeIndex === swiper.slides.length, "disabled")
            changeElementClassByStatus(controlElement, attributeValue === "prev" && swiper.activeIndex === 0, "disabled")
        })
    }

    controlElements.forEach((controlElement) => {
        const attributeValue = controlElement.getAttribute(`data-${parentName}-controller`)

        controlElement.addEventListener(("click"), () => {
            if (attributeValue === "next") swiper.slideTo(swiper.activeIndex + 1)
            if (attributeValue === "prev") swiper.slideTo(swiper.activeIndex - 1)
        })
    })

    swiper.on("slideChange", () => {
        counterElement.textContent = swiper.activeIndex + (indexMultiplier || 1)
        check()

        if (typeof callback === "function") callback()
    });

    counterElement.textContent = indexMultiplier || 1
}