const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhotoAds = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotoAds = document.querySelector('.ad-form__photo');

const onInputPhotoChange = (evt, type, input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatch) {
    switch (type) {
      case 'avatar':
        previewAvatar.src = URL.createObjectURL(file);
        break;
      case 'room':
        previewPhotoAds.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        previewPhotoAds.style.backgroundSize = 'cover';
        break;
    }
  }
};

const initLoadPhoto = () => {
  fileChooserAvatar.addEventListener('change', (evt) => onInputPhotoChange(evt, 'avatar', fileChooserAvatar));
  fileChooserPhotoAds.addEventListener('change', (evt) => onInputPhotoChange(evt, 'room', fileChooserPhotoAds));
};

const resetPhotos = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhotoAds.style.background = '#e4e4de';
};

export {initLoadPhoto, resetPhotos};
