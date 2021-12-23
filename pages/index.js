let page = document.querySelector('.page');
let openBtn = document.querySelector('.profile__edit-button');
let form = document.querySelector('.pop-up')
let closeBtn = document.querySelector('.pop-up__close-btn');


console.log(closeBtn);
console.log(page);

openBtn.addEventListener('click', () => {
    form.classList.add('pop-up_enabled');
    page.classList.add('page_stop-scroll')
});

closeBtn.addEventListener('click', () => {
    form.classList.remove('pop-up_enabled');
    page.classList.remove('page_stop-scroll')
})