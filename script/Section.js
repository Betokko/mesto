export default class Section{
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;        
        this._renderer = renderer;
        this._container = containerSelector;
    }
    renderItems() {
      this._initialArray.forEach(element => {
        this._renderer(element)
      });
    }
    addItems(element) {
      this._container.append(element)
    }
}