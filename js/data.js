'use strict';

(function () {

  var onError = function (mess) {
    var mapBlock = document.querySelector('.map');
    var err = window.report.message(mess);
    window.modal.win(mapBlock, err);
  };

  var onSuccess = function (data) {
    window.card.makeCard(data);

    window.data = {
      offers: data
    };
  };

  window.backend.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();

