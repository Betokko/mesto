const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const showError = (formElement, inputElement, errorMessage, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
}

const hideError = (formElement, inputElement, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(data.inputErrorClass)
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, data) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideError(formElement, inputElement, data);
  }
}

const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, data)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, buttonElement, data)
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, data) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(data.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(data.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, data)
  })
}
