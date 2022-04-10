import Popup from "./Popup.js";

export default class ConfirmationPopup extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler
        this.card = null;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.popup__button_remove-card').addEventListener('click', this._submitHandler)
    }
    setCard(card, element) {
        this.card = card;
        this.card.element = element
    }

    getCard() {
        return this.card;
    }
}