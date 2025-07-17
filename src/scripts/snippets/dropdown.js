const dropdown = () => {
    const SELECTORS = {
        dropdown: '.js-dropdown',
        head: '.js-dropdown-head',
        body: '.js-dropdown-body',
        text: '.js-dropdown-text',
    }

    const CLASSNAMES = {
        active: 'dropdown--active'
    }

    const forEachActiveDropdown = (callback, mod) => {
        const $dropdowns = document.querySelectorAll(SELECTORS.dropdown);
        if (!$dropdowns) return;
        $dropdowns.forEach(($dropdown) => {						
            if ($dropdown.classList.contains(CLASSNAMES.active) || !mod) {
                callback($dropdown);
            }
        });
    };

    const removeAllDropdownActiveState = () => {
        forEachActiveDropdown(($dropdown) => {
            $dropdown.classList.remove(CLASSNAMES.active);
            const $body = $dropdown.querySelector(SELECTORS.body);
            $body.style.maxHeight = null;
        });
    };

    const onResize = () => {
        forEachActiveDropdown(($dropdown) => {
            const $body = $dropdown.querySelector(SELECTORS.body);
						const position = window.getComputedStyle($body).position;					 	
						if (position == 'static') return;
            $body.style.maxHeight = `${$body.scrollHeight}px`;
        });
	};

    const changeTextHead = () => {        
        forEachActiveDropdown(($dropdown, mod) => {
            const $texts = $dropdown.querySelectorAll(SELECTORS.text);
            if (!$texts.length) return;
            const $head = $dropdown.querySelector(SELECTORS.head);            
            
            $texts.forEach(($text) => {
                const $parentEl = $text.parentElement;                
                const $input = $parentEl.querySelector('input[type="radio"]')
                if (!$input.checked) return;
                
                $head.firstElementChild.innerHTML = $text.textContent;
                $dropdown.classList.remove(CLASSNAMES.active);
            });
        });             
    }
		
    changeTextHead();
   
    window.addEventListener('click', (e) => {        
        const $head = e.target.closest(SELECTORS.head);        
        if ($head) {            
            e.preventDefault();
            const $dropdown = $head.closest(SELECTORS.dropdown);
            const $body = $dropdown.querySelector(SELECTORS.body);          

            if (!$dropdown.classList.contains(CLASSNAMES.active)) {
                $dropdown.classList.add(CLASSNAMES.active);

                setTimeout(() => {               
                    $body.style.maxHeight = `${$body.scrollHeight}px`;
                }, 100);              
            } else {
                $dropdown.classList.remove(CLASSNAMES.active);
                $body.style.maxHeight = null;                
            }          
        }
        
        if (e.target.closest('input[type="radio"]') && e.target.closest(SELECTORS.body)) {
            changeTextHead();
        }
        
        if (!e.target.closest(SELECTORS.dropdown)) {
            removeAllDropdownActiveState();
        }
    })

    window.addEventListener('resize', onResize);
   
};

export default dropdown;