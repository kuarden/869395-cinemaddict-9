import {
    FILMS_OF_SCREEN,
    FILMS_BEST_RATING,
    FILMS_RECOMMENDED
  }  from '../const';
  
import {render, unrender, clear} from "../common";
import {Sort} from '../components/sort'
import {FilmList} from '../components/film-list';
import {FilmCard} from '../components/film-card';
import {FilmDetail} from '../components/film-detail';
import {Comment} from '../components/comment';
import {CommentsList} from '../components/comments-list';
import {ButtonShowMore} from '../components/button-show-more';
import {NoFilmsMessage} from '../components/no-films-message';
  
export class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._filmsShow = 0;
    this._sorted = `default`;
  }  
  
  _renderFilm(container, dataFilm) {
    const comments = dataFilm.comments;
    const filmCard = new FilmCard(dataFilm);
    const filmDetail = new FilmDetail(dataFilm);
    
    filmCard.element.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
      render(container, filmDetail.element, `beforeend`)
      
      const btnClose = filmDetail.element.querySelector(`.film-details__close-btn`);
      
      const closeFilmDetail = () => {
        unrender(filmDetail.element);  
        filmDetail.removeElement;
        document.removeEventListener(`keydown`, pressEsc);
      };
  
      const pressEsc = (event) => {
        if (event.keyCode === 27){
          closeFilmDetail();
        }
      };
  
      const commentList = filmDetail.element.querySelector(`.form-details__bottom-container`);
      render(commentList, new CommentsList(comments.length).element, `beforeend`);
  
      const comment = filmDetail.element.querySelector(`.film-details__comments-list`);
      for (let i = 0; i < comments.length; i++){
        render(comment, new Comment(comments[i]).element, `beforeend`);
      }
  
      const commentInput = filmDetail.element.querySelector(`.film-details__comment-input`);
      
      btnClose.addEventListener(`click`, () => {   
        closeFilmDetail();
      });
  
      document.addEventListener(`keydown`, pressEsc);
  
      commentInput.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, pressEsc);
      });
  
      commentInput.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, pressEsc);
      });
    });
  
    render(container, filmCard.element, `beforeend`);
  }
  
  _renderAllFilms(filmsIndexStart, filmIndexEnd) {
    const filmAll = document.querySelectorAll(`.films-list__container`)[0];   
    clear(filmAll);
    
    let filmsAll;

    console.log(this._sorted);

    switch(this._sorted) {
      case `date`:
          filmsAll = this._films.slice().sort((film1, film2) => film2.releaseDate - film1.releaseDate);
          break;          
      case `rating`:
          filmsAll = this._films.slice().sort((film1, film2) => film2.rating - film1.rating);
          break;
      default:
          filmsAll = this._films.slice();
          break;         
    } 
    
    for (let i = filmsIndexStart; i < filmIndexEnd; i++){
      this._renderFilm(filmAll, filmsAll[i]);
    }
  }

  _renderFilmsBest() {
    const filmBest = document.querySelectorAll(`.films-list__container`)[1];
    const filmsBest = this._films.slice().sort((film1, film2) => film2.rating - film1.rating);
    const filmsBestCount = FILMS_BEST_RATING <= this._films.length ? FILMS_BEST_RATING : this._films.length;
    for (let i = 0; i < filmsBestCount; i++){
       this._renderFilm(filmBest, filmsBest[i]);
    }
  }

  _renderFilmsRecommended() {
    const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
    const filmsRecommended = this._films.slice().sort((film1, film2) => film2.comments - film1.comments);
    const filmsRecommendedCount = FILMS_RECOMMENDED <= this._films.length ? FILMS_RECOMMENDED : this._films.length;
    for (let i = 0; i < filmsRecommendedCount; i++){
      this._renderFilm(filmRecommended, filmsRecommended[i]);
    }  
  }

  init() {
    this._filmsShow = FILMS_OF_SCREEN;
    let buttonShowMoreVisible = true;
    
    if (this._films.length === 0) {
      render(this._container, new NoFilmsMessage().element, `beforeend`);
    }
    else {
      render(this._container, new Sort().element, `beforeend`);
      const buttonSort = this._container.querySelector(`.sort`);
      buttonSort.addEventListener('click', (event) => {
        this._sorted = event.target.dataset.sortType;
        this._renderAllFilms(0, this._filmsShow);
      });

      const filmList = new FilmList();
      render(this._container, filmList.element, `beforeend`);

      if (FILMS_OF_SCREEN >= this._films.length) {
        this._renderAllFilms(0, this._films.length);
        buttonShowMoreVisible = false;
      }
      else {
        this._renderAllFilms(0, FILMS_OF_SCREEN);
      }

      this._renderFilmsBest();
      
      this._renderFilmsRecommended();

      if (buttonShowMoreVisible) {
        const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
        render(buttonShowMoreContainer, new ButtonShowMore().element, `beforeend`);
        const buttonShowMore = this._container.querySelector(`.films-list__show-more`);
        
        buttonShowMore.addEventListener('click', () => {
          if (this._filmsShow + FILMS_OF_SCREEN < this._films.length) {

            this._renderAllFilms(0, this._filmsShow + FILMS_OF_SCREEN);
            this._filmsShow = this._filmsShow + FILMS_OF_SCREEN;
          }
          else{       
            this._renderAllFilms(FILMS_OF_SCREEN, this._films.length);
            this._filmsShow = this._films.length;
            buttonShowMoreContainer.removeChild(buttonShowMore);
          }
        });
      }
    }
  }
}

