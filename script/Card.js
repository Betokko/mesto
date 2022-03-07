import {openPopup, modalImg} from "./index.js"

class Card{
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;

    }
    _getTemplate () {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.insert-card__item')
            .cloneNode(true);
        return cardElement
    }
    renderCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.insert-card__title').textContent = this._name;
        this._element.querySelector('.insert-card__img').alt = this._name;
        this._element.querySelector('.insert-card__img').src = this._link;
        this._setEventListener();
        return this._element;
    }
    _setEventListener() {
        this._element.addEventListener('click', this._handlerLikeButton)
        this._element.addEventListener('click', this._removeCard)
        this._element.addEventListener('click', this._renderModalImg)
    }

    _handlerLikeButton(evt) {
        if (evt.target.classList.contains('insert-card__icon')) {
            evt.target.classList.toggle('insert-card__icon_active');
          }
    }

    _removeCard(evt) {
        if (evt.target.classList.contains('insert-card__remove')) {
            evt.target.closest('.insert-card__item').remove();
          }
    }
    _renderModalImg(evt) {
        const modalImgItem = document.querySelector('.popup__image');
        const modalImgText = document.querySelector('.popup__image-descr');
        modalImgItem.src = evt.target.src;
        modalImgItem.alt = evt.target.alt;
        modalImgText.textContent = evt.target.alt;
        openPopup(modalImg)
    }
};
export default Card;