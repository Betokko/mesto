export default class Card{
    constructor(name, link, templateSelector, { handleCardClick }) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector('.insert-card__icon').addEventListener('click', this._handlerLikeButton)
        this._element.querySelector('.insert-card__remove').addEventListener('click', this._removeCard)
        this._element.querySelector('.insert-card__img').addEventListener('click', () => {
            this._handleCardClick();
        } )
    }

    _handlerLikeButton(evt) {
        evt.target.classList.toggle('insert-card__icon_active')
    }

    _removeCard(evt) {
        evt.target.closest('.insert-card__item').remove();
    }
    
};
