const FORM_CTN__EL = document.querySelector('.form__container');
const FORM_SEND_BTN__EL = document.querySelector('.form__send');

FORM_SEND_BTN__EL.addEventListener('click', (ev) => {    
    let allInputEls = [...FORM_CTN__EL.querySelectorAll('.form__input')];

    let allLabelEls = [...FORM_CTN__EL.querySelectorAll('.form__label')];
    if(allInputEls.every((inputEl) => inputEl.checkValidity())){
        ev.preventDefault();

        let emailSubject = FORM_CTN__EL.dataset.subject;
        let emailBody = `DADOS DE "${allInputEls[0].value.toUpperCase()}": (`; // O PRIMEIRO INPUT SEMPRE SERÁ O DO NOME
        for(let i = 0; i < allInputEls.length; i++){
            emailBody += `${allLabelEls[i].innerText.toLowerCase().replaceAll(' ','_').replace('(','').replace(')','')} = '${(allInputEls[i].value != '') ? allInputEls[i].value : 'não informado'}' | `;
        }
        let mailtoString = `mailto:gabriel@propago.com.br?subject=${emailSubject + ' ' + allInputEls[0].value.toUpperCase()} - Propago&body=${emailBody})`;

        console.log(mailtoString);
        window.location.href = mailtoString;
    }
});