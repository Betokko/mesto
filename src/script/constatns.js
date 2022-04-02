export {
    config,
    formModalProfile,
    editProfileButton,
    formName,
    formDescr,
    formModalCard,
    addCardButton,
    insertCardContainer,
    modalImg,
    profileName,
    profileAbout,
    profileAvatar,
    removeCardPopupSelector,
    APIToken
}
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorElement: '.popup__error',
};




const formModalProfile = document.querySelector('.popup_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const formName = document.querySelector('.popup__name')
const formDescr = document.querySelector('.popup__descr')
const formModalCard = document.querySelector('.popup_card');
const addCardButton = document.querySelector('.profile__add-button');
const insertCardContainer = document.querySelector('.insert-card');
const modalImg = document.querySelector('.popup_img');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const removeCardPopupSelector = document.querySelector('.popup_remove-card');
const APIToken = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-38',
    authorization: '81838a1e-c453-4d18-88cc-147b40de0a34'
  }