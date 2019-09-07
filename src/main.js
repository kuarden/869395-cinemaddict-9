import {
  FILMS_OF_SCREEN,
  FILMS_BEST_RATING,
  FILMS_RECOMMENDED
}  from './const';

import {
  films, groupedFilms
} from './data';

import {createSearchTemplate} from './components/search';
import {createProfileTemplate} from './components/profile';
import {createMenuTemplate} from './components/menu';
import {createFilmListTemplate} from './components/film-list';
import {createButtonShowMoreTemplate} from './components/button-show-more';
import {createFilmDetailTemplate} from './components/film-detail';
import {listFilm} from './components/film-list';
import {renderFilms} from './components/film-list';

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
render(main, `afterbegin`, createMenuTemplate(groupedFilms));
render(buttonShowMore, `beforeend`, createButtonShowMoreTemplate());
render(filmDetail, `beforeend`, createFilmDetailTemplate(films[0]))
render(filmList, `beforeend`, createFilmListTemplate(FILMS_OF_SCREEN));
render(filmListTopRated, `beforeend`, createFilmListTemplate(FILMS_BEST_RATING));
render(filmListMostCommented, `beforeend`, createFilmListTemplate(FILMS_RECOMMENDED));

const statistics = document.querySelector(`.footer__statistics`);
statistics.textContent = `${films.length} movies inside`;

if (listFilm.length > 0) {
  const showButton = main.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, () => {
    render(filmsList, 'beforeend', renderFilms(listFilm, FILMS_OF_SCREEN));
    if (listFilm.length === 0) {
      showButton.style = `display: none`;
    }
  });
}

const openCardDetailBtn = document.querySelector(`.film-card`);
const closeCardDetailBtn = document.querySelector(`.film-details__close-btn`);
const filmDetails = document.querySelector(`.film-details`);

openCardDetailBtn.addEventListener(`click`, () => {
  filmDetails.style = `display: block`;
})

closeCardDetailBtn.addEventListener(`click`, () => {
  filmDetails.style = `display: none`;
})
