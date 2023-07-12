// MÁSCARAS PARA CAMPOS
let masks = {
    removeAllLetters: (string) => {
        return string.replace(/\D/g, '');
    },

    cnpj: (string) => {
        return string.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
    },

    cep: (string) => {
        return string.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1');
    },

    cellphone: (string) => {
        return string.replace(/\D/g, '').replace(/(\d{1,2})/, '($1) ').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1');
    }
}

// CAMPOS
const CNPJ_FIELD__EL = document.querySelector('[data-mask="cnpj"]');
const CEP_FIELD__EL = document.querySelector('[data-mask="cep"]');
const CELLPHONE_FIELD__ELS = document.querySelectorAll('[data-mask="cellphone"]');
const ONLY_NUMBER_FIELD__ELS = document.querySelectorAll('[data-mask="only_number"]');

// Aplicando as máscaras
CNPJ_FIELD__EL && (CNPJ_FIELD__EL.addEventListener('input', ev => ev.target.value = masks.cnpj(ev.target.value)));

CEP_FIELD__EL && (CEP_FIELD__EL.addEventListener('input', ev => ev.target.value = masks.cep(ev.target.value)));

CELLPHONE_FIELD__ELS && (
    CELLPHONE_FIELD__ELS.forEach((fieldEl) => {
        fieldEl.addEventListener('input', ev => ev.target.value = masks.cellphone(ev.target.value));
    })
);

ONLY_NUMBER_FIELD__ELS && (
    ONLY_NUMBER_FIELD__ELS.forEach((fieldEl) => {
        fieldEl.addEventListener('input', ev => ev.target.value = masks.removeAllLetters(ev.target.value));
    })
);