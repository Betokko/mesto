export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  
  open() {
    this._popupSelector.classList.add('popup_enabled')
    this.setEventListeners()
    this._handleEscClose()
  }

  close() {
    this._popupSelector.classList.remove('popup_enabled')
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close()
      }
    })
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-btn').addEventListener('click', () => {
      this.close()
    })
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === document.querySelector('.popup_enabled')) {
        this.close()
      }
    })
  }
}