// Global scope

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
const formModalProfile = document.querySelector('.popup_profile');
const formElementProfile = document.querySelector('.popup__body_profile');
const openBtnProfile = document.querySelector('.profile__edit-button');
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');
const profileName = document.querySelector('.profile__name')
const profileDescr = document.querySelector('.profile__description')
const formName = document.querySelector('.popup__name')
const formDescr = document.querySelector('.popup__descr')
const formModalCard = document.querySelector('.popup_card');
const formElementCard = document.querySelector('.popup__body_card');
const openBtnCard = document.querySelector('.profile__add-button');
const closeBtnCard = document.querySelector('.popup__close-btn_card');
const cardName = document.querySelector('.popup__card-name');
const cardDescr = document.querySelector('.popup__card-descr');
const insertCardContainer = document.querySelector('.insert-card');
const insertCardTemplate = document.querySelector('#insert-card').content;
const insertCardElement = insertCardTemplate.querySelector('.insert-card__item');
const modalImg = document.querySelector('.popup_img');
const closeBtnImg = document.querySelector('.popup__close-btn_img');
const openBtnImg = document.querySelector('.insert-card__img');
const modalImgItem = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__image-descr');

renderCards();


// Функции открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_enabled');
} 

function closePopup(popup) {
  popup.classList.remove('popup_enabled');
} 


// Форма редактирования профиля

openBtnProfile.addEventListener('click', () => {
  openPopup(formModalProfile)
  formName.value = profileName.textContent;
  formDescr.value = profileDescr.textContent;
  enableValidation();
  pressOnEscListener(formModalProfile);
  clickOnOverlayListener(formModalProfile)
});


closeBtnProfile.addEventListener('click', () => {
  closePopup(formModalProfile);
})

formElementProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescr.textContent = formDescr.value;
  closePopup(formModalProfile);
});



// Отрисовка карточек из заданного массива

function renderCards() {
  initialCards.forEach((elem) => {
    insertCardContainer.append(createCard(elem.name, elem.link))
  })
};


// Форма добавления карточки

openBtnCard.addEventListener('click', () => {
  openPopup(formModalCard)
  enableValidation();
  pressOnEscListener(formModalCard);
  clickOnOverlayListener(formModalCard);
});

closeBtnCard.addEventListener('click', () => {
  closePopup(formModalCard);
})


// функционал добавления и отрисовки новой карточки

formElementCard.addEventListener('submit', (e) => {
  e.preventDefault();
  insertCardContainer.prepend(createCard(cardName.value, cardDescr.value))
  e.target.reset();
  closePopup(formModalCard);
})

function createCard(name, link) {
  const newCard = insertCardElement.cloneNode(true);
  const cardPicture = newCard.querySelector('.insert-card__img');
  const cardDescr = newCard.querySelector('.insert-card__title');
  cardPicture.src = link;
  cardPicture.alt = name;
  cardDescr.textContent = name;

  likeCard(newCard);
  removeCard(newCard);
  renderModalImg(newCard)
  return newCard;
}


// Слушатели событий
// Лайки
function likeCard(elem) {
  elem.addEventListener('click', (e) => {
    if (e.target === elem.querySelector('.insert-card__icon')) {
      e.target.classList.toggle('insert-card__icon_active')
    }
  })
}

// Козина
function removeCard(elem) {
  elem.addEventListener('click', (e) => {
    if (e.target === elem.querySelector('.insert-card__remove')) {
      e.target.closest('.insert-card__item').remove();
    }
  })
}

// Развертывание изображения карточки по клику на весь экран
function renderModalImg(elem) {
    elem.addEventListener('click', (e) => {
      if (e.target === elem.querySelector('.insert-card__img')) {
        openPopup(modalImg)
        modalImgItem.src = `${e.target.src}`;
        modalImgItem.alt = `${e.target.alt}`;
        modalImgText.textContent = `${e.target.alt}`;
        pressOnEscListener(modalImg);
        clickOnOverlayListener(modalImg);
      }
    })
}

closeBtnImg.addEventListener('click', () => {
  closePopup(modalImg);
})


// Закрытие попапов на Esc

function pressOnEscListener(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}


// Закрытие попапов по клику на черный фон

function clickOnOverlayListener(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
}
