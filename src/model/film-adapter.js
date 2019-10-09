export class FilmAdapter {
    constructor(data) {
      this.id = data.id;
      this.title = data.film_info.title;
      this.titleAlternative = data.film_info.alternative_title || ``;
      this.age = data.film_info.age_rating || 0;
      this.rating = data.film_info.total_rating || 0;
      this.duration = data.film_info.runtime || 0;
      this.year = new Date(data.film_info.release.date);
      this.country = data.film_info.release.release_country || ``;
      this.director = data.film_info.director || ``;
      this.writers = data.film_info.writers || [];
      this.actors = data.film_info.actors || [];
      this.genres = data.film_info.genre || [];
      this.poster = data.film_info.poster || ``;
      this.description = data.film_info.description || ``;
      this.commentsId = data.comments || [];
      this.watchlist = data.user_details.watchlist || false;
      this.watched = data.user_details.already_watched || false;
      this.favorite = data.user_details.favorite || false;
      this.userScore = data.user_details.personal_rating;
      this.watchingDate = data.user_details.watching_date || 0;
    }
  
    static toRAW(data) {    
      return {
        'id': data.id,
        'comments': data.commentsId,
        'film_info': {
          'title': data.title,
          'alternative_title': data.titleAlternative,
          'age_rating': data.age,
          'total_rating': data.rating,
          'runtime': data.duration,
          'poster': data.poster,
          'release': {
            'date': new Date(data.year),
            'release_country': data.country,
          },
          'director': data.director,
          'writers': data.writers,
          'actors': data.actors,
          'genre': data.genres,
          'description': data.description,
        },
        'user_details': {
          'watchlist': data.watchlist,
          'already_watched': data.watched,
          'favorite': data.favorite,
          'personal_rating': Number(data.userScore) || 0,
          'watching_date': new Date(data.watchingDate),
        },
      };
    }
  
    static parseFilm(data) {
      return new FilmAdapter(data);
    }
  
    static parseFilms(data) {
      return data.map(FilmAdapter.parseFilm);
    }
  }
  
  