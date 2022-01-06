// Форма редактирования профиля

let formModal = document.querySelector('.pop-up_profile');
let formElement = document.querySelector('.pop-up__body_profile');
let openBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close-btn_profile');

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

// Форма добавления карточки

let formModalCard = document.querySelector('.pop-up_card');
let formElementCard = document.querySelector('.pop-up__body_card');
let openBtnCard = document.querySelector('.profile__add-button');
let closeBtnCard = document.querySelector('.pop-up__close-btn_card');


openBtnCard.addEventListener('click', () => {
  modalTogglerCard()
});

closeBtnCard.addEventListener('click', () => {
  modalTogglerCard()
})

function modalTogglerCard() {
  formModalCard.classList.toggle('pop-up_enabled')
}

// Сохранение карточки
let cardName = document.querySelector('.pop-up__card-name');
let cardDescr = document.querySelector('.pop-up__card-descr');

formElementCard.addEventListener('submit', (e) => {
  e.preventDefault();
  initialCards.unshift(
    {
      name: `${cardName.value}`,
      link: `${cardDescr.value}`
    },
  )
  formModalCard.classList.remove('pop-up_enabled');
  clearInsertCard()
  renderInsertCard();
})

// Рендер карточек

const initialCards = [
  {
    name: 'Девочка в желтом',
    link: 'https://images.unsplash.com/photo-1568196004494-b1ee34f3b436?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Девочка',
    link: 'https://images.unsplash.com/photo-1511130558090-00af810c21b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
  },
  {
    name: 'Девочка',
    link: 'https://images.unsplash.com/photo-1571137804941-5eafd456873b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Девочка',
    link: 'https://images.unsplash.com/photo-1482555670981-4de159d8553b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Девочка',
    link: 'https://images.unsplash.com/photo-1441123100240-f9f3f77ed41b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Девочка',
    link: 'https://images.unsplash.com/photo-1548626008-5bdca8c9552a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
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

function clearInsertCard() {
  let childrenArray = Array.from(insertCardContainer.children);
  childrenArray.forEach(elem => elem.remove())
};

renderInsertCard()