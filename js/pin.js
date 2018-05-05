'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var mapPins = document.querySelector('.map__pins');
  window.pin = {
    set: function (documentBlock) {

      mapPins.appendChild(documentBlock);

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
        mapPins.addEventListener('keydown', onPopUpEscKeyPressed);
      };

      var onPopUpEscKeyPressed = function (e) {
        if (e.keyCode === ESC_KEY_CODE) {
          mapPins.removeEventListener('click', onPopUpCloseClick);
          mapPins.removeEventListener('keydown', onPopUpEscKeyPressed);
          e.target.previousSibling.style.display = 'none';
        }
      };

      var onPopUpCloseClick = function (e) {
        var target = e.target;
        if (target.className !== 'popup__close') {
          return;
        }
        mapPins.removeEventListener('click', onPopUpCloseClick);
        mapPins.removeEventListener('keydown', onPopUpEscKeyPressed);
        target.parentNode.style.display = 'none';
      };

      mapPins.addEventListener('click', onMapPinClick);
    },

    display: function () {
      var mapPinsArr = document.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPinsArr.length; i++) {
        mapPinsArr[i].style.display = 'block';
      }
    },

    clearMap: function () {
      var ads = document.querySelector('.ads');
      if (ads) {
        mapPins.removeChild(ads);
      }
    }
  };
})();
