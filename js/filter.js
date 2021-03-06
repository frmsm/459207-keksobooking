'use strict';

(function () {
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilers = document.querySelector('.map__filters');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var lastTimeout;

  var onPriceTypeChange = function (ad) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low':
        return ad.offer.price <= LOW_PRICE;
      case 'middle':
        return ad.offer.price >= LOW_PRICE && ad.offer.price <= MIDDLE_PRICE;
      case 'high':
        return ad.offer.price >= MIDDLE_PRICE;
      default:
        return ad;
    }
  };

  var onFeatureChange = function (ad) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && ad.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var onChangeFilterType = function (type, ad) {
    var targetSelector;

    switch (type) {
      case 'type':
        targetSelector = housingType;
        break;
      case 'rooms':
        targetSelector = housingRooms;
        break;
      case 'guests':
        targetSelector = housingGuests;
        break;
      default:
        break;
    }

    return onTypeChange(targetSelector[targetSelector.selectedIndex].value, ad.offer[type]);
  };

  var onTypeChange = function (valueToCompare, ad) {
    if (valueToCompare === 'any') {
      return ad;
    }
    if (isNaN(parseInt(valueToCompare, 10))) {
      return ad === valueToCompare;
    } else {
      return ad === parseInt(valueToCompare, 10);
    }
  };

  var updateAds = function () {
    var ads = window.data.offers.slice();
    var filteredAds =
      ads.filter(onChangeFilterType.bind(null, 'type'))
          .filter(onPriceTypeChange)
          .filter(onChangeFilterType.bind(null, 'rooms'))
          .filter(onChangeFilterType.bind(null, 'guests'))
          .filter(onFeatureChange);
    window.pin.clearMap();
    window.card.render(filteredAds);
    window.pin.display();
  };

  var onFilterChange = function () {
    if (!window.data.offers) {
      return;
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      lastTimeout = null;
    }
    lastTimeout = window.setTimeout(updateAds, 500);
  };

  window.filter = {
    default: function () {
      housingType.selectedIndex = 0;
      housingPrice.selectedIndex = 0;
      housingRooms.selectedIndex = 0;
      housingGuests.selectedIndex = 0;
      housingFeatures.forEach(function (feature) {
        feature.checked = false;
      });
    }
  };

  mapFilers.addEventListener('change', onFilterChange);
})();

