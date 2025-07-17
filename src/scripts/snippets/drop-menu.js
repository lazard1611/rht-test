import { break_points } from '../utils/constants.js';
import { onWindowResize } from '../utils/index.js';

const drop = () => {
    const SELECTORS = {
        drop: '.js-drop-menu',
    };

    let isClick = false;

    const handleStyleBody = (dropBody) => {
        onWindowResize(() => {
            if (break_points.mediaPoint0 > window.innerWidth) {
                dropBody.style.maxHeight = dropBody.scrollHeight + 'px';
            }
        });
    };

    const handleRemoveActiveState = (dropBody) => {
        const $drops = document.querySelectorAll(SELECTORS.drop);
        if (!$drops.length) return;

        $drops.forEach(($drop) => {
            $drop.classList.remove('active');
            const $spoilerBody = $drop.children[$drop.children.length - 1];
            $spoilerBody.style.maxHeight = null;
        });
    };

    const handleActiveState = (e) => {
        const targetEl = e.target;
        const $drop = targetEl.closest(SELECTORS.drop);

        if (!$drop) {
            handleRemoveActiveState();
            isClick = false;
            return;
        }

        const $spoilerBody = $drop.children[$drop.children.length - 1];
        const $spoilerHead = $drop.children[0];
        handleRemoveActiveState();

        if (!isClick) {
            $drop.classList.add('active');
            handleStyleBody($spoilerBody);
            isClick = true;
        } else {
            handleRemoveActiveState();
            $spoilerBody.style.maxHeight = null;
            isClick = false;
        }
    };

    window.addEventListener('click', handleActiveState);
};

export { drop };
