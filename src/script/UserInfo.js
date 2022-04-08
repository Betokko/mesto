export default class UserInfo {
    constructor({
        name,
        about,
        avatar,
    }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
        this._id;
    }
    getUserInfo() {
        this._formValues = {};
        this._formValues.name = this._name.textContent;
        this._formValues.about = this._about.textContent;
        this._formValues.avatar = this._avatar.src;
        this._formValues._id = this._id;
        return this._formValues;
    };
    setUserInfo(name, about, id) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = id;
    }
    setAvatar(avatar) {
        this._avatar.src = avatar
    }

}