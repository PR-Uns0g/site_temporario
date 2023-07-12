const MENU__EL = document.getElementById('menu-nav');
const MENU_BTN__EL = document.getElementById('menu-btn');

MENU_BTN__EL.addEventListener('click', () => {
    MENU_BTN__EL.firstElementChild.classList.toggle('menu-button__icon--invisible');
    MENU_BTN__EL.lastElementChild.classList.toggle('menu-button__icon--invisible');
    MENU__EL.classList.toggle('menu--active');
});

const MENU_DD_BTN__EL = document.getElementById('menu-dropdown-button');
const DD_MENU__EL = document.getElementById('dropdown-menu');

MENU_DD_BTN__EL.addEventListener('click', () => {
    MENU_DD_BTN__EL.classList.toggle('menu__dropdown-button--rotate')
    DD_MENU__EL.classList.toggle('menu__dropdown-links--invisible');
});