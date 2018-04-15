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
    cardFragment.style.display = 'none';
    pinFragment.style.display = 'none';
    setupFragment.appendChild(cardFragment);
    setupFragment.appendChild(pinFragment);
  }

  return setupFragment;
};

var PIN_HEIGHT = 84;
var PIN_WIDTH = 62;

var mapPins = document.querySelector('.map__pins');
var documentBlock = getMapOfferFragment();
mapPins.appendChild(documentBlock);

var mapBlock = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var onMouseUp = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  displayMapPins();
  fillInput(addressField);
};

var fillInput = function (inputName) {
  inputName.value = getMainPinLocation();
};

var getMainPinLocation = function () {
  return (parseInt(mainPin.style.left, 10) + PIN_WIDTH) + ', '
    + (parseInt(mainPin.style.top, 10) + PIN_HEIGHT);
};

var displayMapPins = function () {
  var mapPinsArr = document.querySelectorAll('.map__pin');
  for (var i = 1; i < mapPinsArr.length; i++) {
    mapPinsArr[i].style.display = 'block';
  }
};

var currentPopUp;

var hidePopUp = function () {
  if (currentPopUp) {
    currentPopUp.style.display = 'none';
  }
};

var onMapPinClick = function (e) {
  var target = e.target;
  if (target.tagName === 'IMG' || target.className === 'map__pin') {
    if (target.className === 'map__pin map__pin--main'
      || target.parentNode.className === 'map__pin map__pin--main') {
      return;
    }
    if (target.previousSibling) {
      hidePopUp();
      target.previousSibling.style.display = 'block';
      currentPopUp = target.previousSibling;
    } else {
      hidePopUp();
      target.parentNode.previousSibling.style.display = 'block';
      currentPopUp = target.parentNode.previousSibling;
    }
  }
  mapPins.addEventListener('click', onPopUpCloseClick);
};

var onPopUpCloseClick = function (e) {
  var target = e.target;
  if (target.className !== 'popup__close') {
    return;
  }
  mapPins.removeEventListener('click', onPopUpCloseClick);
  target.parentNode.style.display = 'none';
};

mainPin.addEventListener('mouseup', onMouseUp);
mapPins.addEventListener('click', onMapPinClick);

// Валидация
var setTitleValidation = function () {
  titleField.required = true;
  titleField.minLength = '30';
  titleField.maxLength = '100';
};

var setAddressValidation = function () {
  addressField.disabled = true;
};

var setPriceField = function () {
  priceField.required = true;
  priceField.max = '1000000';
};

var changePriceField = function (minPrice) {
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
};

var setTypeValidation = function () {
  if (typeField.children[0].selected) {
    changePriceField('1000');
  } else if (typeField.children[1].selected) {
    changePriceField('0');
  } else if (typeField.children[2].selected) {
    changePriceField('5000');
  } else if (typeField.children[3].selected) {
    changePriceField('10000');
  }
};

var setCapacityDisabledField = function (disable1, disable2, disable3, disable4) {
  capacityField.children[0].disabled = disable1;
  capacityField.children[1].disabled = disable2;
  capacityField.children[2].disabled = disable3;
  capacityField.children[3].disabled = disable4;
};

var setCapacitySelectedField = function (select1, select2, select3, select4) {
  capacityField.children[0].selected = select1;
  capacityField.children[1].selected = select2;
  capacityField.children[2].selected = select3;
  capacityField.children[3].selected = select4;
};

var setCapacityValidation = function () {
  if (roomField.children[0].selected) {
    setCapacityDisabledField(true, true, false, true);
    setCapacitySelectedField(false, false, true, false);
  } else if (roomField.children[1].selected) {
    setCapacityDisabledField(true, false, false, true);
    setCapacitySelectedField(false, true, false, false);
  } else if (roomField.children[2].selected) {
    setCapacityDisabledField(false, false, false, true);
    setCapacitySelectedField(true, false, false, false);
  } else if (roomField.children[3].selected) {
    setCapacityDisabledField(true, true, true, false);
    setCapacitySelectedField(false, false, false, true);
  }
};

var setTimeSelectedField = function (time, select1, select2, select3) {
  time.children[0].selected = select1;
  time.children[1].selected = select2;
  time.children[2].selected = select3;
};

var setCheckInTime = function () {
  if (checkinField.children[0].selected) {
    setTimeSelectedField(checkoutField, true, false, false);
  } else if (checkinField.children[1].selected) {
    setTimeSelectedField(checkoutField, false, true, false);
  } else if (checkinField.children[2].selected) {
    setTimeSelectedField(checkoutField, false, false, true);
  }
};

var setCheckOutTime = function () {
  if (checkoutField.children[0].selected) {
    setTimeSelectedField(checkinField, true, false, false);
  } else if (checkoutField.children[1].selected) {
    setTimeSelectedField(checkinField, false, true, false);
  } else if (checkoutField.children[2].selected) {
    setTimeSelectedField(checkinField, false, false, true);
  }
};

var sendForm = function () {
  var features = [];

  for (var i = 0; i < featuresField.length; i++) {
    if (featuresField[i].checked) {
      features.push(featuresField[i].value);
    }
  }

  var data = {
    'author': {
      'avatar': '',
    },

    'offer': {
      'title': titleField.value,
      'address': addressField.value,
      'price': priceField.value,
      'type': typeField.value,
      'rooms': roomField.value,
      'guests': capacityField.value,
      'checkin': checkinField.value,
      'checkout': checkoutField.value,
      'features': features,
      'description': descriptionField.value,
      'photos': ''
    },

    'location': {
      'x': parseInt(mainPin.style.left, 10) + PIN_WIDTH,
      'y': parseInt(mainPin.style.top, 10) + PIN_HEIGHT
    }
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://js.dump.academy/keksobooking', true);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return;
    }
  };
  xhr.send(data);
};

var setValidation = function () {
  setAddressValidation();
  setCapacityValidation();
  setTitleValidation();
  setTypeValidation();
  setPriceField();
};

var titleField = document.querySelector('#title');
var addressField = document.querySelector('#address');
var typeField = document.querySelector('#type');
var roomField = document.querySelector('#room_number');
var capacityField = document.querySelector('#capacity');
var priceField = document.querySelector('#price');
var checkinField = document.querySelector('#timein');
var checkoutField = document.querySelector('#timeout');
var descriptionField = document.querySelector('#description');
var featuresField = document.querySelectorAll('.feature__checkbox');

roomField.addEventListener('change', setCapacityValidation);
typeField.addEventListener('change', setTypeValidation);
checkinField.addEventListener('change', setCheckInTime);
checkoutField.addEventListener('change', setCheckOutTime);
adForm.addEventListener('submit', sendForm);

setValidation();
