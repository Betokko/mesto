export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorElement: '.popup__error',
  };
export class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
    }
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners()
    }
    _setEventListeners() {
        const inputList = [...(this._formElement.querySelectorAll(this._data.inputSelector))];
        const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList, buttonElement)
            });
        });
    }
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._data.inactiveButtonClass);
            buttonElement.setAttribute("disabled", "disabled");
        } else {
            buttonElement.classList.remove(this._data.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

            inputElement.classList.add(this._data.inputErrorClass);
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._data.errorClass);
          } else {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

            inputElement.classList.remove(this._data.inputErrorClass)
            errorElement.classList.remove(this._data.errorClass);
            errorElement.textContent = '';
          }
    }
};

