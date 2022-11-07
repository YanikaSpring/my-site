// ЗАКРЫВАЕМ МЕНЮ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ, ЕСЛИ JS РАБОТАЕТ
// ОТОБРАЖАЕМ КНОПКУ ОТКРЫТИЯ/ЗАКРЫТИЯ МЕНЮ, ЕСЛИ JS РАБОТАЕТ
document.addEventListener('DOMContentLoaded', ready);
let MapSite = document.querySelector('.contacts__map');

function ready() {
    Menu.classList.toggle('main-navigation__hide');
    ButtonMenu.classList.toggle('main-navigation__toggle-show');
    MapSite.classList.remove('contacts__map-img');
    MapSite.classList.toggle('contacts__map-yandex');
}

// МАНИПУЛЯЦИИ С МЕНЮ
let Menu = document.querySelector('.main-navigation__wrapper');
let ButtonMenu = document.querySelector('.main-navigation__toggle');

ButtonMenu.onclick = function() {
    Menu.classList.toggle('main-navigation__hide');
    ButtonMenu.classList.toggle('main-navigation__toggle-open');
    Menu.classList.toggle('main-navigation__open');
    ButtonMenu.classList.toggle('main-navigation__toggle-close');
};

// МАНИПУЛЯЦИИ С МОДАЛЬНЫМ ОКНОМ
let Modal = document.querySelector('.page-modal');
let ProductWeek = document.querySelector('.product-week__link');
let BasketCatalog = document.querySelector('.site-list__button-catalog');

if (ProductWeek) {
    ProductWeek.onclick = function() {
        Modal.classList.toggle('page-modal__hide');
        Modal.classList.toggle('page-modal__open');
    };
}

if (BasketCatalog) {
    BasketCatalog.onclick = function() {
        Modal.classList.toggle('page-modal__hide');
        Modal.classList.toggle('page-modal__open');
    };
}
