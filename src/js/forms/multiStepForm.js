// NAVIGATION ELEMENTS
const FORM__CTN = document.querySelector('.form__container');
const FORM_TITLE__EL = document.querySelector('.form__title');
const FORM_NAV_NUMBER__ELS = document.querySelectorAll('.form-nav__item');
const FORM_STEP__ELS = [...FORM__CTN.querySelectorAll('.form__step')];
const ERRORS__CTN = document.querySelector('.form__errors-container');

// STEPS
const STEP_NAMES = ["1. Dados Cadastrais", "2. Dados Financeiros", "3. Dados Institucionais", "4. Dados De Marketing E Comunicação", "5. Dados De Acesso De TI"];
let currentStep = FORM_STEP__ELS.findIndex(stepEl => stepEl.classList.contains('form__step--active'));

// Initialize with the first step active 
if (currentStep < 0) {
    changeCurrentStep(0);
    FORM_STEP__ELS[currentStep].classList.add('form__step--active');
    showStepEl();
}

FORM_NAV_NUMBER__ELS.forEach((navItemEl) => {
    navItemEl.addEventListener('click', () => {
        let index = navItemEl.querySelector('.form-nav__item-number').innerText - 1;

        FORM_STEP__ELS[currentStep].classList.remove('form__step--inactive');
        changeCurrentStep(index);
        showStepEl();
        FORM_TITLE__EL.scrollIntoView();
    })
});

FORM__CTN.addEventListener('click', (ev) => {
    if (ev.target.matches('.form__previous')) {
        changeCurrentStep(currentStep - 1);
        FORM_TITLE__EL.scrollIntoView();
        showStepEl();
    }
    else if (ev.target.matches('.form__next')) {
        changeCurrentStep(currentStep + 1);
        FORM_TITLE__EL.scrollIntoView();
        showStepEl();
    }
    else {
        return;
    }
});

const SUBMIT_BTN__EL = document.querySelector('.form__send');
SUBMIT_BTN__EL.addEventListener('click', () => {
    ERRORS__CTN.innerHTML = ''; // cleaning the errors 

    let allInputsEls = [...FORM__CTN.querySelectorAll('.form__input')];
    allInputsEls.forEach((inputEl) => {
        if (!inputEl.checkValidity()) {
            inputEl.previousElementSibling.classList.add('form__label--invalid');
            inputEl.classList.add('form__input--invalid');

            let stepIndex = inputEl.closest('.form__step').dataset.index;
            let groupName = inputEl.closest('.form__field-group').firstElementChild.innerText;
            let errorEl = createErrorEl(inputEl, stepIndex, groupName);
            ERRORS__CTN.appendChild(errorEl);

            errorEl.addEventListener('click', () => {
                changeCurrentStep(stepIndex);
                showStepEl();
                inputEl.previousElementSibling.scrollIntoView();
            });

            inputEl.addEventListener('input', () => {
                if (inputEl.checkValidity()) {
                    inputEl.previousElementSibling.classList.remove('form__label--invalid');
                    inputEl.classList.remove('form__input--invalid');
                    ERRORS__CTN.removeChild(errorEl)
                }
                else {
                    inputEl.previousElementSibling.classList.add('form__label--invalid');
                    inputEl.classList.add('form__input--invalid');
                    ERRORS__CTN.appendChild(errorEl);
                }
            });
        }
    });
});

