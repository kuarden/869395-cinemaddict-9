import {createFilmCardTemplate} from './film-card';
import {films} from './../data';

const listFilm = films.slice();

export const renderFilms = (initialFilms, count) => {
  if (initialFilms.length > 0) {
    return initialFilms.splice(0, count).map(createFilmCardTemplate).join(``);
  }
  return ``;
};

export {listFilm};

export const createFilmListTemplate = (number) =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${renderFilms(listFilm, number)}
      </div>
  </section>`;
