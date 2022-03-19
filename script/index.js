import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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
const initialCards = [{
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
const editProfileBurron = document.querySelector('.profile__edit-button');
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const formName = document.querySelector('.popup__name')
const formDescr = document.querySelector('.popup__descr')
const formModalCard = document.querySelector('.popup_card');
const formElementCard = document.querySelector('.popup__body_card');
const addCardButton = document.querySelector('.profile__add-button');
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
const cardImagePopup = new PopupWithImage(modalImg);
const userInfo = new UserInfo({name: profileName, desc: profileDescr});

// Отрисовка массива карточек
function renderCardsArray() {
  const cards = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem.name, cardItem.link, '#insert-card', {
        handleCardClick: () => {
          cardImagePopup.open();
        }
      })
      const cardElement = card.renderCard();
      cards.addItem(cardElement)
    },
  }, insertCardContainer);
  cards.renderItems();
}
renderCardsArray();

// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', renderCard)

function renderCard() {
  const cardInputPopup = new PopupWithForm(formModalCard, {
    handleFormSubmit: (formData) => {
      const card = new Card(formData.name, formData.descr, '#insert-card', {
        handleCardClick: () => {
          cardImagePopup.open();
        }
      })
      const cardElement = card.renderCard();
      insertCardContainer.prepend(cardElement)
    }
  });
  cardInputPopup.open()
  cardValidator.enableValidation();
};

// Попап формы редактирования информации
editProfileBurron.addEventListener('click', editProdileData)

function editProdileData() {
  const profileInputPopup = new PopupWithForm(formModalProfile, {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData.name, formData.descr)
    }
  })
  formName.value = userInfo.getUserInfo().name
  formDescr.value = userInfo.getUserInfo().desc;
  profileInputPopup.open()
  formValidator.enableValidation();
}