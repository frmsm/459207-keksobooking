'use strict';

(function () {
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

  var setTypeValidation = function () { // валидация цены и типа
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

  var setCapacityDisabledField = function (disable) {
    for (var i = 0; i < capacityField.length; i++) {
      capacityField.children[i].disabled = disable[i];
    }
  };

  var setCapacitySelectedField = function (select) {
    for (var i = 0; i < capacityField.length; i++) {
      capacityField.children[i].selected = select[i];
    }
  };

  var setCapacityValidation = function () {
    if (roomField.children[0].selected) {
      setCapacityDisabledField([true, true, false, true]);
      setCapacitySelectedField([false, false, true, false]);
    } else if (roomField.children[1].selected) {
      setCapacityDisabledField([true, false, false, true]);
      setCapacitySelectedField([false, true, false, false]);
    } else if (roomField.children[2].selected) {
      setCapacityDisabledField([false, false, false, true]);
      setCapacitySelectedField([true, false, false, false]);
    } else if (roomField.children[3].selected) {
      setCapacityDisabledField([true, true, true, false]);
      setCapacitySelectedField([false, false, false, true]);
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
    var locations = addressField.value.split(', ');

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
        'x': locations[0],
        'y': locations[0]
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
  var adForm = document.querySelector('.ad-form');

  roomField.addEventListener('change', setCapacityValidation);
  typeField.addEventListener('change', setTypeValidation);
  checkinField.addEventListener('change', setCheckInTime);
  checkoutField.addEventListener('change', setCheckOutTime);
  adForm.addEventListener('submit', sendForm);

  setValidation();

  window.form = {
    addressField: addressField
  };
})();
