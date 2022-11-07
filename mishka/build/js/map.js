ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.938571432970626, 30.322957634925846],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'ул. Большая Конюшенная, д. 19/8, офис 101',
            balloonContent: 'ул. Большая Конюшенная, д. 19/8, офис 101'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/icon-map-pin.svg',
            // Размеры метки.
            iconImageSize: [67, 100],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -100]
        });

    myMap.geoObjects
        .add(myPlacemark);
});
