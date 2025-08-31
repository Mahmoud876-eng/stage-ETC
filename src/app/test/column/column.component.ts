import { Component, Input, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  api: any;
  invoice: any[] = [];
  invoices: any[] = [];
  constructor(private http: HttpClient) {}
  @Input() set apiData(url: any) {
    console.log('API URL set:', url);
    this.http.get(url).subscribe({
      next: (data) => {
        this.api = data;
        this.invoice = this.api.invoices;
        console.log('Invoices data:', this.invoice);
        this.column();
      },
      error: (err) => {
        console.error('HTTP error loading invoices:', err);
        this.invoice = [];
        this.invoices = [];
      }
    });
  }
  
   column(){
    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          //data: [21, 22, 10, 28, 16, 21, 13, 30]
          data: this.invoice.map((inv: any) => inv.count)  
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.invoice.map((inv: any) => inv.name),
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
            fontSize: "12px"
          }
        }
      }
    };
    
  }

}
