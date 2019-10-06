import {AbstractComponent} from './abstract-component.js';

export class SearchResult extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  get template() {
    return `<div class="result visually-hidden">
      <p class="result__text">Result <span class="result__count"></span></p>
    </div>`;
  }
}