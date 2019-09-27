import {render, unrender, createElement, clear} from "../common";
import {FilmCard} from '../components/film-card';
import {FilmDetail} from '../components/film-detail';
import {FilmRating} from '../components/film-rating';
import {Comment} from '../components/comment';
import {CommentsList} from '../components/comments-list';

export class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._filmCard = new FilmCard(data);
    this._filmDetail = new FilmDetail(data);
    this._filmRating = new FilmRating(data);
    this._comments = data.comments;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.init();
  }  

  init() {   
    const closeFilmDetail = () => {
      unrender(this._filmDetail.element);  
      this._filmDetail.removeElement;
      document.removeEventListener(`keydown`, pressEsc);
    }
      
    const pressEsc = (event) => {
      if (event.keyCode === 27){
        closeFilmDetail();
      }
    }

    const pressControl = (event) => {     
      if (event.target.tagName === `LABEL` && event.target.tagName === `INPUT`) {
        event.preventDefault();
        event.target.classList.toggle(`film-card__controls-item--active`);
      }
      switch (event.target.dataset.controlType) {
        case `watchlist`:
          this._data.watchlist = !this._data.watchlist;
          this._onDataChange(this._data, this._data);
        break;
        case `watched`:
          this._data.watched = !this._data.watched;
          this._onDataChange(this._data, this._data);
        break;
        case `favorite`:
          this._data.favorite = !this._data.favorite;
          this._onDataChange(this._data, this._data);
        break;
      }
    }

    const showRating = (show) => {     
      const filmRating = this._filmDetail.element.querySelector(`.form-details__film-rating`);
        if (show){
        render(filmRating, this._filmRating.element, `beforeend`);
      } 
      else{
        clear(filmRating); 
        filmRating.removeElement;
       }
    }

    const renderFilmDetail = () => {     
      this._onChangeView();

      render(document.body, this._filmDetail.element, `beforeend`);

      const btnControlDetail = this._filmDetail.element.querySelector(`.film-details__controls`);
      btnControlDetail.addEventListener(`click`, (event) => pressControl(event)); 
      
      const btnClose = this._filmDetail.element.querySelector(`.film-details__close-btn`);
      btnClose.addEventListener(`click`, () => {   
        closeFilmDetail();
        document.removeEventListener(`keydown`, pressEsc);
      });

      const btnWatched = this._filmDetail.element.querySelector(`#watched`);
      showRating(btnWatched.checked);
      btnWatched.addEventListener(`click`, () => showRating(btnWatched.checked)); 
 
      const commentList = this._filmDetail.element.querySelector(`.form-details__bottom-container`);
      render(commentList, new CommentsList(this._comments.length).element, `beforeend`);
  
      const comment = this._filmDetail.element.querySelector(`.film-details__comments-list`);
      for (let i = 0; i < this._comments.length; i++){
        render(comment, new Comment(this._comments[i]).element, `beforeend`);
      }

      const commentInput = this._filmDetail.element.querySelector(`.film-details__comment-input`);           
      document.addEventListener(`keydown`, pressEsc);
      commentInput.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, pressEsc);
      });
      commentInput.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, pressEsc);
      });

      commentList.querySelectorAll(`.film-details__emoji-label`).forEach((element) => {
        element.addEventListener(`click`, () => {
          const image = element.querySelector(`img`);
          commentList.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
          commentList.querySelector(`.film-details__add-emoji-label`).appendChild(
            createElement(`<img src="${image.src}" width="55" height="55" alt="emoji">`));
        });
      });
    }

    this._filmCard.element.querySelector(`.film-card__controls`).addEventListener(`click`, (event) => pressControl(event)); 
    this._filmCard.element.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((element) => element.addEventListener(`click`, renderFilmDetail));  
    render(this._container, this._filmCard.element, `beforeend`);      
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetail.element)) {
      unrender(this._filmDetail.element);
      this._filmDetail.removeElement;
    }
  }
}
