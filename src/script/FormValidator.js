export default class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
        this._inputList = [...(this._formElement.querySelectorAll(this._data.inputSelector))];
        this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    }
    resetValidation() {
        this._inputList.forEach(input => {
            this._checkInputValidity(input)
        })
        this._toggleButtonState(this._inputList, this._buttonElement)
    }
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners()
    }
    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._buttonElement);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement)
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