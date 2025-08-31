import { Component } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { PieComponent } from '../test/pie/pie.component';
import { LineComponent } from '../test/line/line.component';
import { TableComponent } from '../crude/table/table.component';
import { DisputeComponent } from '../crude/dispute/dispute.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user4',
  templateUrl: './user4.component.html',
  standalone: true,
  imports: [CommonModule, PieComponent, LineComponent, TableComponent, DisputeComponent],
  styleUrls: ['./user4.component.scss']
})
export class User4Component {
  id: any;
  api: any;
  dispute: any[] = [];
  dataSeries: any[] = [];
  link: string = '';
  url: any;
  constructor(private clientsService: ClientsService, private route: ActivatedRoute) { }
  ngOnInit() {
   
    this.id = this.route.snapshot.paramMap.get('id');
    this.url = `http://127.0.0.1:5000/litige/${this.id}`;
    console.log("id from route", this.id);
    this.link = `http://127.0.0.1:5000/client/join/${this.id}`;
    console.log("link", this.link);
    this.clientsService.getpieid(this.id).subscribe({
      next: (data) => {
        this.api = data;
        this.dispute = this.api.dispute.map(([litiges, count]: [string, number]) => ({
          litiges,
          count
        }));
        console.log(this.dispute);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    });
    this.clientsService.getlineid(this.id).subscribe({
      next: (data) => {
        this.api = data;
        this.dataSeries = this.api.dispute.map(([data, value]: [string, number]) => ({
          data,
          value
        }));
        console.log("just debuginig", this.dataSeries);
      }
    })
  }

}
