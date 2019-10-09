import {_, render, unrender, createElement, clear} from "../common";
import {FilmCard} from '../components/film-card';
import {FilmDetail} from '../components/film-detail';
import {FilmRating} from '../components/film-rating';
import {Comment} from '../components/comment';
import {CommentsList} from '../components/comments-list';
import {api} from "../main";

export class MovieController {
  constructor(container, data, maxIdComment, onDataChange, onChangeView) {   
    this._container = container;
    this._data = data;
    this._filmCard = new FilmCard(data);
    this._filmDetail = new FilmDetail(data);
    this._filmRating = new FilmRating(data);
    this._maxIdComment = maxIdComment;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.init(); 
  }  

  init() {   
    const closeFilmDetail = () => {
      unrender(this._filmDetail.element);  
      this._filmDetail.removeElement;
      document.removeEventListener(`keydown`, pressEsc);
    }

    const pressEsc = (event) => {     
      if (event.keyCode === 27){
        closeFilmDetail();
      }
    }

    const pressControl = (event) => {  
      if (event.target.tagName !== `INPUT` && event.target.tagName !== `BUTTON`)  {
        return false
      }   
      const newData = _.cloneDeep(this._data);
      switch (event.target.dataset.controlType) {      
        case `watchlist`:   
          newData.watchlist = !newData.watchlist;         
          break;
        case `watched`:
          newData.watched = !newData.watched;
          break;
        case `favorite`:
          newData.favorite = !newData.favorite;
          break;
      }
      api.update(newData).then(() => {});
      this._onDataChange(newData, this._data);
      this._data = newData;
    }

    const showRating = (show) => {     
      const filmRating = this._filmDetail.element.querySelector(`.form-details__film-rating`);
        if (show){
        render(filmRating, this._filmRating.element, `beforeend`);
      } 
      else{
        clear(filmRating); 
        filmRating.removeElement;
       }
    }

    const deleteComment = (container, id) => {     
      container.addEventListener(`click`, (event) => {       
        event.preventDefault();   

        const newData = _.cloneDeep(this._data);
        const i = newData.commentsId.indexOf(id);
        if (i != -1) newData.commentsId.splice(i, 1);
        
        api.update(newData).then(() => {});
        api.delete(id).then(() => {});
        
        event.target.closest(`.film-details__comment`).remove(); 

        this._filmDetail.element.querySelector(`.film-details__comments-count`).innerHTML = newData.commentsId.length;
        this._onDataChange(newData, this._data);
        this._data = newData;      
      });
    }

    const renderFilmDetail = () => {       
      event.preventDefault();  
      this._onChangeView();

      render(document.body, this._filmDetail.element, `beforeend`);

      const btnControlDetail = this._filmDetail.element.querySelector(`.film-details__controls`);
      btnControlDetail.addEventListener(`click`, (event) => pressControl(event)); 
      
      const btnClose = this._filmDetail.element.querySelector(`.film-details__close-btn`);
      btnClose.addEventListener(`click`, () => {   
        closeFilmDetail();
        document.removeEventListener(`keydown`, pressEsc);
      });

      const btnWatched = this._filmDetail.element.querySelector(`#watched`);
      showRating(btnWatched.checked);
      btnWatched.addEventListener(`click`, () => showRating(btnWatched.checked)); 
 
      const commentList = this._filmDetail.element.querySelector(`.form-details__bottom-container`);
      render(commentList, new CommentsList(this._data.commentsId.length).element, `beforeend`);
      
      const comment = this._filmDetail.element.querySelector(`.film-details__comments-list`);     
      api.comments(this._data.id).then((data) => {
        for (let i = 0; i < data.length; i++){
          render(comment, new Comment(data[i]).element, `beforeend`);
          const btnCommentDelete = this._filmDetail.element.querySelectorAll(`.film-details__comment-delete`)[i];
          deleteComment(btnCommentDelete, data[i].id);
        }
      });
  
      const commentInput = this._filmDetail.element.querySelector(`.film-details__comment-input`);           
      document.addEventListener(`keydown`, pressEsc);
      commentInput.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, pressEsc);
      });
      commentInput.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, pressEsc);
      });

      const emojiList = this._filmDetail.element.querySelectorAll(`.film-details__emoji-list`);
      emojiList.forEach((emoji) => {
        emoji.addEventListener(`click`, (event) => {
          if (event.target.tagName === `INPUT`) {
            const emojiName = event.target.value;
            const emojiContainer = commentList.querySelector(`.film-details__add-emoji-label`);  
            emojiContainer.innerHTML = ``;
            emojiContainer.appendChild(createElement(`<img src="./images/emoji/${emojiName}.png" id="${emojiName} "width="55" height="55" alt="emoji">`));
          }
        });
      });

      commentInput.addEventListener(`keydown`, (event) => {
        if (event.keyCode === 13) {  
          event.preventDefault();       
          const emojiContainer = commentList.querySelector(`.film-details__add-emoji-label`);            
          if (emojiContainer.firstChild != null){      
            const newData = _.cloneDeep(this._data); 
            const img = emojiContainer.firstChild.id.trim();

            const newComment = {    
              id: `${++this._maxIdComment}`,
              date: new Date(),
              author: `Yuri Voskoboinikov`,
              emoji: img,
              text: commentInput.value
            }

            api.create(newComment, this._data.id).then(() => {
              render(comment, new Comment(newComment).element, `beforeend`);
              const btnCommentDelete = this._filmDetail.element.querySelector(`.film-details__comments-list`).lastChild;             
              deleteComment(btnCommentDelete, newComment.id);
            });
            
            newData.commentsId.push(id);
            commentList.querySelector(`.film-details__comments-count`).innerHTML = newData.commentsId.length;
            this._onDataChange(newData, this._data);
            this._data = newData;  

            commentInput.value = ``;
            emojiContainer.innerHTML = ``;
           }
         }
      });
    }

    this._filmCard.element.querySelector(`.film-card__controls`).addEventListener(`click`, (event) => pressControl(event)); 
    this._filmCard.element.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((element) => element.addEventListener(`click`, renderFilmDetail));  
    render(this._container, this._filmCard.element, `beforeend`);      
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetail.element)) {
      unrender(this._filmDetail.element);
      this._filmDetail.removeElement;
    }
  }
}
