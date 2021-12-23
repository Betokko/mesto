let page = document.querySelector('.page');
let openBtn = document.querySelector('.profile__edit-button');
let form = document.querySelector('.pop-up')
let closeBtn = document.querySelector('.pop-up__close-btn');
let formElement = document.querySelector('.pop-up__body');

let profileName = document.querySelector('.profile__name')
let profileDescr = document.querySelector('.profile__description')
let formName = document.querySelector('.pop-up__name')
let formDescr = document.querySelector('.pop-up__descr')

openBtn.addEventListener('click', () => {
    form.classList.add('pop-up_enabled');
    page.classList.add('page_stop-scroll')
    formName.value = profileName.textContent;
    formDescr.value = profileDescr.textContent;
});


closeBtn.addEventListener('click', () => {
    form.classList.remove('pop-up_enabled');
    page.classList.remove('page_stop-scroll')
})

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = formName.value;
    profileDescr.textContent = formDescr.value;
    form.classList.remove('pop-up_enabled');
    page.classList.remove('page_stop-scroll')
});