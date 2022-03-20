import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }
    open(name, link) {
        super.open()
        this._cardImage = this._popupSelector.querySelector('.popup__image');
        this._cardImage.src = link;
        this._cardImage.alt = name;
        this._popupSelector.querySelector('.popup__image-descr').textContent = name;
    }
}