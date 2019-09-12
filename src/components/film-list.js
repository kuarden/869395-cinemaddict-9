import {createElement} from "../common";

export class FilmList {
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
    return `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title">All movies</h2>
          <div class="films-list__container"></div>
        </section>
        <section class="films-list">
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container"></div>
        </section>
        <section class="films-list">
          <h2 class="films-list__title">Most commented</h2>
          <div class="films-list__container"></div>
        </section>          
      </section>`;
  }
}
