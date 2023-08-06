const MENU__EL = document.getElementById('menu-nav');
const MENU_BTN__EL = document.getElementById('menu-btn');
MENU_BTN__EL.addEventListener('click', () => {
    MENU_BTN__EL.firstElementChild.classList.toggle('menu-button__icon--invisible')
    MENU_BTN__EL.lastElementChild.classList.toggle('menu-button__icon--invisible')
    MENU__EL.classList.toggle('menu--active')
});

const MENU_DROPDOWN_BTN__EL = document.querySelector('.menu__item--highlighted');
const DROPDOWN_MENU__EL = document.getElementById('header-dropdown-menu');
MENU_DROPDOWN_BTN__EL.addEventListener('click', () => {
    MENU_DROPDOWN_BTN__EL.querySelector('.menu__dropdown-button').classList.toggle('menu__dropdown-button--rotate')
    DROPDOWN_MENU__EL.classList.toggle('menu__dropdown-links--invisible')
});

const FOOTER_DROPDOWN_BTN__EL = document.querySelector('.footer__nav-item--dropdown');
const FOOTER_DROPDOWN_MENU__EL = document.querySelector('.footer__navbar-list--dropdown');
FOOTER_DROPDOWN_BTN__EL.addEventListener('click', () => {
    FOOTER_DROPDOWN_BTN__EL.querySelector('.footer__dropdown-button').classList.toggle('footer__dropdown-button--rotate')
    FOOTER_DROPDOWN_MENU__EL.classList.toggle('footer__navbar-list--invisible')
});