import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface XXs {
  montadora: string;
  ano: number;
  totalVendido: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true })
  elemento!: ElementRef;
  public item: any
  constructor() { this.groupDataByYear() }
  public chart: any;
  public objChar: any
  public myChart!: Chart; 
  public myChartBar!: Chart; 
  ano = 2002
  public tstValue!: number
  groupedData: { [key: number]: XXs[] } = {};

  listGroup:any

  

  ngOnInit(): void {
    this.createChart();
    this.createChartLine()
    this.groupVehiclesByYear(this.listVehicle)
    this.filterDashboard(this.listGroup[0].ano)

  }


  listVehicle = [
    { 'montadora': 'VW', 'ano': 2002, 'totalVendido': 15 },
    { 'montadora': 'FORD', 'ano': 2002, 'totalVendido': 23 },
    { 'montadora': 'FIAT', 'ano': 2002, 'totalVendido': 13 },
    { 'montadora': 'SUBARU', 'ano': 2002, 'totalVendido': 10 },
    { 'montadora': 'CHEVROLET', 'ano': 2002, 'totalVendido': 10 },
    { 'montadora': 'VW', 'ano': 2003, 'totalVendido': 20 },
    { 'montadora': 'FORD', 'ano': 2003, 'totalVendido': 15 },
    { 'montadora': 'FIAT', 'ano': 2003, 'totalVendido': 5 },
    { 'montadora': 'SUBARU', 'ano': 2003, 'totalVendido': 30 },
    { 'montadora': 'CHEVROLET', 'ano': 2001, 'totalVendido': 13 },
  ];

  groupedDatas: { [key: number]: any[] } = {};

  groupDataByYear() {
    this.groupedDatas = this.listVehicle.reduce((acc, curr) => {
      if (!acc[curr.ano]) {
        acc[curr.ano] = [];
      }
      acc[curr.ano].push(curr);
      return acc;
    }, {} as { [key: number]: any[] });
  }
 
  createChart() {
    var montadoraLabels = this.listVehicle.map(function (obj) {
      return obj.montadora;
    });

    var totalVendido = this.listVehicle.map(function (obj) {
      return obj.totalVendido;
    });


    this.myChartBar = new Chart("myChart", {
      type: 'bar',
      data: {
        labels:montadoraLabels,
        datasets: [{
          label: '# of Votes',
          data: totalVendido,
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

  public createChartLine() {

    var montadoraLabels = this.listVehicle.map(function (obj) {
      return obj.montadora;
    });

    var totalVendido = this.listVehicle.map(function (obj) {
      return obj.totalVendido;
    });

    this.myChart = new Chart("myChartLine", {
      type: 'line',
      data: {
        labels: montadoraLabels,
        datasets: [{
          label: '# of Votes',
          data: totalVendido,
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


  

  public filterDashboard(value:number):void{
    
    const datosFiltrados = this.listVehicle.filter((x) => x.ano == value);
    const chartData = datosFiltrados.map((vehicle) => vehicle.totalVendido);
    const cs = datosFiltrados.map((vehicle) => vehicle.montadora);

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

  groupedVehicles: { ano: number, veiculos: any[] }[] = [];


  groupVehiclesByYear(vehicles: any[]): any {
    const groupedVehicles: { [key: number]: any[] } = {};

    for (const vehicle of vehicles) {
      const year = vehicle.ano;
      if (!groupedVehicles[year]) {
        groupedVehicles[year] = [];
      }
      groupedVehicles[year].push(vehicle);
    }
  
    // Converte o objeto de grupos em um array de objetos tipados
    this.groupedVehicles = Object.entries(groupedVehicles).map(([ano, veiculos]) => ({
      ano: parseInt(ano, 10),
      veiculos,
    }));

    this.listGroup = this.groupedVehicles
    
  }


}










