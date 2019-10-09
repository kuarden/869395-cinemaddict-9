import {FilmAdapter} from './model/film-adapter';
import {CommentAdapter} from './model/comment-adapter';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  films() {
    return this._load({url: `movies`}).then(API.toJSON).then(FilmAdapter.parseFilms);
  }

  comments(id) {
    return this._load({url: `comments/${id}`}).then(API.toJSON).then(CommentAdapter.parseComments);
  }

  update(data) {
    const dataRaw = FilmAdapter.toRAW(data);
    return this._load({
      url: `movies/${data.id}`,
      method: Method.PUT,
      body: JSON.stringify(dataRaw),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(API.toJSON)
      .then(FilmAdapter.parseFilm);
  }

  create(data, id) {   
    const dataRaw = CommentAdapter.toRAW(data);   
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(dataRaw),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(API.toJSON)
      .then(CommentAdapter.parseComment);
  }

  delete(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(API.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static toJSON(response) {
    return response.json();
  }
}