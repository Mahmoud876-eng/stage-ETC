import { Component } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { LineComponent } from '../test/line/line.component';
import { PieComponent } from '../test/pie/pie.component';
import { ColumnComponent } from '../test/column/column.component';
import { TableComponent } from '../crude/table/table.component';
import { TabDispComponent } from '../crude/tab-disp/tab-disp.component';
import { MatCardModule } from '@angular/material/card';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  standalone: true,
  imports: [LineComponent, PieComponent, ColumnComponent, TableComponent, TabDispComponent, MatCardModule],
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  api: any;
  dispute: any[] = [];
  dataSeries: any[] = [];
  constructor(private clientsService: ClientsService, private socket: SocketService) { }
  ngOnInit() {
    this.pie();
    this.socketcall();
    
    this.clientsService.getline().subscribe({
      next: (data) => {
        this.api = data;
        this.dataSeries = this.api.dispute.map(([data,value]: [string, number]) => ({
          data,
          value
        }));
        console.log("just debuginig",this.dataSeries);
      }
    })      
  }
  pie(){
    this.clientsService.getpie().subscribe({
      next: (data) => {
        this.api = data;
        this.dispute= this.api.dispute.map(([litiges,count]: [string, number]) => ({
          litiges,
          count
        }));
        console.log(this.dispute);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    });

  }
  socketcall(){
    this.socket.listen('paid').subscribe({
      next: (data:any)=>{
        console.log("socket called:", data);
        this.pie(); // Refresh the pie chart
      }
    });

  }
}
