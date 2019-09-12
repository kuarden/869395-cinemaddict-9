import {createElement} from "../common";

export class ButtonShowMore {
  constructor() {
    }
   
    get element() {
      if (!this._element) {
        this._element = createElement(this.template);
      }
      return this._element;
    }

    get removeElement(){
      this._element = null;
    }

    get template() {
        return `<button class="films-list__show-more">Show more</button>`;
  }
}