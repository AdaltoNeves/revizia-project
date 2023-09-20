import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { VehiclesService } from 'src/app/services/vehicles.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  public item: any
  public chart: any;
  public objChar: any
  public myChart!: Chart;
  public myChartBar!: Chart;
  yearVehicle = 2002;

  public totalSold!: number;
  public totalVehicle!: number;
  public totalAnalysis!: number;

  groupedVehicles: { yearVehicle: number, veiculos: any[] }[] = [];
  listGroup: any

  public listVehicle = [
    { brand: 'VW', yearVehicle: 2002, totalSold: 15, status: 'vendido' },
    { brand: 'FORD', yearVehicle: 2002, totalSold: 23, status: 'vendido' },
    { brand: 'FIAT', yearVehicle: 2002, totalSold: 13, status: 'analise' },
    { brand: 'SUBARU', yearVehicle: 2002, totalSold: 10, status: 'analise' },
    { brand: 'CHEVROLET', yearVehicle: 2002, totalSold: 10, status: 'vendido' },
    { brand: 'VW', yearVehicle: 2003, totalSold: 20, status: 'analise' },
    { brand: 'FORD', yearVehicle: 2003, totalSold: 15, status: 'analise' },
    { brand: 'FIAT', yearVehicle: 2003, totalSold: 5, status: 'vendido' },
    { brand: 'SUBARU', yearVehicle: 2003, totalSold: 30, status: 'vendido' },
    { brand: 'CHEVROLET', yearVehicle: 2001, totalSold: 13, status: 'vendido' },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
    this.createChart();
    this.createChartLine()
    this.groupVehiclesByYear(this.listVehicle)
    this.filterDashboard(this.listGroup[0].yearVehicle)
    this.getAnalysis();
  }

  public getMakerLabels() {
    var automakerLabels;

    this.listVehicle.map(function (obj) {
      automakerLabels = obj.brand;
    });

    return automakerLabels;
  }

  public getTotalSolid(): any {
    var totalSold

    this.listVehicle.map(function (obj) {
      totalSold = obj.totalSold;
    });

    return totalSold
  }

  public createChart(): void {
    this.myChartBar = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.getMakerLabels(),
        datasets: [{
          data: this.getTotalSolid(),
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

  public createChartLine(): void {
    this.myChart = new Chart("myChartLine", {
      type: 'line',
      data: {
        labels: this.getMakerLabels(),
        datasets: [{
          data: this.getTotalSolid(),
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
        },
        plugins: {
          filler: {
            propagate: true
          }
        }
      }
    });
  }

  public filterDashboard(value: number): void {

    const filterData = this.listVehicle.filter((x) => x.yearVehicle == value);
    const chartData = filterData.map((vehicle) => vehicle.totalSold);
    const cs = filterData.map((vehicle) => vehicle.brand);

    // Atualiza os dados do conjunto de dados
    this.myChart.data.datasets[0].data = chartData;
    this.myChartBar.data.datasets[0].data = chartData;

    // Atualiza os rótulos do conjunto de dados (se você precisar)
    this.myChart.data.labels = cs;
    this.myChartBar.data.labels = cs;

    // Atualiza o gráfico
    this.myChartBar.update();
    this.myChart.update();
  }

  public groupVehiclesByYear(vehicles: any[]): void {
    const groupedVehicles: { [key: number]: any[] } = {};

    for (const vehicle of vehicles) {
      const year = vehicle.yearVehicle;
      if (!groupedVehicles[year]) {
        groupedVehicles[year] = [];
      }
      groupedVehicles[year].push(vehicle);
    }

    // Converte o objeto de grupos em um array de objetos tipados
    this.groupedVehicles = Object.entries(groupedVehicles).map(([yearVehicle, veiculos]) => ({
      yearVehicle: parseInt(yearVehicle, 10),
      veiculos,
    }));

    this.listGroup = this.groupedVehicles
  }

  public getAnalysis():void {
    this.totalVehicle = this.listVehicle.filter((x) => x.status != 'vendido').length;
    this.totalSold = this.listVehicle.filter((x) => x.status == 'vendido').length;
    this.totalAnalysis = this.listVehicle.filter((x) => x.status == 'analise').length;
  }

}










