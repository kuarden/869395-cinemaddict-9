import {AbstractComponent} from "./abstract-component";

export class FilmList extends AbstractComponent {
  constructor() {
    super();
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
