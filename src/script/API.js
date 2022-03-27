import {
  profileName,
  profileAbout,
  profileAvatar,
  formName,
  formDescr,
} from './constatns'

export default class API {
  constructor(options) {
    this._url = 'https://mesto.nomoreparties.co/v1/cohort-38';
    this._headers = {
      authorization: '81838a1e-c453-4d18-88cc-147b40de0a34',
      'Content-Type': 'application/json'
    }
  }

  getProfileInfo() {
    fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(obj => {
        profileName.textContent = obj.name;
        profileAbout.textContent = obj.about;
        profileAvatar.src = obj.avatar
      })
      .catch(err => console.log(err))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(arr => arr)
      .catch(err => console.log(err))
  }

  setProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formName.value,
        about: formDescr.value
      })
    })
  }

  loadCard(name, link) {
    return fetch(`${this._url}/cards` , {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }
}