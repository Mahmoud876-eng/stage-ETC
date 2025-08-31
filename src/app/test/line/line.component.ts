import { HttpClient } from '@angular/common/http';
import { Component, SimpleChange, SimpleChanges, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  standalone: true,
  imports: [NgApexchartsModule],
  styleUrls: ['./line.component.scss']
  
})
export class LineComponent {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;

  
  //dataSeries: any[] = [];
  //api: any;

  @Input() dataSeries: any[] = [];
  constructor(private Http: HttpClient, private cdr : ChangeDetectorRef) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if ((changes['dataSeries'] && Array.isArray(this.dataSeries)) && this.dataSeries.length > 0) {
      console.log('Received new datay:', this.dataSeries);
      this.dataSeries=this.misiingDates(this.dataSeries); 
      this.cdr.detectChanges(); // Ensure change detection runs
      this.initChartData()
    }
  }
  misiingDates(data: {date: string, value: number}[]): {data: string, value: number}[] {
    const map = new Map(data.map((d: any) => [d.data, d.value]));
    const dates= data.map((d: any) => new Date(d.data));
    
    const mind =new Date(Math.min(...dates.map(date => date.getTime())));
    
    const maxd = new Date(Math.max(...dates.map(date => date.getTime())));
    const result: {data: string, value: number}[] = [];
    for (let d= mind; d<= maxd; d.setDate(d.getDate()+1)){
      const datastr=  d.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      result.push({
        data: datastr,
        value: map.get(datastr) || 0 
      })
    }  
    console.log("dataSeries after adding missing dates:", result);  
    return result;
  }
  public initChartData(): void {
    // Map your dataSeries to [timestamp, value] pairs for ApexCharts
    const dates = this.dataSeries.map((item : any) => [Date.parse(item.data), item.value]);
    this.series = [
      {
        name: "desputes per day",
        data: dates
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Dispute Over Time",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: function(val) {
          return val.toString(); // Show the real value
        }
      },
      title: {
        text: "Value"
      }
    };
    this.xaxis = {
      type: "datetime",
      tickAmount: 0 // Set tickAmount to 0 to show only actual data points
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function(val) {
          return val.toString(); // Show the real value
        }
      }
    };
  }
}


