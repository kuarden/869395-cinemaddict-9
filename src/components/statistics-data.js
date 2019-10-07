import {AbstractComponent} from "./abstract-component";
import moment from 'moment';
import 'moment-duration-format';

export class StatisticsData extends AbstractComponent {
    constructor(totalDuration, watched, topGenre) {
      super(); 
      this._totalDuration = totalDuration;
      this._watched = watched;    
      this._topGenre = topGenre
    }
    
  get template() {
    return `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watched}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${moment.duration(this._totalDuration, `minutes`).format(`h[h] m[m]`)}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre}</p>
      </li>
    </ul>`;
  }
}