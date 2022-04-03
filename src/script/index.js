import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
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

// Запуск отрисвоки массива карточек
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then([api.getProfileInfo(), renderCardsArray()])
  .catch(err => console.log(err))



// Создаем экземпляр класса UserInfo 
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__image',
  id: ''
});
// Данные с сервера вставляем на старницу
api.getProfileInfo()
  .then(res => {
    userInfo.setAvatar(res.avatar)
    userInfo.setUserInfo(res.name, res.about, res._id)
  })


// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', () => {
  cardInputPopup.open();
})

const cardInputPopup = new PopupWithForm('.popup_card', {
  handleFormSubmit: (formData, button) => {
    const cards = new Section({}, insertCardContainer);
    const card = getCard(formData)
    cards.addSingleitem(card)
    card.querySelector('.insert-card__img').src = formData.descr;
    api.loadCard(formData.name, formData.descr)
      .then(() => {
        cardInputPopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(true, button)
      })
  }
});

cardInputPopup.setEventListeners();
cardValidator.enableValidation();

const profileInputPopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData, button) => {
    userInfo.setUserInfo(formData.name, formData.descr);
    api.setProfileInfo()
      .then(() => {
        profileInputPopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(true, button)
      })
  }
})

profileInputPopup.setEventListeners()
formValidator.enableValidation();

const cardImagePopup = new PopupWithImage('.popup_img');
cardImagePopup.setEventListeners()

const removeCardPopup = new ConfirmationPopup('.popup_remove-card');
removeCardPopup.setEventListeners(removeCardPopupSelector)

// Расбота с аватаркой
const editAvatarPopup = new PopupWithForm('.popup_avatar', {
  handleFormSubmit: (formData, button) => {
    document.querySelector('.profile__image').src = formData.descr;
    api.setAvatar(formData.descr)
      .then(() => {
        editAvatarPopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(true, button)
      })
  }
});
editAvatarPopup.setEventListeners(editAvatarPopupSelector);
document.querySelector('.profile__image').addEventListener('click', () => {
  editAvatarPopup.open()

})

// Попап формы редактирования информации
editProfileButton.addEventListener('click', () => {
  formName.value = userInfo.getUserInfo().name;
  formDescr.value = userInfo.getUserInfo().about;
  profileInputPopup.open();
  // formValidator.resetValidation()
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

      function huita() {
        api.removeCard(data._id)
        cardElement.remove()
        removeCardPopup.close()
      }

      document.querySelector('.popup__button_remove-card').addEventListener('click', huita)
    }
  }, {
    addLike: (icon) => {
      console.log(icon);
      api.likeCard(data._id)
        .then(() => {
          icon.classList.add('insert-card__icon_active')
          icon.nextElementSibling.textContent = `${+icon.nextElementSibling.textContent + 1}`
        })
        .catch(err => console.log(err))
    }
  }, {
    removeLike: (icon) => {
      api.removeLikeCard(data._id)
        .then(() => {
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
  api.getProfileInfo()
    .then(res => {
      api.getInitialCards()
        .then(initialCards => {
          const cards = new Section({
            renderer: (cardItem) => {
              const card = getCard(cardItem)
              if (res._id !== cardItem.owner._id) {
                card.querySelector('.insert-card__remove').remove()
              }
              cards.addItem(card)
            },
          }, insertCardContainer);
          cards.renderItems(initialCards);
        })
        .catch(err => console.log(err))
    })
}