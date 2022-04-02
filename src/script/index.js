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
  removeCardPopupSelector,
  APIToken
} from './constatns.js';
import '../pages/index.css';
import API from './API.js';
import Popup from "./Popup.js";



// Валидация
const formValidator = new FormValidator(config, formModalProfile);
const cardValidator = new FormValidator(config, formModalCard);
// API
const api = new API(APIToken);
api.getProfileInfo();


const userInfo = new UserInfo({
  name: '.profile__name',
  desc: '.profile__description'
});



// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', () => {
  cardInputPopup.open();
})

const cardInputPopup = new PopupWithForm(formModalCard, {
  handleFormSubmit: (formData) => {
    const card = getCard(formData.name, formData.descr,)
    insertCardContainer.prepend(card)
    api.loadCard(formData.name, formData.descr)

  }
});
cardInputPopup.setEventListeners();
cardValidator.enableValidation();

const profileInputPopup = new PopupWithForm(formModalProfile, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.descr);
    api.setProfileInfo()
  }
})
profileInputPopup.setEventListeners()
formValidator.enableValidation();

const cardImagePopup = new PopupWithImage(modalImg);
cardImagePopup.setEventListeners()

const removeCardPopup = new Popup(removeCardPopupSelector);
removeCardPopup.setEventListeners()


// Попап формы редактирования информации
editProfileButton.addEventListener('click', () => {
  formName.value = userInfo.getUserInfo().name;
  formDescr.value = userInfo.getUserInfo().desc;
  profileInputPopup.open();
})


// Функция получения объекта карточки
function getCard(name, link, likes, cardId, data) {
  console.log(data);
  const card = new Card(name, link, '#insert-card', {
    handleCardClick: () => {
      cardImagePopup.open(name, link);
    }
  }, {
    handleRemoveButton: () => {
      removeCardPopup.open();
      document.querySelector('.popup__button_remove-card').addEventListener('click', () => {
        api.removeCard(cardId)
        cardElement.remove()
        removeCardPopup.close()
      })
    }
  }, {
    addLike: () => {
      api.likeCard(cardId)
    }
  }, {
    removeLike: ()=> {
      api.removeLikeCard(cardId)
    }
  })
  const cardElement = card.renderCard(data);
  return cardElement
}

// Отрисовка массива карточек
function renderCardsArray() {
  api.getMyId().then(res => {
    api.getInitialCards().then(initialCards => {
      const cards = new Section({
        items: initialCards,
        renderer: (cardItem) => {
          const card = getCard(cardItem.name, cardItem.link, cardItem.likes.length, cardItem._id, cardItem)
          if (res._id !== cardItem.owner._id) {
            card.querySelector('.insert-card__remove').remove()
          }
          cards.addItem(card)
        },
      }, insertCardContainer);
      cards.renderItems();
    });
  })
}
renderCardsArray();