import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-tab-disp',
  templateUrl: './tab-disp.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  styleUrls: ['./tab-disp.component.scss']
})
export class TabDispComponent {
  constructor(private http: HttpClient, private route: Router, private socket: SocketService) { }
  api: any;
  clients: any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'name', 'address', 'email', 'phone',
     'litige_number',
    'description',  'opened_at', 'resolution_date', 'status'
  ];
  data: any[] = []; // To hold the data for the table
  //filter
  searchTerm: string = '';
  myControl = new FormControl('');
  client: any[] = [];
  filtered!: Observable<string[]>;
  clienttNames: string[] = [];

  ngOnInit() {
    this.disputeapi();
    this.socketcall();
  }
  socketcall(){
    this.socket.listen('dispute_resolved').subscribe({
      next: (data:any)=>{
        console.log("Notification received:", data);
        this.disputeapi(); // Refresh the notifications
      }
    });

  }
  disputeapi(){
    const url = "http://127.0.0.1:5000/client/join";
    this.filtered = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.http.get(url, { withCredentials: true }).subscribe({
      next: (data) => {
        this.api = data;
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'clientid', 'created_at', 'description', 'due_date', 'email', 'invoice_id','litige_number',
          'name', 'opened_at', 'phone', 'resolution_date', 'status', 'updated_at'
        ];
        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        this.client = this.api.clients;
        this.clienttNames = this.client.map((client: any) => client.name);
        console.log("client", this.data);
        this.dataSource = this.data;
      }
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clienttNames.filter(name => name.toLowerCase().includes(filterValue));
  }
  transfer() {
    // Logic to transfer data
    const searchTerm = this.myControl.value; 
    const url= "http://127.0.0.1:5000/autocomplete/clients/" + searchTerm;
    this.filtered = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data)=>{
        this.api = data;
        
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'clientid', 'created_at', 'description', 'due_date', 'email', 'invoice_id','litige_number',
          'name', 'opened_at', 'phone', 'resolution_date', 'status', 'updated_at'
        ];
        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        this.client = this.api.clients;
        this.clienttNames = this.client.map((client: any) => client.name);
        console.log("client", this.clienttNames);
        this.dataSource = this.data;
      }
    })
  }

}
