import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabdisp',
  templateUrl: './tabdisp.component.html',
  styleUrls: ['./tabdisp.component.scss']
})
export class TabdispComponent {
  constructor(private http: HttpClient, private route: Router) { }
    api: any;
    clients: any[] = [];
    dataSource: any[] = [];
    displayedColumns: string[] = [
      'clientid', 'name', 'address', 'email', 'phone',
      'invoice_id', 'id', 'created_at', 'updated_at',
      'description', 'due_date', 'opened_at', 'resolution_date', 'status'
    ];
    data: any[] = []; // To hold the data for the table
    //filter
    searchTerm: string = '';
    myControl = new FormControl('');
    client: any[] = [];
    filtered!: Observable<string[]>;
    clienttNames: string[] = [];
  
    ngOnInit() {
      const url = "https://litige.azurewebsites.net/letiges/join";
      this.filtered = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      this.http.get(url, { withCredentials: true }).subscribe({
        next: (data) => {
          this.api = data;
          // Only keep allowed fields in each row
          const allowedFields = [
            'address', 'clientid', 'created_at', 'description', 'due_date', 'email', 'id', 'invoice_id',
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
      const url= "https://litige.azurewebsites.net/autocomplete/" + searchTerm;
      this.filtered = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          
      this.http.get(url,{ withCredentials: true }).subscribe({
        next: (data)=>{
          this.api = data;
          
          // Only keep allowed fields in each row
          const allowedFields = [
            'address', 'clientid', 'created_at', 'email', 'id', 'invoice_id',
            'invoice_number', 'invoices_status', 'issue_date', 'montant', 'name', 'phone', 'updated_at'
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
  

