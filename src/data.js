import {
    getRandomBool,
    getRandomInt,
    getRandomRange,
    getRandomElementOfArray,
    getStickerArrayUnique, 
    getDate
} from './common.js';

import {
    FILMS_NUMBER,
    MAX_DESCRIPTIONS_COUNT,
    MAX_COUNTRIES_COUNT,
    MAX_GENRES_COUNT,
    MAX_ACTORS_COUNT,
    MAX_COMMENT,
    MAX_RATING
  } from './const';

const GENRES = [
    `Documentary`,
    `Comedy`,
    `Melodrama`,
    `Drama`,
    `Fantastic`,
    `Fantasy`,
    `Horrors`,
    `Arthouse`,
    `Action`,
    `Erotica`
];

const TITLES = [
    `Fight club`,
    `Emmanuel`,
    `Fear and Loathing in Las Vegas`,
    `Kill Bill`,
    `Snatch`,
    `The Lake House`,
    `Constantine`,
    `Shibyo Osen Dead Rising`,
    `Il Bisbetico Domato`,
    `Fury`,
    `Les Miserables`,
    `Catch Me If You Can`,
    `Edward Scissorhands`,
    `Inglourious Basterds`,    
    `Gangs of New York`
];

const DESCRIPTIONS = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
];
  
const POSTERS =  [  
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
];

const DIRECTORS = [
    `Robert Zemeckis`,
    `Alfred Hitchcock`,
    `Christopher Nolan`,
    `Woody Allen`,
    `Quentin Tarantino`
];

const WRITERS = [
    `Stephen King`,
    `Chuck Palahniuk`,
    `Winston Groom`,
    `Thomas Harris`,
    `Sylvia Nazar`
];

const ACTORS = [
    `Brad Pitt`,
    `Hugh Jackmann`,
    `Jack Nicholson`,
    `Sandra Bullock`,
    `Quentin Tarantino`,
    `Kevin Costner`,
    `Gwineth Paltrow`,
    `Uma Thurman`,
    `Keanu Reeves`,
    `Tom Hanks`,
];

const COUNTRIES = [
    `USA`,
    `Great Britain`,
    `France`,
    `Italy`,
    `Russia`
];

const RELEASE_DATE = [
    `1974`,
    `1990`,
    `1996`,
    `1998`,
    `2006`,
    `2009`,
    `2010`,
    `2015`,
    `2018`
];

const AGE_CATEGORY = [
    `0+`,
    `6+`,
    `12+`,
    `16+`,
    `18+`
];

const DURATION = [
    `45 minutes`,
    `1 hour 10 minutes`,
    `1 hour 15 minutes`,
    `1 hour 30 minutes`,
    `1 hour 55 minutes`,
    `2 hour 13 minutes`,
    `2 hour 47 minutes`
];

const AUTHOR_COMMENTS = [
    `Yuri Voskoboinikov`,
    `Oleg Zubov`,
    `Lily Nagaeva`,
    `Yuri Kuzmenko`,
    `Alexander Antonov`
];

const EMOJI = [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`,
    `./images/emoji/trophy.png`
];

const COMMENTS = [
    `Very good film, I really liked it.`,
    `Best movie Ive ever seen.`,
    `So-so, to kill time, nothing more.`,
    `Just lost time. Not recommend.`,
    `The film is complete shit, as it is generally allowed by censorship.`
];

export const getComment = () => ({
    date: getDate(),
    author: getRandomElementOfArray(AUTHOR_COMMENTS),
    emoji: getRandomElementOfArray(EMOJI),
    text: getRandomElementOfArray(COMMENTS)
});

export const getComments = () => new Array(getRandomInt(MAX_COMMENT)).fill().map(getComment);

const getFilm = () => ({
    genres: getStickerArrayUnique(MAX_GENRES_COUNT, `, `, GENRES),
    title: getRandomElementOfArray(TITLES),
    poster: getRandomElementOfArray(POSTERS),
    releaseDate: getRandomElementOfArray(RELEASE_DATE),
    duration: getRandomElementOfArray(DURATION),
    rating: getRandomInt(MAX_RATING),
    description: getStickerArrayUnique(MAX_DESCRIPTIONS_COUNT, ` `, DESCRIPTIONS),
    director: getRandomElementOfArray(DIRECTORS),
    writers: getRandomElementOfArray(WRITERS),
    actors: getStickerArrayUnique(MAX_ACTORS_COUNT, `, `, ACTORS),
    country: getStickerArrayUnique(MAX_COUNTRIES_COUNT, `, `, COUNTRIES),
    age: getRandomElementOfArray(AGE_CATEGORY),
    comments: getComments(getRandomRange(1, MAX_COMMENT)),
    watchlist: getRandomBool(),
    watched: getRandomBool(),
    favorite: getRandomBool()
}); 

export const films = new Array(FILMS_NUMBER).fill().map(getFilm);

export const groupedFilms = films.reduce(({watchlist, watched, favorite}, film) => {
    watchlist += film.watchlist;
    watched += film.watched;
    favorite += film.favorite;
  
    return {watchlist, watched, favorite
    };
  }, {watchlist: 0, watched: 0, favorite: 0});