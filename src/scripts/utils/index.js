export const exist = (elementOrArray) => {
    if (!elementOrArray && elementOrArray !== 0) return false;
    if (elementOrArray.length === 0) {
        return false;
    }
    return true;
};

export function debounce(delay, fn) {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}

export function debounceImmediate(delay, fn) {
    let fired = false;
    return (...args) => {
        if (!fired) {
            fn(...args);
            fired = true;
            setTimeout(() => {
                fired = false;
            }, delay);
        }
    };
}

export const isTouchDevice = () => {
    return (
        'ontouchstart' in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
    );
};

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const getGeneratedKey = () => "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

export function isFunction(func) {
    return func instanceof Function;
}

export function getWindowSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return {
        windowWidth,
        windowHeight,
    };
}

export const onWindowResize = (cb) => {
    if (!cb && !isFunction(cb)) return;

    const handleResize = () => {
        cb();
    };

    window.addEventListener('resize', debounce(15, handleResize));

    handleResize();
};

export const detectUsersOS = () => {
    if (window.navigator.userAgent.indexOf('Win') !== -1) return 'Windows OS';
    if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Macintosh';
    if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux OS';
    if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android OS';
    if (window.navigator.userAgent.indexOf('like Mac') !== -1) return 'iOS';

    return null;
};

export const onWindowChangeOrientation = (cb) => {
    if ((!cb && !isFunction(cb)) || !isTouchDevice()) return;

    let {windowWidth} = getWindowSize();

    const handleResize = () => {
        const {windowWidth: newWindowWidth} = getWindowSize();

        if (windowWidth !== newWindowWidth) cb();

        windowWidth = newWindowWidth;
    };

    window.addEventListener('resize', debounce(100, handleResize));
};

export const onWindowScroll = (cb) => {
    if (!cb && !isFunction(cb)) return;

    const handleScroll = () => {
        cb(window.pageYOffset);
    };

    window.addEventListener('scroll', debounce(15, handleScroll));

    handleScroll();
};

export const documentReady = (cb) => {
    if (!cb && !isFunction(cb)) return;
    document.addEventListener('DOMContentLoaded', cb);
};

export const pageLoad = (cb) => {
    if (!cb && !isFunction(cb)) return;
    window.addEventListener('load', () => {
        window.loaded = true;
        cb();

        window.onWindowLoadCallbacks?.forEach((cbLocal) => {
            if (!cbLocal && !isFunction(cbLocal)) return;
            cbLocal();
        });
        window.onWindowLoadCallbacks = [];
    });
};

export const page = (cb) => {
    return cb;
    // if (!cb && !isFunction(cb)) return;

    // if (window.loaded) {
    // 	cb();
    // } else {
    // 	if (!window.onWindowLoadCallbacks) window.onWindowLoadCallbacks = [];
    // 	window.onWindowLoadCallbacks.push(cb);
    // }
};

export const getObjectOfElements = (objectOfSelectors, byParent = false) => {
    let fountByElement = document;
    let parentKey;

    const getResult = (key) => {
        const result = document.querySelectorAll(objectOfSelectors[key]);
        return result.length > 1 ? result : result[0];
    }

    if (byParent && Object.values(objectOfSelectors)[0]) {
        fountByElement = document.querySelector(Object.values(objectOfSelectors)[0]);
        parentKey = Object.keys(objectOfSelectors)[0];

        Object.values(objectOfSelectors)[0] = fountByElement;
    }

    Object.keys(objectOfSelectors).forEach((key) => {
        if (key === parentKey) objectOfSelectors[key] = getResult(key);
        else objectOfSelectors[key] = getResult(key)
    });

    return objectOfSelectors;
}

export const isElementContainsClass = (element, searchClass, callbackBy = undefined, callback = undefined) => {
    if (!element) return console.log(element, "isElementContainsClass, error)");

    if (element.classList.contains(searchClass) === callbackBy && typeof callback === "function") callback()
    return element.classList.contains(searchClass)
}

export const changeElementClassByStatus = (element, status, useClass, callbackBy = undefined, callback = undefined) => {
    if (!element) return console.log(element, "changeElementClassByStatus, element's use class is " + useClass);

    if (status) element.classList.add(useClass);
    else element.classList.remove(useClass);

    if (status === callbackBy && typeof callback === "function") callback()
}

export const changeElementClassByClassContains = (element, useClass, callbackBy = undefined, callback = undefined) => {
    if (!element) return console.log(element, "changeElementClassByClassContains, element's use class is " + useClass);

    if (isElementContainsClass(element, useClass, callbackBy, callback)) element.classList.remove(useClass);
    else element.classList.add(useClass);
}

export const changeClassByAttribute = (attribute, status, useClass, byArrayMode = false) => {
    if (byArrayMode) {
        const elements = document.querySelectorAll(`[${attribute}]`);

        elements.forEach((element) => {
            if (!element) return console.log(element, "changeClassByAttributeContains, element's attribute " + attribute);

            if (status) element.classList.add(useClass);
            else element.classList.remove(useClass);
        });
    } else {
        const element = document.querySelector(`[${attribute}]`);

        if (!element) return console.log(element, "changeClassByAttributeContains, element's attribute " + attribute);

        if (status) {
            element.classList.add(useClass);
            callback()
        } else element.classList.remove(useClass);
    }
}

export const changeClassByAttributeContains = (attribute, useClass, byArrayMode = false) => {
    if (byArrayMode) {
        const elements = document.querySelectorAll(`[${attribute}]`);

        elements.forEach((element) => {
            if (!element) return console.log(element, "changeClassByAttributeContains, element's attribute " + attribute);

            if (element.classList.contains("active")) element.classList.remove(useClass);
            else element.classList.add(useClass);
        });
    } else {
        const element = document.querySelector(`[${attribute}]`);

        if (!element) return console.log(element, "changeClassByAttributeContains, element's attribute " + attribute);

        if (element.classList.contains("active")) element.classList.remove(useClass);
        else element.classList.add(useClass);
    }
}

export const changeElementAttributeByStatus = (element, status, attribute, attributeValue = "") => {
    if (status) element.setAttribute(attribute, attributeValue);
    else element.removeAttribute(attribute);
}

export const changeElementAttributeByContains = (element, attribute, attributeValue = "") => {
    if (element.hasAttribute(attribute)) element.removeAttribute(attribute);
    else element.setAttribute(attribute, attributeValue);
}

export const setScrollTrigger = (element, distanceToTop, callback) => {
    let initStatus = false;

    const checkFrontier = () => {
        if (!initStatus && (element.getBoundingClientRect().top - element.scrollHeight - window.innerHeight < distanceToTop)) {
            initStatus = !initStatus;
            callback();
        }
    };

    window.addEventListener('scroll', checkFrontier);
    checkFrontier();
}

export const priceTransform = (price, withoutCents = false) => {
    return '€ ' + (price / 100).toFixed(withoutCents ? 0 : 2);
}

export const getDiscountPercent = (oldPrice, newPrice, additionalText = '') => {
    if (oldPrice && newPrice) return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(0) + additionalText || '';
}
