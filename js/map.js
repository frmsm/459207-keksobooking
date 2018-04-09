'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png'];

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var CHECKS = ['12:00', '13:00', '14:00'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandom = function (min, max) {
  return (Math.floor(Math.random() * (max + 1 - min) + min));
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

var getArrayElement = function (arrElement) {
  var index = Math.floor(Math.random() * arrElement.length);
  var avatarLink = arrElement[index];
  arrElement.splice(index, 1);
  return avatarLink;
};

var getAvatar = function () {
  return getArrayElement(AVATARS);
};

var getTitle = function () {
  return getArrayElement(TITLES);
};

var getCheckTime = function () {
  return CHECKS[getRandom(0, CHECKS.length - 1)];
};

var getType = function (title) {
  if (title === 'Большая уютная квартира' || title === 'Маленькая неуютная квартира') {
    return 'flat';
  } else if (title === 'Огромный прекрасный дворец' || title === 'Маленький ужасный дворец') {
    return 'palace';
  } else if (title === 'Красивый гостевой домик' || title === 'Некрасивый негостеприимный домик') {
    return 'house';
  } else if (title === 'Уютное бунгало далеко от моря'
    || title === 'Неуютное бунгало по колено в воде0') {
    return 'bungalo';
  }
  return 'none';
};

var getPhotos = function () {
  var tmpArr = PHOTOS.slice();
  shuffleArray(tmpArr);
  return tmpArr;
};

var getFeatures = function () {
  var tmpArr;
  tmpArr = FEATURES.slice();
  shuffleArray(tmpArr);
  return tmpArr.slice(0, getRandom(0, tmpArr.length - 1));
};

var getLocationX = function () {
  return getRandom(300, 900);
};

var getLocationY = function () {
  return getRandom(150, 500);
};

var getRooms = function () {
  return getRandom(1, 20);
};

var getGuests = function () {
  return getRandom(1, 20);
};

var getPrice = function () {
  return getRandom(100, 200000);
};

var LOCATION_X;
var LOCATION_Y;

var MAX_PINS = 7;

var OFFERS = [];

var getOffer = function () {
  LOCATION_X = getLocationX();
  LOCATION_Y = getLocationY();
  var title = getTitle();
  var obj = {
    'author': {
      'avatar': getAvatar()
    },

    'offer': {
      'title': title,
      'address': '' + LOCATION_X + ', ' + LOCATION_Y,
      'price': getPrice(),
      'type': getType(title),
      'rooms': getRooms(),
      'guests': getGuests(),
      'checkin': getCheckTime(),
      'checkout': getCheckTime(),
      'features': getFeatures(),
      'description': '',
      'photos': getPhotos()
    },

    'location': {
      'x': LOCATION_X,
      'y': LOCATION_Y
    }
  };
  return obj;
};

var addOffers = function () {
  for (var i = 0; i < MAX_PINS; i++) {
    OFFERS.push(getOffer());
  }
};

var getMapOfferFragment = function () {
  var mapTemplate = document.querySelector('#map__template').content;
  var mapCard = mapTemplate.querySelector('.map__card');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var setupFragment = document.createDocumentFragment();
  addOffers();

  for (var i = 0; i < OFFERS.length; i++) {
    var cardFragment = mapCard.cloneNode(true);
    while (cardFragment.children[8].firstChild) {
      cardFragment.children[8].removeChild(cardFragment.children[8].firstChild);
    }
    cardFragment.children[0].src = OFFERS[i].author.avatar;
    cardFragment.children[2].textContent = OFFERS[i].offer.title;
    cardFragment.children[3].textContent = OFFERS[i].offer.address + ' ';
    cardFragment.children[4].textContent = OFFERS[i].offer.price + '₽/Ночь';
    cardFragment.children[5].textContent = OFFERS[i].offer.type;
    cardFragment.children[6].textContent = OFFERS[i].offer.rooms + ' комнаты для ' + OFFERS[i].offer.guests + ' гостей';
    cardFragment.children[7].textContent = 'Заезд полсле ' + OFFERS[i].offer.checkin +
                                          ', выезд до ' + OFFERS[i].offer.checkout;
    for (var j = 0; j < OFFERS[i].offer.features.length; j++) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + OFFERS[i].offer.features[j]);
      cardFragment.children[8].appendChild(listItem);
    }
    cardFragment.children[9].textContent = OFFERS[i].offer.description;
    if (cardFragment.children[10].childElementCount < OFFERS[i].offer.photos.length) {
      for (j = cardFragment.children[10].childElementCount; j < OFFERS[i].offer.photos.length; j++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        cardFragment.children[10].appendChild(photo);
      }
    }
    for (j = 0; j < OFFERS[i].offer.photos.length; j++) {
      cardFragment.children[10].children[j].src = OFFERS[i].offer.photos[j];
    }
    var pinFragment = mapPin.cloneNode(true);
    pinFragment.src = OFFERS[i].author.avatar;
    pinFragment.style = 'left:' + (OFFERS[i].location.x + pinFragment.children[0].width / 2) +
      'px; top: ' + (OFFERS[i].location.y - pinFragment.children[0].height) + 'px;';
    pinFragment.children[0].src = OFFERS[i].author.avatar;
    pinFragment.children[0].alt = OFFERS[i].offer.title;
    setupFragment.appendChild(cardFragment);
    setupFragment.appendChild(pinFragment);
  }
  return setupFragment;
};

var mapPins = document.querySelector('.map__pins');
var documentBlock = getMapOfferFragment();
mapPins.appendChild(documentBlock);

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
