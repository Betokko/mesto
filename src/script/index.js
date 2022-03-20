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
} from './constatns.js'
import '../pages/index.css'

// Global scope
const jotaro = new URL('../images/jojo/jotaro.webp',
  import.meta.url);
const joseph = new URL('../images/jojo/joseph.png',
  import.meta.url);
const dio = new URL('../images/jojo/dio.png',
  import.meta.url);
const avdol = new URL('../images/jojo/avdol.png',
  import.meta.url);
const kakyoin = new URL('../images/jojo/kakyoin.png',
  import.meta.url);
const polnareff = new URL('../images/jojo/polnareff.png',
  import.meta.url);

const initialCards = [{
    name: 'Jotaro',
    link: jotaro
  },
  {
    name: 'Joseph',
    link: joseph
  },
  {
    name: 'Dio',
    link: dio
  },
  {
    name: 'Avdol',
    link: avdol
  },
  {
    name: 'Kakyoin',
    link: kakyoin
  },
  {
    name: 'Polnareff',
    link: polnareff
  }
];


const formValidator = new FormValidator(config, formModalProfile);
const cardValidator = new FormValidator(config, formModalCard);
const cardImagePopup = new PopupWithImage(modalImg);
const userInfo = new UserInfo({
  name: '.profile__name',
  desc: '.profile__description'
});


// Функция получения объекта карточки
function getCard(name, link) {
  const card = new Card(name, link, '#insert-card', {
    handleCardClick: () => {
      cardImagePopup.open(name, link);
      cardImagePopup.setEventListeners()
    }
  })
  return card
}

// Отрисовка массива карточек
function renderCardsArray() {
  const cards = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = getCard(cardItem.name, cardItem.link)
      const cardElement = card.renderCard();
      cards.addItem(cardElement)
    },
  }, insertCardContainer);
  cards.renderItems();
}
renderCardsArray();

// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', renderCard)

const cardInputPopup = new PopupWithForm(formModalCard, {
  handleFormSubmit: (formData) => {
    const card = getCard(formData.name, formData.descr)
    const cardElement = card.renderCard();
    insertCardContainer.prepend(cardElement)
  }
});
cardInputPopup.setEventListeners();
cardValidator.enableValidation();

function renderCard() {
  cardInputPopup.open();
};


// Попап формы редактирования информации
editProfileButton.addEventListener('click', editProdileData)

const profileInputPopup = new PopupWithForm(formModalProfile, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.descr);
  }
})
profileInputPopup.setEventListeners()

const userData = userInfo.getUserInfo();

function editProdileData() {
  formName.value = userData.name;
  formDescr.value = userData.desc;
  profileInputPopup.open();
}

formValidator.enableValidation();