import {AbstractComponent} from "./abstract-component";
import moment from 'moment';

export class Comment extends AbstractComponent{
  constructor(data) {
    super();
    this._date = data.date;
    this._author = data.author;
    this._emoji = data.emoji;
    this._text = data.text;
  }

  get template() {
    return `<div>
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${this._emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${this._text}}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._author}</span>
            <span class="film-details__comment-day">${moment(this._date).format(`DD.MM.YYYY HH:MM`)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    </div>`;  
  };
}