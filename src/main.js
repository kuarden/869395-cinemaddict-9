import {
  FILMS_OF_SCREEN,
  FILMS_BEST_RATING,
  FILMS_RECOMMENDED
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

const renderFilm = (container, dataFilm) => {
  const comments = dataFilm.comments;
  const filmCard = new FilmCard(dataFilm);
  const filmDetail = new FilmDetail(dataFilm);

  filmCard.element.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    render(filmList, filmDetail.element, `beforeend`)
    
    filmDetail.element.addEventListener(`click`, () => {   
      unrender(filmDetail.element);  
      filmDetail.removeElement();
    });

    const commentList = filmDetail.element.querySelector(`.form-details__bottom-container`);
    render(commentList, new CommentsList(comments.length).element, `beforeend`);

    const comment = filmDetail.element.querySelector(`.film-details__comments-list`);
    for (let i = 0; i < comments.length; i++){
      render(comment, new Comment(comments[i]).element, `beforeend`);
    }
  });

  render(container, filmCard.element, `beforeend`);
}

const header = document.querySelector(`.header`);
render(header, new Search().element, `beforeend`);
render(header, new Profile().element, `beforeend`);

const main = document.querySelector(`.main`);
render(main, new Menu(groupedFilms).element, `afterbegin`);

const filmList = document.querySelector(`.main`);
render(filmList, new FilmList().element, `beforeend`);

const filmAll = document.querySelectorAll(`.films-list__container`)[0];
for (let i = 0; i < FILMS_OF_SCREEN; i++){
  renderFilm(filmAll, films[i])
}

const filmBest = document.querySelectorAll(`.films-list__container`)[1];
const filmsBest = films.slice().sort((film1, film2) => film2.rating - film1.rating);
for (let i = 0; i < FILMS_BEST_RATING; i++){
  renderFilm(filmBest, filmsBest[i]);
}

const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
const filmsRecommended = films.slice().sort((film1, film2) => film2.comments - film1.comments);
for (let i = 0; i < FILMS_RECOMMENDED; i++){
  renderFilm(filmRecommended, filmsRecommended[i]);
}

const buttonShowMore = document.querySelector(`.films-list`);
render(buttonShowMore, new ButtonShowMore().element, `beforeend`);

const statistics = document.querySelector(`.footer__statistics`);
statistics.textContent = `${films.length} movies inside`;
