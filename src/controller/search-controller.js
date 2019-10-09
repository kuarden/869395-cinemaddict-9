export class SearchController {
  constructor(phrase, data) {
    this._data = data;
    this._phrase = phrase;
  }

  searchFilms() {
    const menu = document.querySelector(`.main-navigation`);
    menu.classList.add(`visually-hidden`);
    
    const sort = document.querySelector(`.sort`);
    sort.classList.add(`visually-hidden`);
 
    const filmAll = document.querySelectorAll(`.films-list__container`)[0].childNodes;       
    filmAll.forEach((film) => film.classList.add(`visually-hidden`));

    const searchResultData = this._data.filter((film) => new RegExp(this._phrase, `i`).exec(film.title) !== null);
    
    const searchResult = document.querySelector(`.result`);   
    searchResult.classList.remove(`visually-hidden`);
    searchResult.querySelector(`.result__count`).textContent = searchResultData.length;
    
    return searchResultData;
  }

  cancelSearchFilms() {
    const menu = document.querySelector(`.main-navigation`);

    menu.classList.remove(`visually-hidden`);
    
    const sort = document.querySelector(`.sort`);
    sort.classList.remove(`visually-hidden`);
 
    const filmAll = document.querySelectorAll(`.films-list__container`)[0].childNodes;       
    filmAll.forEach((film) => film.classList.remove(`visually-hidden`));
    
    const searchResult = document.querySelector(`.result`);   
    searchResult.classList.add(`visually-hidden`);
  }
}