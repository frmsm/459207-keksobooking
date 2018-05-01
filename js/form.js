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

  var priceType = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };

  var setTypeValidation = function () { // валидация цены и типа
    changePriceField(priceType[typeField.options[typeField.selectedIndex].value]);
  };

  var setCapacityDisabledField = function (disable) {
    for (var i = 0; i < capacityField.length; i++) {
      capacityField.children[i].disabled = disable[i];
    }
  };

  var setCapacityValidation = function () {
    switch (roomField.selectedIndex) {
      case 0:
        setCapacityDisabledField([true, true, false, true]);
        capacityField.selectedIndex = 2;
        break;
      case 1:
        setCapacityDisabledField([true, false, false, true]);
        capacityField.selectedIndex = 1;
        break;
      case 2:
        setCapacityDisabledField([false, false, false, true]);
        capacityField.selectedIndex = 0;
        break;
      case 3:
        setCapacityDisabledField([true, true, true, false]);
        capacityField.selectedIndex = 3;
        break;
    }
  };

  var setCheckInTime = function () {
    checkoutField.selectedIndex = checkinField.selectedIndex;
  };

  var setCheckOutTime = function () {
    checkinField.selectedIndex = checkoutField.selectedIndex;
  };

  var setValidation = function () {
    setCapacityValidation();
    setTitleValidation();
    setTypeValidation();
    setPriceField();
  };

  var onResetClick = function () {
    changePriceField(priceType['flat']);
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

  setValidation();

  roomField.addEventListener('change', setCapacityValidation);
  typeField.addEventListener('change', setTypeValidation);
  checkinField.addEventListener('change', setCheckInTime);
  checkoutField.addEventListener('change', setCheckOutTime);
  form.addEventListener('reset', onResetClick);

  window.form = {
    addressField: addressField
  };

  var onError = function (message) {
    var err = window.report.message(message);
    window.modal.win(form, err);
  };

  var onSuccess = function (message) {
    form.reset();
    var modalMessage = window.report.message(message);
    window.modal.win(form, modalMessage);
  };

  window.backend.upload(form, 'https://js.dump.academy/keksobooking', onSuccess, onError);
})();
