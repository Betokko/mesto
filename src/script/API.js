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

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
      .then(arr => arr)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
      .then(obj => obj)
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
      .then(this._checkResponse)
      .then(res => res)
      .catch(err => console.log(err))
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
      .then(this._checkResponse)
      .then(res => res)
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
      .then(this._checkResponse)
      .then(res => res)
      .catch(err => console.log(err))
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)

  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
      .then(res => res)
  }

  removeLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
  }

  renderLoading(isLoading, element) {
    if (isLoading) {
      element.textContent = 'Сохранение...';
    }
  }
}