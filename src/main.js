import {render} from "./common";
import {Search} from './components/search';
import {Profile} from './components/profile';
import {PageController} from './controller/page-controller';
import {API} from './api';

const AUTHORIZATION = `Basic 1jefnvfdjfLJgmdhhK3dfdjheddZss47dmi`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
export const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});

const header = document.querySelector(`.header`);
render(header, new Search().element, `beforeend`);
render(header, new Profile().element, `beforeend`);

const main = document.querySelector(`.main`);

api.films().then((data) => {
    const pageController = new PageController(main, data);
    pageController.init();
});
