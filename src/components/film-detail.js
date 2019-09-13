import {createElement} from "../common";
import {createCommentsTemplate} from "./comment";

export class FilmDetail {
  constructor(filmData) {
    this._genres = filmData.genres;
    this._title = filmData.title;
    this._poster = filmData.poster;
    this._releaseDate = filmData.releaseDate;
    this._duration = filmData.duration;
    this._rating = filmData.rating;
    this._description = filmData.description;
    this._director = filmData.director;
    this._writers = filmData.writers;
    this._actors = filmData.actors;
    this._country = filmData.country;
    this._age = filmData.age;
    this._comments = filmData.comments;
    this._watchlist = filmData.watchlist;
    this._watched = filmData.watched;
    this._favorite = filmData.favorite;
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
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="">
            <p class="film-details__age">${this._age}</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">${this._title} (original)</p>
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
                <td class="film-details__cell">${this._releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration}</td>
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
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist == 1 ? 'checked': ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched == 1 ? 'checked': ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite == 1 ? 'checked': ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="form-details__bottom-container">

      </div>
    </form>
  </section>`;
  }
}
