'use strict';

(function () {
  window.modal = {
    win: function (elem, str) {
      var modal = document.createElement('div');
      modal.className = 'modal';
      modal.style.position = 'fixed';
      modal.style.padding = '5px';
      modal.style.width = '300px';
      modal.style.height = '100px';
      modal.style.left = '40vw';
      modal.style.top = '300px';
      modal.style.backgroundColor = 'grey';
      modal.style.textAlign = 'center';
      modal.style.zIndex = '100';
      var text = document.createElement('p');
      text.textContent = str;
      text.style.margin = '0';
      text.style.lineHeight = '45px';
      modal.appendChild(text);
      var close = document.createElement('button');
      close.textContent = 'OK';
      modal.appendChild(close);
      elem.appendChild(modal);

      var onModalClick = function () {
        elem.removeChild(modal);
        close.removeEventListener('click', onModalClick);
      };

      close.addEventListener('click', onModalClick);
    }
  };
})();
