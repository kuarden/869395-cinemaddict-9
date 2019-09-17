import {createElement} from '../common';

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  get removeElement() {
    this._element = null;
  }

  get template() {
    throw Error(`Abstract method not implemented`);
  }
}