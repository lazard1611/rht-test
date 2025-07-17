const checkDubleSection = ({section} = {}) => {
    const $sections = document.querySelectorAll(section);    
    if ($sections.length <= 1) return;

    $sections.forEach(($section, index) => {        
        if ( index > 0) {
            const script = $section.querySelector('script');
            const style = $section.querySelector('link[rel="stylesheet"]');            
            if (!script || !style) return;
            script.setAttribute('src', '');
            style.setAttribute('href', '');   
            // script.remove();        
            // style.remove();        
            
        } 
    })
}

export default checkDubleSection;