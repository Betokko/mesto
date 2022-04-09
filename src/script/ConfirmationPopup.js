import Popup from "./Popup.js";

export default class ConfirmationPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    setEventListeners(removeCard) {
        super.setEventListeners();
        this._popupSelector.querySelector('.popup__button_remove-card').addEventListener('click', removeCard)
    }
}