'use strict';

(function () {
  window.card = {
    makeCard: function (offers) {
      // Создание пина и карточки !!! нужно разделить
      var mapTemplate = document.querySelector('#map__template').content; // шаблон карты
      var mapCard = mapTemplate.querySelector('.map__card'); // карточка
      var mapPin = mapTemplate.querySelector('.map__pin'); // пин
      var setupFragment = document.createDocumentFragment(); // фрагмент для добавления в разметку

      for (var i = 0; i < offers.length; i++) { // цикл ввода данных в карточку
        var cardFragment = mapCard.cloneNode(true); // клонирование карточки
        var cardAvatar = cardFragment.querySelector('.popup__avatar');
        var cardTitle = cardFragment.querySelector('.popup__title');
        var cardAddress = cardFragment.querySelector('.popup__text--address');
        var cardPrice = cardFragment.querySelector('.popup__text--price');
        var cardType = cardFragment.querySelector('.popup__type');
        var cardCapacity = cardFragment.querySelector('.popup__text--capacity');
        var cardTime = cardFragment.querySelector('.popup__text--time');
        var cardFeatures = cardFragment.querySelector('.popup__features');
        var cardDescription = cardFragment.querySelector('.popup__description');
        var cardPhotos = cardFragment.querySelector('.popup__photos');

        var houseType = {
          'flat': 'Квартира',
          'house': 'Дом',
          'bungalo': 'Лачуга',
          'palace': 'Дворец'
        };

        while (cardFeatures.firstChild) { // удаление всех дочерних элементов в features
          cardFeatures.removeChild(cardFragment.children[8].firstChild);
        }

        while (cardPhotos.firstChild) { // удаление всех дочерних элементов в features
          cardPhotos.removeChild(cardPhotos.firstChild);
        }

        cardAvatar.src = offers[i].author.avatar;
        cardTitle.textContent = offers[i].offer.title;
        cardAddress.textContent = offers[i].offer.address + ' ';
        cardPrice.textContent = offers[i].offer.price + '₽/Ночь';
        cardType.textContent = houseType[offers[i].offer.type];
        cardCapacity.textContent = offers[i].offer.rooms + ' комнаты ' + 'для ' +
          offers[i].offer.guests + ' гостей';
        cardTime.textContent = 'Заезд полсле ' + offers[i].offer.checkin +
          ', выезд до ' + offers[i].offer.checkout;

        for (var j = 0; j < offers[i].offer.features.length; j++) {
          var listItem = document.createElement('li');
          listItem.classList.add('popup__feature');
          listItem.classList.add('popup__feature--' + offers[i].offer.features[j]);
          cardFeatures.appendChild(listItem); // добавление в класс родитель features
        }
        cardDescription.textContent = offers[i].offer.description;

        for (j = 0; j < offers[i].offer.photos.length; j++) {
          var photo = document.createElement('img');
          photo.classList.add('popup__photo');
          photo.width = 45;
          photo.height = 40;
          photo.alt = 'Фотография жилья';
          photo.src = offers[i].offer.photos[j];
          cardPhotos.appendChild(photo);
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
      var ads = document.createElement('div');
      ads.className = 'ads';
      ads.appendChild(setupFragment);
      window.pin.mainPin(ads);
    }
  };
})();
