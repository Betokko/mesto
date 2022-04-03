export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item)
    })
  }
  addItem(element) {
    this._container.append(element)
  }
  addSingleitem(element) {
    this._container.prepend(element)
  }
}