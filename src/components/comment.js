import {AbstractComponent} from "./abstract-component";

export class Comment extends AbstractComponent{
  constructor(dataComment) {
    super();
    this._date = dataComment.date;
    this._author = dataComment.author;
    this._emoji = dataComment.emoji;
    this._text = dataComment.text;
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
            <span class="film-details__comment-day">${this._date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    </div>`;  
  };
}