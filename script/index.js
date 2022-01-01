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