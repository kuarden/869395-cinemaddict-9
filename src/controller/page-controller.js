import {
    FILMS_OF_SCREEN,
    FILMS_BEST_RATING,
    FILMS_RECOMMENDED
  }  from '../const';
  
import {render, clear} from "../common";
import {Sort} from '../components/sort'
import {FilmList} from '../components/film-list';
import {MovieController} from './movie-controller.js';
import {ButtonShowMore} from '../components/button-show-more';
import {NoFilmsMessage} from '../components/no-films-message';
import moment from 'moment';
  
export class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._filmsCount = 0;
    this._sorted = `default`;
    this._filmList = new FilmList();
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

      render(this._container, this._filmList.element, `beforeend`); 

      if (FILMS_OF_SCREEN >= this._data.length) {
        this._renderFilmsList(this._data, this._data.length);
        buttonShowMoreVisible = false;
      }
      else {
        this._renderFilmsList(this._data, FILMS_OF_SCREEN);
      }

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
    } 
  }
    
  _renderFilmsList(data, filmCount){

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

  _renderFilm(container, data) {
    const movieController = new MovieController(container, data, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._data[this._data.findIndex((filmCard) => filmCard === oldData)] = newData;
    this._renderFilmsList(this._data, this._filmsCount);
  }
}    





  





