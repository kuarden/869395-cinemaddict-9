import {
    FILMS_OF_SCREEN,
    FILMS_BEST_RATING,
    FILMS_RECOMMENDED,
    FILMS_NUMBER
  }  from '../const';
  
import {render, unrender} from "../common";
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
  }  

  init() {
    let filmsMore = FILMS_OF_SCREEN;
    let buttonShowMoreVisible = true;
    
    const renderFilm = (container, dataFilm) => {
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
    
    if (FILMS_NUMBER === 0) {
      render(this._container, new NoFilmsMessage().element, `beforeend`);
    }
    else{
      render(this._container, new FilmList().element, `beforeend`);
      
      const filmAll = document.querySelectorAll(`.films-list__container`)[0];
      const renderAllFilms = (filmsIndexStart, filmIndexEnd) => {
        for (let i = filmsIndexStart; i < filmIndexEnd; i++){
          renderFilm(filmAll, this._films[i]);
        }
      };
      
      if (FILMS_OF_SCREEN >= FILMS_NUMBER) {
        renderAllFilms(0, FILMS_NUMBER);
        buttonShowMoreVisible = false;
      }
      else {
        renderAllFilms(0, FILMS_OF_SCREEN);
      }
      
      const filmBest = document.querySelectorAll(`.films-list__container`)[1];
      const filmsBest = this._films.slice().sort((film1, film2) => film2.rating - film1.rating);
      const filmsBestCount = FILMS_BEST_RATING <= FILMS_NUMBER ? FILMS_BEST_RATING : FILMS_NUMBER;
      for (let i = 0; i < filmsBestCount; i++){
        renderFilm(filmBest, filmsBest[i]);
      }
      
      const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
      const filmsRecommended = this._films.slice().sort((film1, film2) => film2.comments - film1.comments);
      const filmsRecommendedCount = FILMS_RECOMMENDED <= FILMS_NUMBER ? FILMS_RECOMMENDED : FILMS_NUMBER;
      for (let i = 0; i < filmsRecommendedCount; i++){
        renderFilm(filmRecommended, filmsRecommended[i]);
      }
      
      if (buttonShowMoreVisible) {
        const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
        render(buttonShowMoreContainer, new ButtonShowMore().element, `beforeend`);
        const buttonShowMore = filmList.querySelector(`.films-list__show-more`);
        
        buttonShowMore.addEventListener('click', () => {
          if (filmsMore + FILMS_OF_SCREEN < this._films.length) {
            renderAllFilms(filmsMore, filmsMore + FILMS_OF_SCREEN);
            filmsMore = filmsMore + FILMS_OF_SCREEN;
          }
          else{       
            renderAllFilms(filmsMore, this._films.length); 
            buttonShowMoreContainer.removeChild(buttonShowMore);
          }
        });
      }  
    }
  }
}

