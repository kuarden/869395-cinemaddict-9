import _ from "../common";
import {render, clear} from "../common";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {StatisticsData} from '../components/statistics-data.js';

export class StatisticsController {
  constructor(data) {
    this._data = data;
  }

  init() {      
    const totalDuration = this._data.reduce(function(totalDuration, data) {return totalDuration + data.duration}, 0);
    const watched = this._data.reduce(function(yourWatched, data) {return yourWatched + data.watched}, 0);
    const arr = this.sortingData();

    const statisticDataContainer =  document.querySelector(`.statistic__data`);
    clear(statisticDataContainer);
    render(statisticDataContainer, new StatisticsData(totalDuration, watched, arr.genres[0]).element, `beforeend`);

    const ctx = document.querySelector(`.statistic__chart`);
    return new Chart(ctx, {
     plugins: [ChartDataLabels],
     type: `horizontalBar`,
     data: this.setData(arr.amount, arr.genres),
     options: this.setOptions(),
    });
  }

  setData(data, labels) {
    return {
      labels,
      datasets: [{data, backgroundColor: `#bbbbff`, borderWidth: 0,}],
    };
  }

  setOptions() {
    return {
      layout: {
        padding: {left: 0, right: 0, top: 0, bottom: 215}
      },
      plugins: {datalabels: {color: `#ffffff`, font: {size: 20}, align: `start`, anchor: `start`, offset: 40},
      },
      scales: {yAxes: [{barThickness: 25, ticks: {fontColor: `#ffffff`, padding: 120, fontSize: 20,}, gridLines: {display: false, drawBorder: false},}],
        xAxes: [{ticks: {display: false, beginAtZero: true,}, gridLines: {display: false, drawBorder: false}}]
      },
      legend: {display: false,
      },
      tooltips: {enabled: false,
      },
    };
  }

  sortingData() {
    const genres = _.countBy(_.flatten(this._data.map((item) => item.genres)));
    const arr = [];
    const data = {amount: [], genres: [],};

    for (let key in genres) {
      if (Object.prototype.hasOwnProperty.call(genres, key)) {
        arr.push({genre: key, amount: genres[key]});
      }
    }

    arr.sort((a, b) => b.amount - a.amount);

    arr.forEach((item) => {
      data.amount.push(item[`amount`]);
      data.genres.push(item[`genre`]);
    });

    return data;
  }
}