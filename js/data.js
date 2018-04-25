'use strict';
(function () {

  var onError = function (mess) {
    var mapBlock = document.querySelector('.map');
    var err = window.errModule.message(mess);
    window.modal.win(mapBlock, err);
  };

  var onSuccess = function (data) {
    window.card.makeCard(data);
  };

  window.backend.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();

