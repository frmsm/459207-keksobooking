'use strict';

(function () {
  var MAX_PHOTOS = 10;
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photosDropZone = document.querySelector('.ad-form__drop-zone');
  var uploadedPhotos = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var avatarImg = document.querySelector('.ad-form-header__preview');
  var avatar = document.querySelector('#avatar');

  var draggedItem;
  var draggedWrapper;

  var addPhotos = function (fileList) {
    var renderPhotos = function (file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
          var photoWrapper = document.createElement('div');
          var img = document.createElement('img');
          var deletePhoto = document.createElement('span');
          photoWrapper.className = 'ad-form__photo';
          deletePhoto.className = 'ad-form__photo--delete';
          img.src = reader.result;
          img.width = 70;
          img.height = 70;
          photoWrapper.style.width = '70px';
          photoWrapper.style.height = '70px';
          photoWrapper.style.position = 'relative';
          photoWrapper.appendChild(img);
          photoWrapper.appendChild(deletePhoto);
          photoContainer.insertBefore(photoWrapper, photoContainer.lastElementChild);
          deletePhoto.addEventListener('click', function (e) {
            e.preventDefault();
            photoContainer.removeChild(e.target.parentNode);
          });
        });
      }
    };
    var photosCount = fileList.length > MAX_PHOTOS ? MAX_PHOTOS : fileList.length;
    for (var i = 0; i < photosCount; i++) {
      renderPhotos(fileList[i]);
    }
  };

  var addAvatar = function (fileList) {
    if (fileList[0].type.match(/image.*/)) {
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.addEventListener('load', function () {
        avatarImg.children[0].src = reader.result;
      });
    }
  };

  photoContainer.addEventListener('dragstart', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      draggedItem = e.target;
      draggedWrapper = e.target.parentNode;
      e.dataTransfer.setData('text/plain', e.target.alt);
    }
  });

  photoContainer.addEventListener('dragover', function (e) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === 'img') {
      var parent = e.target.parentNode;
      parent.style.border = '1px solid #ff6d51';
    }
  });

  photoContainer.addEventListener('dragleave', function (e) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === 'img') {
      var parent = e.target.parentNode;
      parent.style.border = 'none';
    }
  });

  photoContainer.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === 'img') {
      var droppedWrapper = e.target.parentNode;
      var droppedItem = e.target;
      droppedWrapper.removeChild(e.target);
      droppedWrapper.appendChild(draggedItem);
      draggedWrapper.appendChild(droppedItem);
      droppedWrapper.style.border = 'none';
    }
  });

  var onDragOver = function (e) {
    e.preventDefault();
    e.target.style.backgroundColor = '#ccc';
  };

  var onDragOut = function (e) {
    e.preventDefault();
    e.target.style.backgroundColor = '#f0f0ea';
  };

  var onDrop = function (fn, e) {
    e.preventDefault();

    var fileList;
    if (e.dataTransfer) {
      fileList = e.dataTransfer.files;
    } else {
      fileList = e.target.files;
    }
    fn(fileList);
    e.target.style.backgroundColor = '#f0f0ea';
  };

  var clearPhotos = function () {
    while (photoContainer.childElementCount > 2) {
      photoContainer.removeChild(photoContainer.children[1]);
    }
    avatarImg.children[0].src = DEFAULT_AVATAR_SRC;
  };

  photosDropZone.addEventListener('dragover', onDragOver);
  photosDropZone.addEventListener('dragleave', onDragOut);
  photosDropZone.addEventListener('drop', onDrop.bind(photosDropZone, addPhotos));
  uploadedPhotos.addEventListener('change', onDrop.bind(uploadedPhotos, addPhotos));

  avatarDropZone.addEventListener('dragover', onDragOver);
  avatarDropZone.addEventListener('dragleave', onDragOut);
  avatarDropZone.addEventListener('drop', onDrop.bind(avatarDropZone, addAvatar));
  avatar.addEventListener('change', onDrop.bind(avatar, addAvatar));

  window.photo = {
    default: clearPhotos
  };
})();
