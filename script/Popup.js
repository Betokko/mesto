export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }
    open() {
        this._popupSelector.classList.add('popup_enabled');
        this._popupSelector.addEventListener('click', this.setEventListeners.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    };
    close() {
        this._popupSelector.removeEventListener('click', this.setEventListeners);
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.remove('popup_enabled');
    };
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    };
    setEventListeners(evt) {
        if ( evt.target === document.querySelector('.popup_enabled') || 
        evt.target.classList.contains('popup__close-btn')) {
            this.close();
      };
    };
}


class PopupWithForm extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    _getInputValues() {}
    setEventListeners() {

    }
}