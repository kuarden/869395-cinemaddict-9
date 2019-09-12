import {createElement} from "../common";

export class Menu {
  constructor(
    groupedFilms) {
      this._watchlist = groupedFilms.watchlist;
      this._watched = groupedFilms.watched;
      this._favorite = groupedFilms.favorite;

console.log(this);

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
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist<span class="main-navigation__item-count">${this._watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._watched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favorite}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }
}

