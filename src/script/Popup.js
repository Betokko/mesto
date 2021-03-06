export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseIcon = this._handleCloseIcon.bind(this);
    this._handleClickOnOverlay = this._handleClickOnOverlay.bind(this);
    this._closeIcon = this._popupSelector.querySelector('.popup__close-btn');
  }

  open() {
    this._popupSelector.classList.add('popup_enabled')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupSelector.classList.remove('popup_enabled');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
  _handleCloseIcon() {
    this.close()
  }
  _handleClickOnOverlay(evt) {
    if (evt.target === document.querySelector('.popup_enabled')) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', this._handleCloseIcon)
    this._popupSelector.addEventListener('click', this._handleClickOnOverlay)
  }
}