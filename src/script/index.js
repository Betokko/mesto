import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
  config,
  formModalProfile,
  editProfileButton,
  formName,
  formDescr,
  formModalCard,
  addCardButton,
  insertCardContainer,
  modalImg,
} from './constatns.js';
import '../pages/index.css';
import API from './API.js';

// Валидация
const formValidator = new FormValidator(config, formModalProfile);
const cardValidator = new FormValidator(config, formModalCard);
// API
const api = new API();
api.getProfileInfo();

const cardImagePopup = new PopupWithImage(modalImg);
cardImagePopup.setEventListeners()

const userInfo = new UserInfo({
  name: '.profile__name',
  desc: '.profile__description'
});

// Функция получения объекта карточки
function getCard(name, link) {
  const card = new Card(name, link, '#insert-card', {
    handleCardClick: () => {
      cardImagePopup.open(name, link);
    }
  })
  const cardElement = card.renderCard();
  return cardElement
}

// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', () => {
  cardInputPopup.open();
})

const cardInputPopup = new PopupWithForm(formModalCard, {
  handleFormSubmit: (formData) => {
    const card = getCard(formData.name, formData.descr)
    insertCardContainer.prepend(card)
    console.log(111);
    api.loadCard(formData.name, formData.descr)
  }
});
cardInputPopup.setEventListeners();
cardValidator.enableValidation();



// Попап формы редактирования информации
editProfileButton.addEventListener('click', () => {
  formName.value = userInfo.getUserInfo().name;
  formDescr.value = userInfo.getUserInfo().desc;
  profileInputPopup.open();
})

const profileInputPopup = new PopupWithForm(formModalProfile, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.descr);
    api.setProfileInfo()
  }
})

profileInputPopup.setEventListeners()
formValidator.enableValidation();




// Отрисовка массива карточек
function renderCardsArray() {
  api.getInitialCards().then(initialCards => {
    const cards = new Section({
      items: initialCards,
      renderer: (cardItem) => {
        const card = getCard(cardItem.name, cardItem.link)
        cards.addItem(card)
      },
    }, insertCardContainer);
    cards.renderItems();
  });
}
renderCardsArray();
