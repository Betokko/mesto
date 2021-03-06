export default class Card {
    constructor(name, link, templateSelector, {
        handleCardClick
    }, {
        handleRemoveButton
    }, {
        addLike
    }, {
        removeLike
    }) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveButton = handleRemoveButton;
        this._addLike = addLike;
        this._removeLike = removeLike;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.insert-card__item')
            .cloneNode(true);
        return cardElement
    }

    renderCard(data) {
        this._element = this._getTemplate();
        this._likeCounter = this._element.querySelector('.insert-card__counter');
        this._cardImage = this._element.querySelector('.insert-card__img');
        this._element.querySelector('.insert-card__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeCounter.textContent = data.likes.length;
        data.likes.forEach(item => {
            if (item._id === "ba2f0eaed78a82ff94b11031") {
                this._element.querySelector('.insert-card__icon').classList.add('insert-card__icon_active')
            }
        })
        this._setEventListener();
        return this._element;
    }
    _setEventListener() {
        this._element.querySelector('.insert-card__icon').addEventListener('click', this._handlerLikeButton.bind(this))
        this._element.querySelector('.insert-card__remove').addEventListener('click', this._handleRemoveButton)
        this._cardImage.addEventListener('click', this._handleCardClick)
    }

    _handlerLikeButton(evt) {
        if (!evt.target.classList.contains('insert-card__icon_active')) {
            this._addLike(evt.target)
        } else {
            this._removeLike(evt.target)
        }
    }
    delete() {
        this._element.remove()
    }
};