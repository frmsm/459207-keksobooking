'use strict';

(function () {
  var houseType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Лачуга',
    'palace': 'Дворец'
  };

  var mapTemplate = document.querySelector('#map__template').content; // шаблон карты
  var mapCard = mapTemplate.querySelector('.map__card'); // карточка
  var mapPin = mapTemplate.querySelector('.map__pin'); // пин

  var shuffleArray = function (offersArr) {
    for (var i = offersArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = offersArr[i];
      offersArr[i] = offersArr[j];
      offersArr[j] = temp;
    }
    return offersArr;
  };

  window.card = {
    render: function (offers) {
      var setupFragment = document.createDocumentFragment(); // фрагмент для добавления в разметку

      var ads = offers.slice();

      if (ads.length > 5) {
        shuffleArray(ads);
        ads.splice(5);
      }

      var renderAds = function (ad) {
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

        while (cardFeatures.firstChild) { // удаление всех дочерних элементов в features
          cardFeatures.removeChild(cardFragment.children[8].firstChild);
        }

        while (cardPhotos.firstChild) { // удаление всех дочерних элементов в features
          cardPhotos.removeChild(cardPhotos.firstChild);
        }

        cardAvatar.src = ad.author.avatar;
        cardTitle.textContent = ad.offer.title;
        cardAddress.textContent = ad.offer.address + ' ';
        cardPrice.textContent = ad.offer.price + '₽/Ночь';
        cardType.textContent = houseType[ad.offer.type];
        cardCapacity.textContent = ad.offer.rooms + ' комнаты ' + 'для ' +
          ad.offer.guests + ' гостей';
        cardTime.textContent = 'Заезд полсле ' + ad.offer.checkin +
          ', выезд до ' + ad.offer.checkout;

        for (var j = 0; j < ad.offer.features.length; j++) {
          var listItem = document.createElement('li');
          listItem.classList.add('popup__feature');
          listItem.classList.add('popup__feature--' + ad.offer.features[j]);
          cardFeatures.appendChild(listItem); // добавление в класс родитель features
        }
        cardDescription.textContent = ad.offer.description;

        for (j = 0; j < ad.offer.photos.length; j++) {
          var photo = document.createElement('img');
          photo.classList.add('popup__photo');
          photo.width = 45;
          photo.height = 40;
          photo.alt = 'Фотография жилья';
          photo.src = ad.offer.photos[j];
          cardPhotos.appendChild(photo);
        }

        var pinFragment = mapPin.cloneNode(true); // Добавление пина
        pinFragment.src = ad.author.avatar;
        pinFragment.style = 'left:' + (ad.location.x + pinFragment.children[0].width / 2) +
          'px; top: ' + (ad.location.y - pinFragment.children[0].height) + 'px;';
        pinFragment.children[0].src = ad.author.avatar;
        pinFragment.children[0].alt = ad.offer.title;
        cardFragment.style.display = 'none';
        pinFragment.style.display = 'none';
        setupFragment.appendChild(cardFragment); // добавление в фрагмент карточки
        setupFragment.appendChild(pinFragment); // добавление в фрагмент карточки
      };

      ads.forEach(renderAds);

      var adsFragment = document.createElement('div');
      adsFragment.className = 'ads';
      adsFragment.appendChild(setupFragment);
      window.pin.set(adsFragment);
    }
  };
})();
