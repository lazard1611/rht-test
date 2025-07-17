import {changeElementClassByClassContains} from "../utils/index.js";

export default () => {
    const videoWrapperElement = document.querySelector("[data-portfolio-video-wrapper]")
    const videoElement = document.querySelector("[data-portfolio-video]")
    const playButtonElement = document.querySelector("[data-portfolio-play-button]")

    if (!videoElement) return

    videoWrapperElement.addEventListener(("click"), () => {
        changeElementClassByClassContains(playButtonElement, "hidden")

        if (videoElement.paused) videoElement.play()
        else videoElement.pause()
    })
}

