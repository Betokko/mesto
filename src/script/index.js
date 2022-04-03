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
  editAvatarPopupSelector,
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

const cardInputPopup = new PopupWithForm('.popup_card', {
  handleFormSubmit: (formData, button) => {
    const card = getCard(formData)
    insertCardContainer.prepend(card)
    card.querySelector('.insert-card__img').src = formData.descr;
    api.loadCard(formData.name, formData.descr)
    api.renderLoading(true, button)
  }
});
cardInputPopup.setEventListeners();
cardValidator.enableValidation();

const profileInputPopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData, button) => {
    userInfo.setUserInfo(formData.name, formData.descr);
    api.setProfileInfo()
    api.renderLoading(true, button)
  }
})
profileInputPopup.setEventListeners()
formValidator.enableValidation();

const cardImagePopup = new PopupWithImage('.popup_img');
cardImagePopup.setEventListeners()

const removeCardPopup = new Popup('.popup_remove-card');
removeCardPopup.setEventListeners(removeCardPopupSelector)

// Расбота с аватаркой
const editAvatarPopup = new PopupWithForm('.popup_avatar', {
  handleFormSubmit: (formData, button) => {
    document.querySelector('.profile__image').src = formData.descr;
    api.setAvatar(formData.descr)
    api.renderLoading(true, button)
  }
});
editAvatarPopup.setEventListeners(editAvatarPopupSelector);
document.querySelector('.profile__image').addEventListener('click', () => {
  editAvatarPopup.open()

})

// Попап формы редактирования информации
editProfileButton.addEventListener('click', () => {
  formName.value = userInfo.getUserInfo().name;
  formDescr.value = userInfo.getUserInfo().desc;
  profileInputPopup.open();
  formValidator.resetValidation()
})


// Функция получения объекта карточки
function getCard(data) {
  const card = new Card(data.name, data.link, '#insert-card', {
    handleCardClick: () => {
      cardImagePopup.open(data.name, data.link);
    }
  }, {
    handleRemoveButton: () => {
      removeCardPopup.open();
      document.querySelector('.popup__button_remove-card').addEventListener('click', () => {
        api.removeCard(data._id)
        cardElement.remove()
        removeCardPopup.close()
      })
    }
  }, {
    addLike: (icon) => {
      api.likeCard(data._id).then(() => {
          icon.classList.add('insert-card__icon_active')
          icon.nextElementSibling.textContent = `${+icon.nextElementSibling.textContent + 1}`
        })
        .catch(err => console.log(err))
    }
  }, {
    removeLike: (icon) => {
      api.removeLikeCard(data._id).then(() => {
          icon.classList.remove('insert-card__icon_active')
          icon.nextElementSibling.textContent = `${+icon.nextElementSibling.textContent - 1}`
        })
        .catch(err => console.log(err))
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
            const card = getCard(cardItem)
            if (res._id !== cardItem.owner._id) {
              card.querySelector('.insert-card__remove').remove()
            }
            cards.addItem(card)
          },
        }, insertCardContainer);
        cards.renderItems();
      })
      .catch(err => console.log(err))
  })
}
renderCardsArray();