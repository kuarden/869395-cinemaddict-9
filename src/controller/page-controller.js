import {
  FILMS_OF_SCREEN,
  FILMS_BEST_RATING,
  FILMS_RECOMMENDED,
  MIN_SEARCH_PHRASE
}  from '../const';

import {render, unrender, clear} from "../common";
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

export class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._showFilmsCount = 0;
    this._dataCount = this._data.length;
    this._sorted = `default`;
    this._mode = `default`;
    this._filmList = new FilmList();
    this._statisticsContainer = new StatisticsContainer(data);
    this._subscriptions = [];
    this._buttonShowMoreVisible = !(this._data.length > FILMS_OF_SCREEN);
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);  
    this._maxIdComment = this._getMaxIdComment(data);
  }  

  _groupedFilms(data) {
    let watchlist = 0;
    let watched = 0;
    let favorite = 0;
    data.forEach((d) => {
      watchlist = watchlist + d.watchlist;
      watched = watched + d.watched;
      favorite = favorite + d.favorite;
    }); 
    return {watchlist, watched, favorite}
  }

  _getMaxIdComment(data) {
    let maxId = 0;
    data.forEach((commentListId) => {
      const id = Math.max.apply(null, commentListId.commentsId);
      maxId = maxId < id ? id : maxId; 
    }); 
    return maxId;
   }

  _isCommented(data) {
    let result = false;
    data.forEach((data) => {
      if (data.commentsId.length > 0) {        
        result = true;
      }
    }); 
    return result;
   }

  _isRating(data) {
    let result = false;
    data.forEach((data) => {
      if (data.userRating > 0) {
        result = true;
      }
    }); 
    return result;
   }

  init() {   
    this._showFilmsCount = 0;

    this._updateProfile(this._groupedFilms(this._data).favorite);

    if (this._data.length === 0) {
      render(this._container, new NoFilmsMessage().element, `beforeend`);
    } else 
    { render(this._container, new Sort().element, `beforeend`);
      const buttonSort = this._container.querySelector(`.sort`);
      buttonSort.addEventListener('click', (event) => {
        this._sorted = event.target.dataset.sortType;
        this._renderFilmsList(this._data, true, false);
      });

      render(this._container, new Menu(this._groupedFilms(this._data)).element, `beforeend`);
      render(this._container, this._statisticsContainer.element, `beforeend`);
      render(this._container, this._filmList.element, `beforeend`);   
      this._renderFilmsList(this._data);

      const menu = this._container.querySelector(`.main-navigation`);
      menu.addEventListener(`click`, (event) => this._onMenuChange(event));
      this._hideStatistics(this._mode);

      const searchField = document.querySelector(`.search__field`);
      const searchReset = document.querySelector(`.search__reset`);

      searchReset.addEventListener(`click`, () => {
        const searchResultContainer = this._container.querySelector(`.films-list__title`);
        render(searchResultContainer, new SearchResult().element, `beforeend`);
        const searchController = new SearchController(this._phrase, this._data);
        searchController.cancelSearchFilms();
        this._showFilmsCount = 0;
        this._renderFilmsList(this._data, false, true);
      });

      searchField.addEventListener(`input`, () => { 
        const searchResultContainer = this._container.querySelector(`.films-list__title`);
        render(searchResultContainer, new SearchResult().element, `beforeend`);
        this._phrase = searchField.value;
        const searchController = new SearchController(this._phrase, this._data);
        if (this._phrase.length >= MIN_SEARCH_PHRASE) {
        const searchResult = searchController.searchFilms();           
        this._renderFilmsList(searchResult, false, true);
        } else 
        if (this._phrase.length < MIN_SEARCH_PHRASE) {
        searchController.cancelSearchFilms();
        this._showFilmsCount = 0;
        this._renderFilmsList(this._data, false, true);
        }
      });
    }
  
    const statistics = document.querySelector(`.footer__statistics`);
    statistics.textContent = `${this._data.length} movies inside`;
  }
  
  _updateMenuData(data) {
    const groupedFilms = this._groupedFilms(data);
    document.querySelectorAll(`.main-navigation__item-count`)[0].innerHTML = groupedFilms.watchlist;
    document.querySelectorAll(`.main-navigation__item-count`)[1].innerHTML = groupedFilms.watched;
    document.querySelectorAll(`.main-navigation__item-count`)[2].innerHTML = groupedFilms.favorite;
    this._updateProfile(groupedFilms.favorite);
  }

  _updateProfile(rating){
    const profile = document.querySelector(`.profile__rating`);  
    switch(true) {
      case rating <= 10:
        profile.innerHTML = `Notice`;
        break;
      case rating > 10 && rating <= 20:
        profile.innerHTML = `Fan`;
        break;     
      case rating > 20:
        profile.innerHTML = `Movie buff`;
        break;               
    }
  }

  _showButtonShowMore() {
    if (!this._buttonShowMoreVisible){
      const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
      render(buttonShowMoreContainer, new ButtonShowMore().element, `beforeend`);
      const buttonShowMore = this._container.querySelector(`.films-list__show-more`);
      buttonShowMore.addEventListener('click', () => {
        this._renderFilmsList(this._data);
      });  
    }
  }

  _hideButtonShowMore() {
     const buttonShowMoreContainer = document.querySelectorAll(`.films-list`)[0];
     const buttonShowMore = this._container.querySelector(`.films-list__show-more`);
     buttonShowMoreContainer.removeChild(buttonShowMore);
  }

  _renderFilmsList(data, isSorted = false, isSearch = false) {
    
    const filmAll = document.querySelectorAll(`.films-list__container`)[0];   
    clear(filmAll);    
    
    let filmsSorted;
    switch(this._sorted) {
      case `date`:
        filmsSorted = data.slice().sort((film1, film2) => film2.releaseDate - film1.releaseDate);
        break;          
      case `rating`:
        filmsSorted = data.slice().sort((film1, film2) => film2.rating - film1.rating);
        break;
      default:
        filmsSorted = data.slice();
        break;         
    }  

    let filmsAll;
    if (isSearch) {
      filmsAll = filmsSorted.slice();
    } 
    else {
      switch(this._mode) {
        case `watchlist`:
          filmsAll = filmsSorted.slice().filter((d) => {return d.watchlist === true});
          break;          
        case `watched`:
          filmsAll = filmsSorted.slice().filter((d) => {return d.watched === true});
          break;
        case `favorite`:
          filmsAll = filmsSorted.slice().filter((d) => {return d.favorite === true});
          break;     
        default:
          filmsAll = filmsSorted.slice();
          break; 
      }
    }

    this._dataCount = filmsAll.length;

    if (!isSorted) {
      let delta = 0;
      if (this._dataCount >= this._showFilmsCount + FILMS_OF_SCREEN) {
        delta = FILMS_OF_SCREEN;
      }
      else {
        delta = this._dataCount - this._showFilmsCount;
      }
  
      if (delta + this._showFilmsCount + FILMS_OF_SCREEN < this._dataCount && !this._buttonShowMoreVisible) {
        this._showButtonShowMore();
        this._buttonShowMoreVisible = true;
      }  else 
      if (delta + this._showFilmsCount >= this._dataCount && this._buttonShowMoreVisible) {
        this._hideButtonShowMore()
        this._buttonShowMoreVisible = false;
      }
      
      this._showFilmsCount = this._showFilmsCount  + delta;
    }

    for (let i = 0; i < this._showFilmsCount; i++) {
      this._renderFilm(filmAll, filmsAll[i]);
    }

    if (!isSearch){
      if (this._isRating(this._data)){ 
        const filmBest = document.querySelectorAll(`.films-list__container`)[1];
        clear(filmBest);
        const filmsBest = data.slice().sort((film1, film2) => film2.rating - film1.rating);
        const filmsBestCount = FILMS_BEST_RATING <= data.length ? FILMS_BEST_RATING : data.length;
        for (let i = 0; i < filmsBestCount; i++){
           this._renderFilm(filmBest, filmsBest[i]);
        } 
      } 

      if (this._isCommented(this._data)){
        const filmRecommended = document.querySelectorAll(`.films-list__container`)[2];
        clear(filmRecommended);
        const filmsRecommended = this._data.slice().sort((film1, film2) => film2.comments - film1.comments);
        const filmsRecommendedCount = FILMS_RECOMMENDED <= data.length ? FILMS_RECOMMENDED : data.length;
        for (let i = 0; i < filmsRecommendedCount; i++){
          this._renderFilm(filmRecommended, filmsRecommended[i]);
        } 
      }
    }
  }

  _renderFilm(container, data) {
    const movieController = new MovieController(container, data, this._maxIdComment, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _showStatistics() {    
    const statisticsControl = new StatisticsController(this._data);
    statisticsControl.init();
    this._filmList.element.classList.add(`visually-hidden`);
    this._statisticsContainer.element.classList.remove(`visually-hidden`);
  }

  _hideStatistics(mode) {  
    this._filmList.element.classList.remove(`visually-hidden`);
    this._statisticsContainer.element.classList.add(`visually-hidden`);

    if (this._mode !== mode) {
      this._mode = mode;
      this._showFilmsCount = 0;
      this._renderFilmsList(this._data);
    }
  }

  _onMenuChange(event) {    
    const mode = event.target.dataset.modeType;
    switch (mode) {
      case `stats`:
        this._showStatistics();
        break;
      default:
        this._hideStatistics(mode);
        break;                     
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._data[this._data.findIndex((filmCard) => filmCard === oldData)] = newData;   
    this._updateMenuData(this._data);
    this._renderFilmsList(this._data, true);
  }
}


