document.addEventListener("DOMContentLoaded",ready);let MapSite=document.querySelector(".contacts__map");function ready(){Menu.classList.toggle("main-navigation__hide"),ButtonMenu.classList.toggle("main-navigation__toggle-show"),MapSite.classList.remove("contacts__map-img"),MapSite.classList.toggle("contacts__map-yandex")}let Menu=document.querySelector(".main-navigation__wrapper"),ButtonMenu=document.querySelector(".main-navigation__toggle");ButtonMenu.onclick=function(){Menu.classList.toggle("main-navigation__hide"),ButtonMenu.classList.toggle("main-navigation__toggle-open"),Menu.classList.toggle("main-navigation__open"),ButtonMenu.classList.toggle("main-navigation__toggle-close")};let Modal=document.querySelector(".page-modal"),ProductWeek=document.querySelector(".product-week__link"),BasketCatalog=document.querySelector(".site-list__button-catalog");ProductWeek&&(ProductWeek.onclick=function(){Modal.classList.toggle("page-modal__hide"),Modal.classList.toggle("page-modal__open")}),BasketCatalog&&(BasketCatalog.onclick=function(){Modal.classList.toggle("page-modal__hide"),Modal.classList.toggle("page-modal__open")});