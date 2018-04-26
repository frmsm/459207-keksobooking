'use strict';

(function () {
  window.pin = {
    mainPin: function (documentBlock) {
      var PIN_HEIGHT = 84;
      var PIN_WIDTH = 62;
      var BORDER_TOP = 150;
      var BORDER_BOTTOM = 500;
      var BORDER_LEFT = 300;
      var BORDER_RIGHT = 900;

      var mapPins = document.querySelector('.map__pins');
      mapPins.appendChild(documentBlock); // добавление на карту пинов и карточек

      var mapBlock = document.querySelector('.map');
      var mainPin = document.querySelector('.map__pin--main');
      var adForm = document.querySelector('.ad-form');

      var getMainPinLocation = function () { // получение расположения главного пина
        return (mainPin.offsetLeft + PIN_WIDTH / 2) + ', '
          + (mainPin.offsetTop + PIN_HEIGHT);
      };

      var displayMapPins = function () { // отображение пинов
        var mapPinsArr = document.querySelectorAll('.map__pin');
        for (var i = 1; i < mapPinsArr.length; i++) {
          mapPinsArr[i].style.display = 'block';
        }
      };

      var currentPopUp; // карточка

      var hidePopUp = function () { // скрыть карточку
        if (currentPopUp) {
          currentPopUp.style.display = 'none';
        }
      };

      var onMapPinClick = function (e) { // обработка клика на пин
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

      var onPopUpCloseClick = function (e) { // закрытие карточки
        var target = e.target;
        if (target.className !== 'popup__close') {
          return;
        }
        mapPins.removeEventListener('click', onPopUpCloseClick);
        target.parentNode.style.display = 'none';
      };

      mapPins.addEventListener('click', onMapPinClick);

      // Обработка движения главного пина
      var onMouseDown = function (e) {
        e.preventDefault();

        mapBlock.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        var startCoords = {
          x: e.clientX,
          y: e.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();


          var shift = { // перемещение по карте
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          if ((mainPin.offsetTop - shift.y + PIN_HEIGHT) >= BORDER_BOTTOM) { // обработка пграниц
            mainPin.style.top = (BORDER_BOTTOM - PIN_HEIGHT) + 'px';
            startCoords.y = mapPins.getBoundingClientRect().top + BORDER_BOTTOM - PIN_HEIGHT / 2;
          } else if ((mainPin.offsetTop - shift.y + PIN_HEIGHT) < BORDER_TOP) {
            mainPin.style.top = (BORDER_TOP - PIN_HEIGHT) + 'px';
            startCoords.y = mapPins.getBoundingClientRect().top + BORDER_TOP - PIN_HEIGHT / 2;
          } else {
            mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
          }

          if ((mainPin.offsetLeft - shift.x + PIN_WIDTH / 2) > BORDER_RIGHT) {
            mainPin.style.left = (BORDER_RIGHT - PIN_WIDTH / 2) + 'px';
            startCoords.x = BORDER_RIGHT + mapPins.getBoundingClientRect().left;
          } else if ((mainPin.offsetLeft - shift.x + PIN_WIDTH / 2) < BORDER_LEFT) {
            mainPin.style.left = (BORDER_LEFT - PIN_WIDTH / 2) + 'px';
            startCoords.x = BORDER_LEFT + mapPins.getBoundingClientRect().left;
          } else {
            mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
          }
        };

        var onWheelMove = function (wheelEvt) { // запрет прокрутки во захвата
          wheelEvt.preventDefault();
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          displayMapPins();
          window.form.addressField.value = getMainPinLocation();

          document.removeEventListener('mousewheel', onWheelMove);
          mapBlock.removeEventListener('mousemove', onMouseMove);
          mapBlock.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousewheel', onWheelMove);
        mapBlock.addEventListener('mousemove', onMouseMove);
        mapBlock.addEventListener('mouseup', onMouseUp);
      };

      mainPin.addEventListener('mousedown', onMouseDown); // обработчик событий движения главного пина
    }
  };
})();
