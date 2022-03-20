export {config, initialCards, formModalProfile, editProfileButton, formName, formDescr, formModalCard, addCardButton, insertCardContainer, modalImg}
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
const editProfileButton = document.querySelector('.profile__edit-button');
const formName = document.querySelector('.popup__name')
const formDescr = document.querySelector('.popup__descr')
const formModalCard = document.querySelector('.popup_card');
const addCardButton = document.querySelector('.profile__add-button');
const insertCardContainer = document.querySelector('.insert-card');
const modalImg = document.querySelector('.popup_img');

