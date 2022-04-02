import {
  profileName,
  profileAbout,
  profileAvatar,
  formName,
  formDescr,
} from './constatns'




export default class API {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.authorization;
  }

  getMyId() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(obj => obj)
      .catch(err => console.log(err))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
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


  getProfileInfo() {
    fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
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

  setProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formName.value,
        about: formDescr.value
      })
    })
  }

  setAvatar(avaratLink) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avaratLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(err))
  }

  loadCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
  }
  removeLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }
  renderLoading(isLoading, element) {
    if (isLoading) {
      element.textContent = 'Сохранение...';
    }
  }
}