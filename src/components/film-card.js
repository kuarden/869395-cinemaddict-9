import {AbstractComponent} from "./abstract-component";

export class FilmCard extends AbstractComponent{
  constructor(filmData) {
    super();
    this._title = filmData.title;
    this._rating = filmData.rating;
    this._releaseDate = filmData.releaseDate;
    this._duration = filmData.duration;
    this._genres = filmData.genres;
    this._poster = filmData.poster;
    this._description = filmData.description;
    this._comments = filmData.comments.length;
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
      <div>
         <span class="film-card__year">${this._releaseDate} year</span>
        </div>
        <div>
          <span class="film-card__duration">${this._duration}</span>
        </div>
          <div>
        <span class="film-card__genre">${this._genres}</span>
        </div>
      </p>
      <img src="${this._poster}" alt="${this._title}" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`;
  } 
}










  
  
  