// AVOIDING THE FORM TO SUBMIT WHEN THE RADIO AND CHECKBOXES ARE EMPTY
FORM__CTN.addEventListener('submit', (ev) =>{
    let ALL_THE_MULTIPLE_FIELD_ELS = [...FORM__CTN.querySelectorAll('.form__multiple-fields')];
    ALL_THE_MULTIPLE_FIELD_ELS.forEach((multipleFieldEl) =>{
        let options = [...multipleFieldEl.querySelectorAll('input')];
        if(options.every(option => !option.checked)){
            ev.preventDefault();
            let stepIndex = multipleFieldEl.closest('.form__step').dataset.index;
            let groupName = multipleFieldEl.closest('.form__field-group').firstElementChild.innerText;
            let errorEl = createErrorEl(multipleFieldEl,stepIndex,groupName);
            ERRORS__CTN.appendChild(errorEl);

            errorEl.addEventListener('click', () =>{
                changeCurrentStep(stepIndex);
                showStepEl()
                multipleFieldEl.previousElementSibling.scrollIntoView();
            });

            multipleFieldEl.addEventListener('click', () =>{     
                if(options.some(option => option.checked)){
                    ERRORS__CTN.removeChild(errorEl);
                }
                else{
                    ERRORS__CTN.appendChild(errorEl);
                }
            });
        }
    });
});

// MAKING EVERY STEP ELEMENT LISTEN TO THE END OF THE ANIMATION AND THEN FADE 
FORM_STEP__ELS.forEach(stepEl => {
    stepEl.addEventListener('animationend', (ev) => {
        FORM_STEP__ELS[currentStep].classList.remove('form__step--inactive');
        ev.target.classList.toggle('form__step--inactive', !ev.target.classList.contains('form__step--active'));
    });
})

// FUNCTIONS
function changeCurrentStep(index) {
    currentStep = index;
    FORM_TITLE__EL.innerText = STEP_NAMES[currentStep].toUpperCase();
}

function showStepEl() {
    FORM_STEP__ELS.forEach((stepEl, index) => {
        stepEl.classList.toggle('form__step--active', index == currentStep);
    });
}

function createErrorEl(wrongElement, stepIndex, groupName) {
    let sectionName = STEP_NAMES[stepIndex];
    let inputIdValue = wrongElement.id;

    const SECTION_NAME__EL = document.createElement('p');
    SECTION_NAME__EL.className = 'error__section-name';
    SECTION_NAME__EL.innerHTML = `<span class="error__label">ETAPA:</span> ${sectionName}`;

    const GROUP_NAME__EL = document.createElement('p');
    GROUP_NAME__EL.className = 'error__group-name';
    GROUP_NAME__EL.innerHTML = `<span class="error__label">SEÇÃO:</span> ${groupName}`;

    const INPUT_ID__EL = document.createElement('p');
    INPUT_ID__EL.className = 'error__input-id';
    INPUT_ID__EL.innerHTML = `<span class="error__label">ID:</span> ${inputIdValue}`;

    const ERROR__EL = document.createElement('div');
    ERROR__EL.className = 'error';
    ERROR__EL.innerHTML = SECTION_NAME__EL.outerHTML + GROUP_NAME__EL.outerHTML + INPUT_ID__EL.outerHTML;

    return ERROR__EL;
}


const FIELD_WITH_OTHER__ELS = document.querySelectorAll('[data-has-other]');
// Applying the "other" functionality
FIELD_WITH_OTHER__ELS.forEach((fieldWithOtherEl) => {
    const OPTION_OTHER__EL = fieldWithOtherEl.querySelector('.form__option--other');
    const INPUT_OTHER__EL = fieldWithOtherEl.querySelector('.form__input--other');
    INPUT_OTHER__EL.addEventListener('input', ev => OPTION_OTHER__EL.value = ev.target.value.toLowerCase());

    // making the input appear and disappear
    fieldWithOtherEl.addEventListener('click', (ev) => {
        if (ev.target.matches('.form__option--other')) {
            INPUT_OTHER__EL.classList.toggle('form__input--invisible');
            INPUT_OTHER__EL.toggleAttribute('disabled');
        }
        else if (ev.target.matches('.form__option')) {
            if (!INPUT_OTHER__EL.classList.contains('form__input--invisible') && !OPTION_OTHER__EL.checked) {
                INPUT_OTHER__EL.setAttribute('disabled', 'disabled')
                INPUT_OTHER__EL.classList.add('form__input--invisible');
            }
        }
    });
});