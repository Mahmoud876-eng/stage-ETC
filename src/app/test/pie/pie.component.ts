import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { OnChanges, SimpleChanges } from '@angular/core';;
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {

  @Input() yes: any;
  
  api: any;
  dispute: any[] = [];
  options: any = {};
  constructor(private http: HttpClient, private  cdr :ChangeDetectorRef, private socket: SocketService) { }
  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['yes'] && Array.isArray(this.yes) && this.yes.length > 0) {
      
        this.options = {
            series: this.yes.map((item: any) => item.count),
            chart: {
              width: 500,
              type: 'pie' as ChartType,
            },
            labels: this.yes.map((item: any) => item.litiges),
            responsive: [{
              breakpoint: 340,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                position: 'bottom'
              }
            }
          
          }]
        };
    }
  }
  
 
  /*ngOnInit() {
    
    const url= 'http://127.0.0.1:5000/test';
    this.http.get(url).subscribe({
      next: (data) => {
        this.api = data;
        this.dispute= this.api.dispute.map(([litiges,count]: [string, number]) => ({
          litiges,
          count
        }));
        this.options = {
          series: this.dispute.map(item => item.count),
          chart: {
            width: 500,
            type: 'pie' as ChartType,
          },
          labels: this.dispute.map(item => item.litiges),
          responsive: [{
            breakpoint: 340,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          
          }]
        };
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    });
  */
  
}
