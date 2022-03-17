import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(name, link, popupSelector) {
        super(popupSelector)
        this._name = name;
        this._link = link;
    }
    open() {
        super.open();
        this._popupSelector.querySelector('.popup__image').src = this._link;
        this._popupSelector.querySelector('.popup__image').alt = this._name;
        this._popupSelector.querySelector('.popup__image-descr').textContent = this._name;
    }
}