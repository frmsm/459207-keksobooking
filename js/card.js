'use strict';

(function () { // Создание пина и карточки !!! нужно разделить
  var mapTemplate = document.querySelector('#map__template').content; // шаблон карты
  var mapCard = mapTemplate.querySelector('.map__card'); // карточка
  var mapPin = mapTemplate.querySelector('.map__pin'); // пин
  var setupFragment = document.createDocumentFragment(); // фрагмент для добавления в разметку
  var offers = window.data.getOffers;

  for (var i = 0; i < offers.length; i++) { // цикл ввода данных в карточку
    var cardFragment = mapCard.cloneNode(true); // клонирование карточки
    while (cardFragment.children[8].firstChild) { // удаление всех дочерних элементов в features
      cardFragment.children[8].removeChild(cardFragment.children[8].firstChild);
    }
    cardFragment.children[0].src = offers[i].author.avatar; // добаление элементов в карточку
    cardFragment.children[2].textContent = offers[i].offer.title;
    cardFragment.children[3].textContent = offers[i].offer.address + ' ';
    cardFragment.children[4].textContent = offers[i].offer.price + '₽/Ночь';
    cardFragment.children[5].textContent = offers[i].offer.type;
    cardFragment.children[6].textContent = offers[i].offer.rooms + ' комнаты ' + offers[i].offer.guests;
    cardFragment.children[7].textContent = 'Заезд полсле ' + offers[i].offer.checkin +
      ', выезд до ' + offers[i].offer.checkout;
    for (var j = 0; j < offers[i].offer.features.length; j++) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + offers[i].offer.features[j]);
      cardFragment.children[8].appendChild(listItem); // добавление в класс родитель features
    }
    cardFragment.children[9].textContent = offers[i].offer.description;
    if (cardFragment.children[10].childElementCount < offers[i].offer.photos.length) {
      for (j = cardFragment.children[10].childElementCount; j < offers[i].offer.photos.length; j++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        cardFragment.children[10].appendChild(photo);
      }
    }
    for (j = 0; j < offers[i].offer.photos.length; j++) {
      cardFragment.children[10].children[j].src = offers[i].offer.photos[j];
    }
    var pinFragment = mapPin.cloneNode(true); // Добавление пина
    pinFragment.src = offers[i].author.avatar;
    pinFragment.style = 'left:' + (offers[i].location.x + pinFragment.children[0].width / 2) +
      'px; top: ' + (offers[i].location.y - pinFragment.children[0].height) + 'px;';
    pinFragment.children[0].src = offers[i].author.avatar;
    pinFragment.children[0].alt = offers[i].offer.title;
    cardFragment.style.display = 'none';
    pinFragment.style.display = 'none';
    setupFragment.appendChild(cardFragment); // добавление в фрагмент карточки
    setupFragment.appendChild(pinFragment); // добавление в фрагмент карточки
  }

  // return setupFragment;
  window.card = {
    fragment: setupFragment
  };
})();
