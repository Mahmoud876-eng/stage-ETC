import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { ClientsService } from 'src/app/services/clients.service';
import { MatCardModule } from '@angular/material/card';
import { LineComponent } from 'src/app/test/line/line.component';
import { PieComponent } from 'src/app/test/pie/pie.component';
import { ColumnComponent } from 'src/app/test/column/column.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatBadgeModule, MatCardModule,
    LineComponent,
    PieComponent,
    ColumnComponent
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

api: any;
  dispute: any[] = [];
  dataSeries: any[] = [];
  constructor(private clientsService: ClientsService) { }
  ngOnInit() {
    this.clientsService.getpie().subscribe({
      next: (data) => {
        this.api = data;
        this.dispute= this.api.dispute.map(([litiges,count]: [string, number]) => ({
          litiges,
          count
        }));
        console.log("this what I want",this.dispute);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    });
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
}

