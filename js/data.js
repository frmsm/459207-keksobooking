'use strict';
(function () {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
    'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png']; // Дополняется из формы

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']; // Доплняется из формы

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var CHECKS = ['12:00', '13:00', '14:00'];

  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // Дополняется из формы, но выглядить должен по другому

  var ROOMS = [1, 2, 3, 100];

  var CAPACITY = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];

  var BORDER_TOP = 150;
  var BORDER_BOTTOM = 500;
  var BORDER_LEFT = 300;
  var BORDER_RIGHT = 900;

  var getRandom = function (min, max) { // Рандом для вычисления max и min
    return (Math.floor(Math.random() * (max + 1 - min) + min));
  };

  // mathmodules
  var shuffleArray = function (arr) { // Перемешивание массива
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };

  // mathmodules
  var getArrayElement = function (arr) { // Извлечение случайного элемента массива с удалением элемента из массива
    var index = Math.floor(Math.random() * arr.length);
    var avatarLink = arr[index];
    arr.splice(index, 1);
    return avatarLink;
  };

  // передать в выдод из модуля data
  var getAvatar = function () { // Получение аватарки
    return getArrayElement(AVATARS);
  };

  // передать в выдод из модуля data
  var getTitle = function () { // Получение заголовка
    return getArrayElement(TITLES);
  };

  var getCheckTime = function () { // Получение времени
    return CHECKS[getRandom(0, CHECKS.length - 1)];
  };

  var getType = function (title) { // Получение типа жилища
    switch (title) {
      case 'Большая уютная квартира':
      case 'Маленькая неуютная квартира':
        return 'flat';

      case 'Огромный прекрасный дворец':
      case 'Маленький ужасный дворец':
        return 'palace';

      case 'Красивый гостевой домик':
      case 'Некрасивый негостеприимный домик':
        return 'house';

      case 'Уютное бунгало далеко от моря':
      case 'Неуютное бунгало по колено в воде':
        return 'bungalo';

      default:
        return 'none';
    }
  };

  var getPrice = function (type) { // Получить цену !!!переделать есть функция получения цены
    switch (type) {
      case 'flat':
        return getRandom(1000, 1000000);

      case 'palace':
        return getRandom(10000, 1000000);

      case 'bungalo':
        return getRandom(0, 1000000);

      case 'house':
        return getRandom(5000, 1000000);

      default:
        return false;
    }
  };

  // Максимальное и минимальное расположение точки на карте

  var getPhotos = function () { // Получение массива фото
    var tmpArr = PHOTOS.slice();
    shuffleArray(tmpArr);
    return tmpArr;
  };

  var getFeatures = function () { // Получение особенностей квартиры
    var tmpArr;
    tmpArr = FEATURES.slice();
    var arrLength = getRandom(0, tmpArr.length - 1);
    for (var i = 0; i <= arrLength; i++) {
      tmpArr.slice(0, getRandom(0, tmpArr.length - 1));
    }
    return tmpArr.slice(0, getRandom(0, tmpArr.length - 1));
  };

  var getLocationX = function () { // Получить расположение пина по горизонтали
    return getRandom(BORDER_LEFT, BORDER_RIGHT);
  };

  var getLocationY = function () { // Получить расположение пина по вертикали
    return getRandom(BORDER_TOP, BORDER_BOTTOM);
  };

  var getRooms = function () {
    return ROOMS[getRandom(0, ROOMS.length - 1)];
  };

  var getCapacity = function (rooms) {
    switch (rooms) {
      case 1:
        return CAPACITY[0];

      case 2:
        return CAPACITY[(getRandom(0, 1))];

      case 3:
        return CAPACITY[(getRandom(0, 2))];

      case 100:
        return 'не для гостей';

      default:
        return false;
    }
  };

  var MAX_PINS = 7; // Максимальное количество пинов

  var OFFERS = []; // Предложения

  var getOffer = function () { // Рандомная сборка объявление
    var LOCATION_X = getLocationX();
    var LOCATION_Y = getLocationY();
    var title = getTitle();
    var type = getType(title);
    var price = getPrice(type);
    var checkTime = getCheckTime();
    var rooms = getRooms();
    var capacity = getCapacity(rooms);
    var obj = {
      'author': {
        'avatar': getAvatar()
      },

      'offer': {
        'title': title,
        'address': '' + LOCATION_X + ', ' + LOCATION_Y,
        'price': price,
        'type': type,
        'rooms': rooms,
        'guests': capacity,
        'checkin': checkTime,
        'checkout': checkTime,
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

  var addOffers = function () { // добавление в массив обхектов объявлений
    for (var i = 0; i < MAX_PINS; i++) {
      OFFERS.push(getOffer());
    }
  };
  addOffers();


  var onError = function () {
    window.card.makeCard(OFFERS);
  };

  var onSuccess = function (data) {
    window.card.makeCard(data);
  };

  window.backend.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();

