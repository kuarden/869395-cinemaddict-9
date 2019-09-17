import {AbstractComponent} from "./abstract-component";

export class ButtonShowMore extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}