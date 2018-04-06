'use strict';

var getRandomNumber = function (min, max) {
  return (Math.floor(Math.random() * (max + 1 - min) + min));
};

var OFFERS = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '350, 200',
      'price': 200000,
      'type': 'house',
      'rooms': 3,
      'guests': 6,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },

    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '622, 403',
      'price': 320000,
      'type': 'palace',
      'rooms': 12,
      'guests': 6,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['parking', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': '805, 303',
      'price': 250000,
      'type': 'flat',
      'rooms': 4,
      'guests': 12,
      'checkin': '13:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },

    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '500, 400',
      'price': 200000,
      'type': 'bungalo',
      'rooms': 2,
      'guests': 4,
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },

    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '805, 210',
      'price': 100000,
      'type': 'bungalo',
      'rooms': 1,
      'guests': 3,
      'checkin': '12:00',
      'checkout': '12:00',
      'features': ['parking'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },

    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '603, 151',
      'price': 500000,
      'type': 'palace',
      'rooms': 15,
      'guests': 40,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },

    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '502, 190',
      'price': 200000,
      'type': 'flat',
      'rooms': 1,
      'guests': 3,
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },

    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '790, 400',
      'price': 140000,
      'type': 'house',
      'rooms': 3,
      'guests': 5,
      'checkin': '14:00',
      'checkout': '13:00',
      'features': ['wifi', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(150, 500)
    }
  }
];

var getMapOfferFragment = function () {
  var mapTemplate = document.querySelector('#map__template').content;
  var mapCard = mapTemplate.querySelector('.map__card');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var setupFragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS.length; i++) {
    var cardFragment = mapCard.cloneNode(true);
    while (cardFragment.children[8].firstChild) {
      cardFragment.children[8].removeChild(cardFragment.children[8].firstChild);
    }
    cardFragment.children[0].src = OFFERS[i].author.avatar;
    cardFragment.children[2].textContent = OFFERS[i].offer.title;
    cardFragment.children[3].textContent = OFFERS[i].offer.address;
    cardFragment.children[4].textContent = OFFERS[i].offer.price + 'Р/Ночь';
    cardFragment.children[5].textContent = OFFERS[i].offer.type;
    cardFragment.children[6].textContent = OFFERS[i].offer.rooms + ' комнаты для' + OFFERS[i].offer.rooms + ' гостей';
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
