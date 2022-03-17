import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
// export {openPopup, modalImg};

// Global scope
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorElement: '.popup__error',
};
const initialCards = [
  {
    name: 'Jotaro',
    link: './images/jojo/jotaro.webp'
  },
  {
    name: 'Joseph',
    link: './images/jojo/joseph.png'
  },
  {
    name: 'Dio',
    link: './images/jojo/dio.png'
  },
  {
    name: 'Avdol',
    link: './images/jojo/avdol.png'
  },
  {
    name: 'Kakyoin',
    link: './images/jojo/kakyoin.png'
  },
  {
    name: 'Polnareff',
    link: './images/jojo/polnareff.png'
  }
]; 
const formModalProfile = document.querySelector('.popup_profile');
const formElementProfile = document.querySelector('.popup__body_profile');
const openBtnProfile = document.querySelector('.profile__edit-button');
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const formName = document.querySelector('.popup__name')
const formDescr = document.querySelector('.popup__descr')
const formModalCard = document.querySelector('.popup_card');
const formElementCard = document.querySelector('.popup__body_card');
const openBtnCard = document.querySelector('.profile__add-button');
const closeBtnCard = document.querySelector('.popup__close-btn_card');
const cardName = document.querySelector('.popup__card-name');
const cardDescr = document.querySelector('.popup__card-descr');
const insertCardContainer = document.querySelector('.insert-card');
const modalImg = document.querySelector('.popup_img');
const insertCardTemplate = document.querySelector('#insert-card').content;
const insertCardElement = insertCardTemplate.querySelector('.insert-card__item');
const openBtnImg = document.querySelector('.insert-card__img');
const closeBtnImg = document.querySelector('.popup__close-btn_img');

const formValidator = new FormValidator(config, formModalProfile);
const cardValidator = new FormValidator(config, formModalCard);


// Слушатель открытия формы редактирования профиля
openBtnProfile.addEventListener('click', () => {
  openPopup(formModalProfile)
  formName.value = profileName.textContent;
  formDescr.value = profileDescr.textContent;
  formValidator.enableValidation();

});

// Слушатель сабмита формы редактирования профиля
formElementProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescr.textContent = formDescr.value;
  evt.target.reset();
  closePopup(formModalProfile);
});


// Отрисовка массива карточек
const cards = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.name, cardItem.link, '#insert-card', { handleCardClick: () => {
      const popup = new PopupWithImage(cardItem.name, cardItem.link, modalImg);
      popup.open();
    } });
    const cardElement = card.renderCard();
    cards.addItems(cardElement);
  }
}, insertCardContainer)

cards.renderItems();


// Слушатель открытия формы добавления карточки
openBtnCard.addEventListener('click', () => {
  openPopup(formModalCard)
  cardValidator.enableValidation();
});


// функционал добавления и отрисовки новой карточки
formElementCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  insertCardContainer.prepend(createCardElement(cardName.value, cardDescr.value, '#insert-card'))
  evt.target.reset();
  closePopup(formModalCard);
})