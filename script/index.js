let formModal = document.querySelector('.pop-up')
let formElement = document.querySelector('.pop-up__body');
let openBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close-btn');

let profileName = document.querySelector('.profile__name')
let profileDescr = document.querySelector('.profile__description')
let formName = document.querySelector('.pop-up__name')
let formDescr = document.querySelector('.pop-up__descr')

function modalToggler() {
  formModal.classList.toggle('pop-up_enabled');
}

openBtn.addEventListener('click', () => {
  modalToggler()
  formName.value = profileName.textContent;
  formDescr.value = profileDescr.textContent;
});


closeBtn.addEventListener('click', () => {
  modalToggler()
})

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = formName.value;
    profileDescr.textContent = formDescr.value;
    formModal.classList.remove('pop-up_enabled');
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const insertCardContainer = document.querySelector('.insert-card');
const insertCardTemplate = document.querySelector('#insert-card').content;
const insertCardElement = insertCardTemplate.querySelector('.insert-card__item');



function renderInsertCard() {
  initialCards.forEach((elem) => {
    let insertCardElementCopy = insertCardElement.cloneNode(true);
    insertCardElementCopy.querySelector('.insert-card__img').src = `${elem.link}`;
    insertCardElementCopy.querySelector('.insert-card__img').alt = `${elem.name}`;
    insertCardElementCopy.querySelector('.insert-card__title').textContent = `${elem.name}`;
    insertCardContainer.append(insertCardElementCopy)
  })
};
renderInsertCard();
