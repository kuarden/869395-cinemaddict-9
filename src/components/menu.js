import {AbstractComponent} from "./abstract-component";

export class Menu extends AbstractComponent {
  constructor(groupedFilms) {
    super();
    this._watchlist = groupedFilms.watchlist;
    this._watched = groupedFilms.watched;
    this._favorite = groupedFilms.favorite;
  }

  get template() {
    return `<nav class="main-navigation">
      <a href="#all" data-mode-type="default" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-mode-type="watchlist" class="main-navigation__item">Watchlist<span class="main-navigation__item-count">${this._watchlist}</span></a>
      <a href="#history" data-mode-type="watched" class="main-navigation__item">History <span class="main-navigation__item-count">${this._watched}</span></a>
      <a href="#favorites" data-mode-type="favorite" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favorite}</span></a>
      <a href="#stats" data-mode-type="stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`;
  }
}

