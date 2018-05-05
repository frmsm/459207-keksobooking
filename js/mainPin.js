'use strict';

(function () {
  var PIN_HEIGHT = 84;
  var PIN_WIDTH = 62;
  var BORDER_TOP = 150;
  var BORDER_BOTTOM = 500;
  var BORDER_LEFT = 300;
  var BORDER_RIGHT = 900;

  var MAIN_PIN_DEFAULT_LEFT_POS = 570;
  var MAIN_PIN_DEFAULT_TOP_POS = 375;

  var mapPins = document.querySelector('.map__pins');

  var mapBlock = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var getMainPinLocation = function () { // получение расположения главного пина
    return (mainPin.offsetLeft + PIN_WIDTH / 2) + ', '
      + (mainPin.offsetTop + PIN_HEIGHT);
  };

  var setMapVisibility = function (isFormVisible) {
    if (isFormVisible) {
      mapBlock.classList.remove('map--faded');
      return;
    }
    mapBlock.classList.add('map--faded');
    setMainPinDefault();
  };

  var setMainPinDefault = function () {
    mainPin.style.left = MAIN_PIN_DEFAULT_LEFT_POS + 'px';
    mainPin.style.top = MAIN_PIN_DEFAULT_TOP_POS + 'px';
    window.form.addressField.value = getMainPinLocation();
  };

  window.form.addressField.value = getMainPinLocation();

  var onMouseDown = function (e) {
    e.preventDefault();

    setMapVisibility(true);
    window.form.toggle(true);
    window.form.disableFields(false);

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

      window.pin.display();
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

  window.mainPin = {
    mapVisibility: setMapVisibility
  };
})();
