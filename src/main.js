import {films, groupedFilms} from './data';
import {render} from "./common";
import {Search} from './components/search';
import {Profile} from './components/profile';
import {PageController} from './controller/page-controller';

const header = document.querySelector(`.header`);
render(header, new Search().element, `beforeend`);
render(header, new Profile().element, `beforeend`);

const main = document.querySelector(`.main`);

const pageController = new PageController(main, films);
pageController.init();

const statistics = document.querySelector(`.footer__statistics`);
statistics.textContent = `${films.length} movies inside`;