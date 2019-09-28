import {AbstractComponent} from "./abstract-component";
import moment from 'moment';
import 'moment-duration-format';

export class FilmCard extends AbstractComponent{
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._releaseDate = data.releaseDate;
    this._duration = data.duration;
    this._genres = data.genres;
    this._poster = data.poster;
    this._description = data.description;
    this._comments = data.comments.length;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorite = data.favorite;    
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
      <div>
          <span class="film-card__year">${moment(this._releaseDate).format(`MMMM YYYY`)}</span>
        </div>
        <div>
          <span class="film-card__year">${moment.duration(this._duration, `minutes`).format(`h[h] m[m]`)}</span>
        </div>
          <div>
        <span class="film-card__genre">${this._genres}</span>
        </div>
      </p>
      <img src="${this._poster}" alt="${this._title}" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._comments} comments</a>
      <form class="film-card__controls">
        <button data-control-type="watchlist" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button data-control-type="watched" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button data-control-type="favorite" class="film-card__controls-item button film-card__controls-item--favorite ${this._favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`;
  } 
}










  
  
  
