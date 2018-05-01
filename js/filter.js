'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilers = document.querySelector('.map__filters');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var lastTimeout;

  var onHouseTypeChange = function (ad) {
    if (housingType[housingType.selectedIndex].value === 'any') {
      return ad;
    }
    return ad.offer.type === housingType[housingType.selectedIndex].value;
  };

  var onPriceTypeChange = function (ad) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low':
        return ad.offer.price <= 10000;
      case 'middle':
        return ad.offer.price >= 10000 && ad.offer.price <= 50000;
      case 'high':
        return ad.offer.price >= 50000;
      default:
        return ad;
    }
  };

  var onRoomsTypeChange = function (ad) {
    if (housingRooms[housingRooms.selectedIndex].value === 'any') {
      return ad;
    }
    return ad.offer.rooms === parseInt(housingRooms[housingRooms.selectedIndex].value, 10);
  };

  var onGuestTypeChange = function (ad) {
    if (housingGuests[housingGuests.selectedIndex].value === 'any') {
      return ad;
    }
    return ad.offer.guests === parseInt(housingGuests[housingGuests.selectedIndex].value, 10);
  };

  var onFeatureChange = function (ad) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && ad.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var updateAds = function () {
    var ads = window.data.offers.slice();
    var filteredAds =
      ads.filter(onHouseTypeChange)
          .filter(onPriceTypeChange)
          .filter(onRoomsTypeChange)
          .filter(onGuestTypeChange)
          .filter(onFeatureChange);
    window.pin.clearMap();
    window.card.makeCard(filteredAds);
    window.pin.displayMapPins();
  };

  var onFilterChange = function () {
    if (!window.data.offers) {
      return;
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      lastTimeout = null;
    }
    lastTimeout = window.setTimeout(updateAds, 50);
  };

  mapFilers.addEventListener('change', onFilterChange);
})();

