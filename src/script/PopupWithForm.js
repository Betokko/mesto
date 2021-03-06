import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {
        handleFormSubmit
    }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._form.querySelector('.popup__button')

    }
    open() {
        super.open()
        this._button.textContent = 'Сохранить';
    }

    close() {
        super.close()
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues(), this._button);
        })
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        this._formValues.likes = [];
        return this._formValues;
    }
}