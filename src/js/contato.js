const FIELDS_CTN__EL = document.querySelector('.contact-form__fields-container');
const SUBMIT_BTN__EL = document.querySelector('.contact-form__submit');

SUBMIT_BTN__EL.addEventListener('click', (ev) =>{
    let allInputEls = [...FIELDS_CTN__EL.querySelectorAll('.contact-form__field-input')];

    console.log(allInputEls);
    if(allInputEls.every((inputEl) => inputEl.checkValidity())){
        ev.preventDefault();
        
        let mailtoString = `mailto:gabriel@propago.com.br?subject=${allInputEls[3].value}&body=${allInputEls[4].value}`;
        window.location.href = mailtoString; 
    }
});