import {AbstractComponent} from "./abstract-component";
import moment from 'moment';
import 'moment-duration-format';

export class FilmDetail extends AbstractComponent{
  constructor(data) {
    super();
    this._genres = data.genres;
    this._title = data.title;
    this._titleAlternative = data.titleAlternative;
    this._poster = data.poster;
    this._releaseDate = data.releaseDate;
    this._duration = data.duration;
    this._rating = data.rating;
    this._description = data.description;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._country = data.country;
    this._age = data.age;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorite = data.favorite;
  }

  get template() {
     return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="">
            <p class="film-details__age">${this._age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">${this._titleAlternative}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._releaseDate).format(`MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${moment.duration(this._duration, `minutes`).format(`h [hour] m [minutes]`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${this._genres}</span>
              </tr>
            </table>
            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>
        <section class="film-details__controls">
          <input type="checkbox" data-control-type="watchlist" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist == 1 ? 'checked': ``}>
          <label for="watchlist" data-control-type="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" data-control-type="watched" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched == 1 ? 'checked': ``}>
          <label for="watched" data-control-type="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" data-control-type="favorite" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite == 1 ? 'checked': ``}>
          <label for="favorite" data-control-type="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div>
        <div class="form-details__film-rating"></div>
        <h1></h1>
      </div>
      <div>
        <div class="form-details__bottom-container"></div>
      </div>
    </form>
  </section>`;
  }
}
