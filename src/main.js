import createSearchTemplate from '../src/components/search';
import createProfileTemplate from './components/profile';
import createMenuTemplate from '../src/components/menu';
import createFilmCardTemplate from './components/film-card';
import createButtonShowMoreTemplate from './components/button-show-more';
import createFilmDetailTemplate from './components/film-detail';

const render = (container, place, template) => {
    container.insertAdjacentHTML(place, template);
  };

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const filmDetail = document.querySelector(`.films-list`);
const buttonShowMore = document.querySelector(`.films-list`);
const filmList = document.querySelectorAll(`.films-list__container`)[0];
const filmListTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmListMostCommented = document.querySelectorAll(`.films-list__container`)[2];

render(header, `beforeend`, createSearchTemplate());
render(header, `beforeend`, createProfileTemplate());
render(main, `afterbegin`, createMenuTemplate());
//render(filmDetail, `beforeend`, createFilmDetailTemplate())
render(buttonShowMore, `beforeend`, createButtonShowMoreTemplate());

new Array(5).fill(``).forEach(() => render(filmList, `beforeend`, createFilmCardTemplate()));
new Array(2).fill(``).forEach(() => render(filmListTopRated, `beforeend`, createFilmCardTemplate()));
new Array(2).fill(``).forEach(() => render(filmListMostCommented, `beforeend`, createFilmCardTemplate()));


