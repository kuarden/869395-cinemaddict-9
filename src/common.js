import {ANIMATION}  from './const';

const _ = require(`lodash`);

export const getRandomBool = () => Boolean(Math.round(Math.random()));

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElementOfArray = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomDate = (dateBegin, dateEnd) => {
  var date = new Date(+dateBegin + Math.random() * (dateEnd - dateBegin));
  return date;
}

export const getDate = (date) => dateFormat.format(date);

export const dateFormat = new Intl.DateTimeFormat(`en-GB`, {
    month: `long`,
    day: `numeric`,
    year: `numeric`
});

export const createElement = (template) => {
  const el = document.createElement(`div`);
  el.innerHTML = template.trim();
  return el.firstChild;
};

export const render = (container, element, position) => { 
  switch (position) {
    case `afterbegin`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const clear = (element) => {
  if (element) {
    element.innerHTML = ``;
  }
};

export const shake = (container) => {
  const ANIMATION_TIMEOUT = ANIMATION;
  container.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`
  
  setTimeout(() => {
    container.style.animation = ``
  }, ANIMATION_TIMEOUT);
}

export default _;