'use strict';

(function () {
  var setTitleValidation = function () {
    titleField.required = true;
    titleField.minLength = '30';
    titleField.maxLength = '100';
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
    switch (true) {
      case typeField.children[0].selected:
        changePriceField('1000');
        break;
      case typeField.children[1].selected:
        changePriceField('0');
        break;
      case typeField.children[2].selected:
        changePriceField('5000');
        break;
      case typeField.children[3].selected:
        changePriceField('10000');
        break;
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
    switch (true) {
      case roomField.children[0].selected:
        setCapacityDisabledField([true, true, false, true]);
        setCapacitySelectedField([false, false, true, false]);
        break;
      case roomField.children[1].selected:
        setCapacityDisabledField([true, false, false, true]);
        setCapacitySelectedField([false, true, false, false]);
        break;
      case roomField.children[2].selected:
        setCapacityDisabledField([false, false, false, true]);
        setCapacitySelectedField([true, false, false, false]);
        break;
      case roomField.children[3].selected:
        setCapacityDisabledField([true, true, true, false]);
        setCapacitySelectedField([false, false, false, true]);
        break;
    }
  };

  var setTimeSelectedField = function (time, select1, select2, select3) {
    time.children[0].selected = select1;
    time.children[1].selected = select2;
    time.children[2].selected = select3;
  };

  var setCheckInTime = function () {
    switch (true) {
      case checkinField.children[0].selected:
        setTimeSelectedField(checkoutField, true, false, false);
        break;
      case checkinField.children[1].selected:
        setTimeSelectedField(checkoutField, false, true, false);
        break;
      case checkinField.children[2].selected:
        setTimeSelectedField(checkoutField, false, false, true);
        break;
    }
  };

  var setCheckOutTime = function () {
    switch (true) {
      case checkoutField.children[0].selected:
        setTimeSelectedField(checkoutField, true, false, false);
        break;
      case checkoutField.children[1].selected:
        setTimeSelectedField(checkoutField, false, true, false);
        break;
      case checkoutField.children[2].selected:
        setTimeSelectedField(checkoutField, false, false, true);
        break;
    }
  };

  var setValidation = function () {
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

  var form = document.querySelector('.ad-form');

  roomField.addEventListener('change', setCapacityValidation);
  typeField.addEventListener('change', setTypeValidation);
  checkinField.addEventListener('change', setCheckInTime);
  checkoutField.addEventListener('change', setCheckOutTime);

  setValidation();

  window.form = {
    addressField: addressField
  };

  var onError = function (message) {
    var err = window.errModule.message(message);
    window.modal.win(form, err);
  };

  var onSuccess = function (message) {
    form.reset();
    var modalMessage = window.errModule.message(message);
    window.modal.win(form, modalMessage);
  };

  window.backend.upload(form, 'https://js.dump.academy/keksobooking', onSuccess, onError);
})();
