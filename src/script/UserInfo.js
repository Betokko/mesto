export default class UserInfo {
    constructor({name,desc}) {
        this._name = name;
        this._desc = desc;
    }
    getUserInfo() {
        this._formValues = {};
        this._formValues.name = this._name.textContent;
        this._formValues.desc = this._desc.textContent;
        return this._formValues; 
    };
    setUserInfo(name, desc) {
        this._name.textContent = name;
        this._desc.textContent = desc;
    }
}