import { sendToDatabase } from './registerForm.js';
import { sendToEmail } from './emailForm.js';

const FORM__EL = document.querySelector('.form');

const FORM_CTN__EL = document.querySelector('.form__container');
FORM_CTN__EL.addEventListener('submit', async (ev) =>{
    ev.preventDefault();

    let formDataObject = {
        form_type: FORM_CTN__EL.dataset.type,
        values: []
    }
    let emailRequestBody = new Object({
        "_subject": document.querySelector('[name="name"]').value+' '+document.querySelector('[name="_subject"]').value, 
        "_replyto": document.querySelector('[name="email"]').value,
        "_template": 'box',
    })

    const FIELD_CONTAINER__ELS = [...FORM_CTN__EL.querySelectorAll('[data-role="field_container"')];
    FIELD_CONTAINER__ELS.forEach((fieldEl) => {
        let menirRequestBodyValues = {}
        let questionValue = fieldEl.querySelector('[data-role="field_question"]').innerText;

        // NOTE: If the field container has a child field container with checkboxes it should get all checked checkboxes' values
        const CHILD_FIELD__EL = fieldEl.querySelector('[data-role="child_field_container"]')
        if(CHILD_FIELD__EL){
            let fieldIdValue = CHILD_FIELD__EL.id;

            let selectedOptions = [];
            const OPTION__ELS = [...CHILD_FIELD__EL.querySelectorAll('[data-role="field_answer"]')];
            OPTION__ELS.filter((optionEl) => optionEl.checked && (selectedOptions.push(optionEl.value.toUpperCase())));

            let answerValue = '['+selectedOptions.join()+']';

            menirRequestBodyValues = {
                field_id: fieldIdValue,
                question: questionValue,
                answer: answerValue
            }

            emailRequestBody[`${questionValue}`] = answerValue; 
        }
        else{
            let fieldIdValue = fieldEl.querySelector('[data-role="field_answer"]').id;
            let answerValue = fieldEl.querySelector('[data-role="field_answer"]').value;

            menirRequestBodyValues = {
                field_id: fieldIdValue,
                question: questionValue,
                answer: answerValue
            }

            emailRequestBody[`${questionValue}`] = answerValue; 
        }

        // NOTE: Pushes only the object that does not contain an empty value
        if(Object.values(menirRequestBodyValues).some((value) => value == '')){
            // remove from the email content if the field is empty
            delete emailRequestBody[`${questionValue}`];
        }
        else{
            formDataObject.values.push(menirRequestBodyValues);
        }
    });

    let menirResponse = await sendToDatabase(formDataObject);
    if(!menirResponse.success) { 
        createMessageLog(false, 'Não Foi Possível Conectar Com O Banco De Dados', ['Perdão, volte mais tarde para tentar novamente']);
        FORM__EL.scrollIntoView();

        console.log(menirResponse); 
    }
    else {
        createMessageLog(true, document.querySelector('[name="success_modal_title"]').value, document.querySelector('[name="success_modal_messages"]').value.split(','));
        FORM__EL.scrollIntoView();

        console.log(menirResponse); 

        let emailResponse = await sendToEmail(emailRequestBody);
        console.log(emailResponse); 
    }
});

function createMessageLog(isSuccess, title, messages){
    let messageHTML = `
    <div class="message">
        ${
            isSuccess ? 
                `<div class="message__icon"><i class="ri-checkbox-circle-fill"></i></div>`
            : 
                `<div class="message__icon message__icon--error"><i class="ri-close-circle-fill"></i></div>`
        }
        <h3 class="message__title">${title}</h3>
        ${messages.map((message) => `<p class="message__text">${message}<p>`)}
        <div class="message__button-area"></div>
    </div>
    `;

    // Creating the buttons
    let messageEl = document.createElement('div');
    messageEl.innerHTML = messageHTML;

    let btnsAreaEl = messageEl.querySelector('.message__button-area');

    if(isSuccess){
        let goToHomeBtn = document.createElement('a');
        goToHomeBtn.className = 'message__button';
        goToHomeBtn.href = './index.html'
        goToHomeBtn.innerText = "Ir À Página Principal"

        btnsAreaEl.appendChild(goToHomeBtn);
    }
    else{
        let goBackBtn = document.createElement('a');
        goBackBtn.className = 'message__button';
        goBackBtn.href = '';
        goBackBtn.innerText = "Tentar Novamente"

        btnsAreaEl.appendChild(goBackBtn);
    }

    FORM__EL.innerHTML = messageEl.innerHTML; 
}