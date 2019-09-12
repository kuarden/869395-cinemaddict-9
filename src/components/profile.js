  import {createElement} from "../common";

  export class Profile {
    constructor() {
      this._element = null;
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
      return `<section class="header__profile profile">
            <p class="profile__rating">Movie Buff</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
    }
  }