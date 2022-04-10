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
const avatarValidator = new FormValidator(config, editAvatarPopupSelector)

// API
const api = new API(APIToken);

// Отрисовка массива карточек
function renderCardsArray() {
  api.getInitialCards()
    .then(initialCards => {
      cards.renderItems(initialCards);
    })
    .catch(err => console.log(err))
}

// Запуск отрисвоки массива карточек и добавления данных от пользователя
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then([api.getProfileInfo(), api.getProfileInfo()
    .then(res => {
      userInfo.setAvatar(res.avatar)
      userInfo.setUserInfo(res.name, res.about, res._id)
      renderCardsArray()
    })
  ])
  .catch(err => console.log(err))


// Создаем экземпляр класса UserInfo 
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__image',
  id: ''
});


// Попап формы длбавления новой карточки
addCardButton.addEventListener('click', () => {
  cardInputPopup.open();
  cardValidator.resetValidation()
})

const cardInputPopup = new PopupWithForm('.popup_card', {
  handleFormSubmit: (formData, button) => {
    api.renderLoading(true, button)
    api.loadCard(formData.name, formData.descr)
      .then((res) => {
        const card = getCard(res)
        cardInputPopup.close()
        cards.addSingleitem(card)
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(false, button)
      })
  }
});

cardInputPopup.setEventListeners();
cardValidator.enableValidation();

const profileInputPopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData, button) => {
    api.renderLoading(true, button)
    api.setProfileInfo()
      .then(() => {
        profileInputPopup.close()
        userInfo.setUserInfo(formData.name, formData.descr)
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(false, button)
      })
  }
})

profileInputPopup.setEventListeners()
formValidator.enableValidation();

const cardImagePopup = new PopupWithImage('.popup_img');
cardImagePopup.setEventListeners()



// Расбота с аватаркой
const editAvatarPopup = new PopupWithForm('.popup_avatar', {
  handleFormSubmit: (formData, button) => {
    api.renderLoading(true, button)
    api.setAvatar(formData.descr)
      .then(() => {
        editAvatarPopup.close()
        userInfo.setAvatar(formData.descr)
      })
      .catch(err => console.log(err))
      .finally(() => {
        api.renderLoading(false, button)
      })
  }
});
avatarValidator.enableValidation()

editAvatarPopup.setEventListeners(editAvatarPopupSelector);
document.querySelector('.profile__image').addEventListener('click', () => {
  editAvatarPopup.open()
  avatarValidator.resetValidation()
})

// Попап формы редактирования информации
editProfileButton.addEventListener('click', () => {
  formName.value = userInfo.getUserInfo().name;
  formDescr.value = userInfo.getUserInfo().about;
  profileInputPopup.open();
  formValidator.resetValidation()
})


const removeCardPopup = new ConfirmationPopup('.popup_remove-card', () => {
  removeCard(removeCardPopup.getCard())
});
removeCardPopup.setEventListeners()

function removeCard(data) {
  api.removeCard(data._id)
    .then(() => {
      data.element.remove()
      removeCardPopup.close()
    })
    .catch(err => console.log(err))
}

// Функция получения объекта карточки
function getCard(data) {
  const card = new Card(data.name, data.link, '#insert-card', {
    handleCardClick: () => {
      cardImagePopup.open(data.name, data.link);
    }
  }, {
    handleRemoveButton: (evt) => {
      removeCardPopup.open()
      const card = evt.target.closest('.insert-card__item');
      removeCardPopup.setCard(data, card)
    }
  }, {
    addLike: (icon) => {
      api.likeCard(data._id)
        .then((res) => {
          icon.classList.add('insert-card__icon_active')
          icon.nextElementSibling.textContent = res.likes.length
        })
        .catch(err => console.log(err))
    }
  }, {
    removeLike: (icon) => {
      api.removeLikeCard(data._id)
        .then((res) => {
          icon.classList.remove('insert-card__icon_active')
          icon.nextElementSibling.textContent = res.likes.length
        })
        .catch(err => console.log(err))
    }
  })
  const cardElement = card.renderCard(data);
  return cardElement
}

const cards = new Section({
  renderer: (cardItem) => {
    const card = getCard(cardItem)
    if (userInfo._id !== cardItem.owner._id) {
      card.querySelector('.insert-card__remove').remove()
    }
    cards.addItem(card)
  },
}, insertCardContainer);