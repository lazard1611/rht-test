import '../styles/application.scss';
import 'swiper/css/bundle';
import animateSvg from './snippets/svg-animate.js';
import sectionTicker from './snippets/ticker.js';
import inputField from './snippets/input-field.js';
import dropdown from './snippets/dropdown.js';
import logoAnimate from './snippets/logo-animate.js';
import fade from './snippets/fade-animation.js';
import titleAnimation from './snippets/title-animation.js';
import flickerCircle from './snippets/flicker-animation.js';

//=====================================================================================================================

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add('body--loaded');
    }, 100);
    sectionTicker();
    animateSvg();
    inputField();
    dropdown();
    logoAnimate();
    fade();
    flickerCircle();
    titleAnimation();
});