import {
  FILMS_OF_SCREEN,
  FILMS_BEST_RATING,
  FILMS_RECOMMENDED,
  MIN_SEARCH_PHRASE
}  from '../const';

import {render, clear} from "../common";
import {Sort} from '../components/sort'
import {Menu} from '../components/menu'
import {FilmList} from '../components/film-list';
import {MovieController} from './movie-controller.js';
import {SearchController} from './search-controller.js';
import {StatisticsContainer} from '../components/statistics-container.js';
import {StatisticsController} from './statistics-controller.js';
import {ButtonShowMore} from '../components/button-show-more';
import {NoFilmsMessage} from '../components/no-films-message';
import {SearchResult} from '../components/search-result.js';
import {groupedFilms} from '../data'; 

export class PageController {
constructor(container, data) {
  this._container = container;
  this._data = data;
  this._filmsCount = 0;
  this._sorted = `default`;
  this._menu = new Menu(groupedFilms);
  this._filmList = new FilmList();
  this._statisticsContainer = new StatisticsContainer(data);
  this._subscriptions = [];
  this._onDataChange = this._onDataChange.bind(this);
  this._onChangeView = this._onChangeView.bind(this);   
}  

init() {   
  this._filmsCount = FILMS_OF_SCREEN;
  let buttonShowMoreVisible = true;
  
  if (this._data.length === 0) {
    render(this._container, new NoFilmsMessage().element, `beforeend`);
  }
  else {  
    render(this._container, new Sort().element, `beforeend`);
    const buttonSort = this._container.querySelector(`.sort`);
    buttonSort.addEventListener('click', (event) => {
      this._sorted = event.target.dataset.sortType;
      this._renderFilmsList(this._data, this._filmsCount);
    });

    render(this._container, this._menu.element, `beforeend`);
    render(this._container, this._statisticsContainer.element, `beforeend`);
    render(this._container, this._filmList.element, `beforeend`);   

    if (FILMS_OF_SCREEN >= this._data.length) {
      this._renderFilmsList(this._data, this._data.length);
      buttonShowMoreVisible = false;
    }
    else {
      this._renderFilmsList(this._data, FILMS_OF_SCREEN);
    }

    const menu = this._container.querySelector(`.main-navigation`);
    menu.addEventListener(`click`, (event) => this._onMenuChange(event));
    this._hideStatistics();

    if (buttonShowMoreVisible) {
      const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
      render(buttonShowMoreContainer, new ButtonShowMore().element, `beforeend`);
      const buttonShowMore = this._container.querySelector(`.films-list__show-more`);
      
      buttonShowMore.addEventListener('click', () => {
        if (this._filmsCount + FILMS_OF_SCREEN < this._data.length) {
          this._renderFilmsList(this._data, this._filmsCount + FILMS_OF_SCREEN);
          this._filmsCount = this._filmsCount + FILMS_OF_SCREEN;
        }
        else{             
          this._filmsCount = this._data.length;
          this._renderFilmsList(this._data, this._filmsCount);
          buttonShowMoreContainer.removeChild(buttonShowMore);
        }
      });
    }

    const searchField = document.querySelector(`.search__field`);
    const searchReset = document.querySelector(`.search__reset`);

    searchReset.addEventListener(`click`, () => {
      const searchResultContainer = this._container.querySelector(`.films-list__title`);
      render(searchResultContainer, new SearchResult().element, `beforeend`);
      const searchController = new SearchController(this._phrase, this._data);
      searchController.cancelSearchFilms();
      this._renderFilmsList(this._data, this._filmsCount, true);
    });

    searchField.addEventListener(`input`, () => { 
      const searchResultContainer = this._container.querySelector(`.films-list__title`);
      render(searchResultContainer, new SearchResult().element, `beforeend`);
      this._phrase = searchField.value;
      const searchController = new SearchController(this._phrase, this._data);
      if (this._phrase.length >= MIN_SEARCH_PHRASE) {
        const searchResult = searchController.searchFilms();           
        this._renderFilmsList(searchResult, searchResult.length, true);
      } else 
      if (this._phrase.length < MIN_SEARCH_PHRASE){
        searchController.cancelSearchFilms();
        this._renderFilmsList(this._data, this._filmsCount, true);
      }
    });
  } 
}
  
_renderFilmsList(data, filmCount, isSearch = false){

  const filmAll = document.querySelectorAll(`.films-list__container`)[0];   
  clear(filmAll);    
  let filmsAll;
  switch(this._sorted) {
    case `date`:
        filmsAll = data.slice().sort((film1, film2) => film2.releaseDate - film1.releaseDate);
        break;          
    case `rating`:
        filmsAll = data.slice().sort((film1, film2) => film2.rating - film1.rating);
        break;
    default:
        filmsAll = data.slice();
        break;         
  }  

  for (let i = 0; i < filmCount; i++){
    this._renderFilm(filmAll, filmsAll[i]);
  }

  if (!isSearch){
    const filmBest = document.querySelectorAll(`.films-list__container`)[1];
    clear(filmBest);
    const filmsBest = data.slice().sort((film1, film2) => film2.rating - film1.rating);
    const filmsBestCount = FILMS_BEST_RATING <= data.length ? FILMS_BEST_RATING : data.length;
    for (let i = 0; i < filmsBestCount; i++){
       this._renderFilm(filmBest, filmsBest[i]);
    }

    const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
    clear(filmRecommended);
    const filmsRecommended = this._data.slice().sort((film1, film2) => film2.comments - film1.comments);
    const filmsRecommendedCount = FILMS_RECOMMENDED <= data.length ? FILMS_RECOMMENDED : data.length;
    for (let i = 0; i < filmsRecommendedCount; i++){
      this._renderFilm(filmRecommended, filmsRecommended[i]);
    }  
  }
}

_renderFilm(container, data) {
  const movieController = new MovieController(container, data, this._onDataChange, this._onChangeView);
  this._subscriptions.push(movieController.setDefaultView.bind(movieController));
}

_showStatistics() {    
  const statisticsControl = new StatisticsController(this._data);
  statisticsControl.init();
  this._filmList.element.classList.add(`visually-hidden`);
  this._statisticsContainer.element.classList.remove(`visually-hidden`);
}

_hideStatistics() {
  this._filmList.element.classList.remove(`visually-hidden`);
  this._statisticsContainer.element.classList.add(`visually-hidden`);
}

_onMenuChange(event) {
  switch (event.target.innerHTML) {
    case `Stats`:
      this._showStatistics();
      break;
    case `All movies`:
      this._hideStatistics();
      break;
  }
}

_onChangeView() {
  this._subscriptions.forEach((subscription) => subscription());
}

_onDataChange(newData, oldData) {
  this._data[this._data.findIndex((filmCard) => filmCard === oldData)] = newData;
  this._renderFilmsList(this._data, this._filmsCount);
}
}    











