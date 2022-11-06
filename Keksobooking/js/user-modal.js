const ALERT_SHOW_TIME = 5000;

const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const isEscEvent = (evt) => evt.key === 'Escape';


const showSuccessMessage = () => {
  const node = messageSuccessTemplate.cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      node.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const onMessageClick = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  document.body.appendChild(node);

  document.addEventListener('keydown', onDocumentKeydown);
  node.addEventListener('click', onMessageClick);

};


const showErrorMessage = () => {
  const node = messageErrorTemplate.cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      node.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const onMessageClick = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  const errorButton = node.querySelector('.error__button');

  document.body.appendChild(node);
  document.addEventListener('keydown', onDocumentKeydown);
  node.addEventListener('click', onMessageClick);
  errorButton.addEventListener('click', onMessageClick);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessMessage, showErrorMessage, showAlert};
