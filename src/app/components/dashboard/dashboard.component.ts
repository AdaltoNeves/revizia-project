import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true })
  elemento!: ElementRef;
  public item: any
  constructor() { }
  public chart: any;

  ngOnInit(): void {
    this.createChart();
    this.createChartLine()
  }
  

  createChart() {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['VW', 'FORD', 'FIAT', 'SUBARU', 'CHEVROLET',],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 30, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ano:any
  createChartLine() {
    var motadora = ['VW', 'FORD', 'FIAT', 'SUBARU', 'CHEVROLET']
    var myChart = new Chart("myChartLine", {
      type: 'line',
      data: {
        labels: motadora,
        datasets: [{
          label: '# of Votes',
          data: [90, 19, 30, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}





