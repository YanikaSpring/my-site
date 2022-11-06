let popup = document.querySelector('.main-popup');
let buttonPopup = document.querySelector('.map-main__link');
let closePopup = document.querySelector('.main-popup__close');

buttonPopup.onclick = function() {
    popup.classList.toggle('main-popup__hide');
    popup.classList.toggle('main-popup__show');
};

closePopup.onclick = function() {
    popup.classList.toggle('main-popup__hide');
    popup.classList.toggle('main-popup__show');
};