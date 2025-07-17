import '../../styles/sections/header.scss';
import { onWindowScroll, exist } from '../utils/index.js';
import { drop } from '../snippets/drop-menu.js';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-trigger',
		languageList: '.js-language-list',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		bodyScrollPos: 'header--pos_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);

	let isMenuOpen = false;
	let prevScrollPos = window.scrollY;
	const headerHeight = $header.clientHeight;

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (scrollY) => {
		if (scrollY > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (scrollY <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}


		if (prevScrollPos < window.scrollY && scrollY > headerHeight) {
			$header.classList.add(CLASSNAMES.bodyScrollPos);
		} else {
			$header.classList.remove(CLASSNAMES.bodyScrollPos);
		}
		prevScrollPos = window.scrollY;
	};

	const initializeEventListeners = () => {
		if (!exist($menuTriggers)) return;

		$menuTriggers.forEach(($trigger) => {
			$trigger.addEventListener('click', () => {
				handleTriggerClick();
			});
		});
	};

	if (!$header) return;

	onWindowScroll(headerScroll);
	initializeEventListeners();

	const changeLanguage = () => {
		const $langLists = $header.querySelectorAll(SELECTORS.languageList);
		if (!$langLists.length) return;

		const goToUrl = (value) => {
			const nlPath = window.nlPath; 
			const enPath = window.enPath; 
			const langCode = value.toLowerCase();

			if (langCode == 'nl') {
				window.location.href = nlPath;
			} else {
				window.location.href = enPath;
			}
		}

		$langLists.forEach(($langList) => {
			const $langItems = $langList.querySelectorAll('input[type="radio"]');
			if (!$langItems.length) return;



			$langItems.forEach(($langItem) => {
				$langItem.addEventListener('click', () => {	
					if ($langItem.checked) {
						goToUrl($langItem.value);
					}
				})

				if ($langItem.checked) {
					// goToUrl($langItem.value);

				}
			})
		}) 
	}

	changeLanguage();
};

document.addEventListener("DOMContentLoaded", () => {
    header();
	drop();
});

