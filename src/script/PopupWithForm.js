import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {
        handleFormSubmit
    }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('form');
        this._inputList = this._form.querySelectorAll('.popup__input');

    }

    close() {
        super.close()
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const button = evt.target.querySelector('.popup__button')
            this._handleFormSubmit(this._getInputValues(), button);
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