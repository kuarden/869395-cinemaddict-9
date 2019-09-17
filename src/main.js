import {
  FILMS_OF_SCREEN,
  FILMS_BEST_RATING,
  FILMS_RECOMMENDED,
  FILMS_NUMBER
}  from './const';

import {
  films, 
  groupedFilms} from './data';

import {
  render, 
  unrender} from "./common";

import {Search} from './components/search';
import {Profile} from './components/profile';
import {Menu} from './components/menu';
import {FilmList} from './components/film-list';
import {FilmCard} from './components/film-card';
import {FilmDetail} from './components/film-detail';
import {Comment} from './components/comment';
import {CommentsList} from './components/comments-list';
import {ButtonShowMore} from './components/button-show-more';
import {NoFilmsMessage} from './components/no-films-message';

let filmsMore = 5;
let buttonShowMoreVisible = true;

const renderFilm = (container, dataFilm) => {
  const comments = dataFilm.comments;
  const filmCard = new FilmCard(dataFilm);
  const filmDetail = new FilmDetail(dataFilm);
  
  filmCard.element.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    
    console.log(filmList);

    render(filmList, filmDetail.element, `beforeend`)
    
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

const header = document.querySelector(`.header`);
render(header, new Search().element, `beforeend`);
render(header, new Profile().element, `beforeend`);

const main = document.querySelector(`.main`);
render(main, new Menu(groupedFilms).element, `afterbegin`);

if (FILMS_NUMBER === 0) {
  const noFilmsMessage = document.querySelector(`.main`);
  render(noFilmsMessage, new NoFilmsMessage().element, `beforeend`);
}
else{
  const filmList = document.querySelector(`.main`);
  
  render(filmList, new FilmList().element, `beforeend`);
  
  const filmAll = document.querySelectorAll(`.films-list__container`)[0];
  const renderAllFilms = (filmsIndexStart, filmIndexEnd) => {
    for (let i = filmsIndexStart; i < filmIndexEnd; i++){
      renderFilm(filmAll, films[i]);
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
  const filmsBest = films.slice().sort((film1, film2) => film2.rating - film1.rating);
  const filmsBestCount = FILMS_BEST_RATING <= FILMS_NUMBER ? FILMS_BEST_RATING : FILMS_NUMBER;
  for (let i = 0; i < filmsBestCount; i++){
    renderFilm(filmBest, filmsBest[i]);
  }
  
  const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
  const filmsRecommended = films.slice().sort((film1, film2) => film2.comments - film1.comments);
  const filmsRecommendedCount = FILMS_RECOMMENDED <= FILMS_NUMBER ? FILMS_RECOMMENDED : FILMS_NUMBER;
  for (let i = 0; i < filmsRecommendedCount; i++){
    renderFilm(filmRecommended, filmsRecommended[i]);
  }
  
  if (buttonShowMoreVisible) {
    const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
    render(buttonShowMoreContainer, new ButtonShowMore().element, `beforeend`);
    const buttonShowMore = filmList.querySelector(`.films-list__show-more`);
    
    buttonShowMore.addEventListener('click', () => {
      if (filmsMore + FILMS_OF_SCREEN < films.length) {
        renderAllFilms(filmsMore, filmsMore + FILMS_OF_SCREEN);
        filmsMore = filmsMore + FILMS_OF_SCREEN;
      }
      else{       
        renderAllFilms(filmsMore, films.length); 
        buttonShowMoreContainer.removeChild(buttonShowMore);
      }
    });
  }  
}

const statistics = document.querySelector(`.footer__statistics`);
statistics.textContent = `${films.length} movies inside`;
