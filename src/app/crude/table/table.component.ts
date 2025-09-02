import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, min, startWith } from 'rxjs/operators';  
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, 
    MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatBadgeModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
constructor(private http: HttpClient,private route : Router, private socket: SocketService ) { }
@Input() id_c: number | null = null;
api: any;
clients: any[] = [];
dataSource: any[] = [];
time: { min: Date | null, max: Date | null } = {
  min: null,
  max: null
};
//sn is for the search bar
SN: boolean = false;
//need to get rid of the action if it s aclient  

  displayedColumns: string[] = [];
  displaysfotter: string[] = ['navigation'];
  //I put on it the patch data that I m gonna send to the api 
  partialdata: any ;
  //to edit the amount that need to be paid
  id: number =0;
  //to edit the amount that has been paid
  id_p : number =0;
  // the amount that need to be paid
  bool: boolean = false;
  //the amount that has been paid
  paid: boolean = false;
  //to show the date and mails
  date: boolean = false;
  mail: boolean = false;
  data: any[] = []; // To hold the data for the table
  //filter
  searchTerm: string = '';
  myControl = new FormControl('');
  client: any[] = [];
  filtered!: Observable<string[]>;
  clienttNames: string[] = [];
  notification: any;
  //navigation between rows
  maxrow: any;
  currentRow: number = 0;
  //for status to get from the child component
  status_client:boolean = false;
  count: number = 0;

  ngOnInit() {
    this.socketcall();
    if(this.id_c){ 
      this.status_client = true;
      this.displayedColumns=[
        'name', 'email', 'phone', 'address',
        'invoice_number', 'invoices_status',
        'created_at', 'due_date',
        'montant', 'amount_paid',
      ];
      console.log("id from route", this.id_c);
  const url="https://litige.azurewebsites.net/tab/client/"+this.id_c;
      this.api_tab(url)
      
      }
    else { 
      this.displayedColumns=[
        'name', 'email', 'phone', 'address',
        'invoice_number', 'invoices_status',
        'created_at', 'due_date',
        'montant', 'amount_paid',
        'actions',
      ];
      this.notification=history.state.notification; // u go to the invoice that changed it s form
  const url= "https://litige.azurewebsites.net/letiges/join";
      if (this.notification) {
        this.invoiceid(this.notification);
      }
      else {
        this.filtered = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
            
        this.http.get(url,{ withCredentials: true }).subscribe({
          next: (data)=>{
            this.api = data;
            
            // Only keep allowed fields in each row
            const allowedFields = [
              'address', 'created_at', 'email','client_id','invoice_id',
              'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
              'actions',
            ];
            this.data = (this.api.data || []).map((row: any) => {
              const filtered: any = {};
              allowedFields.forEach(field => {
                if (row.hasOwnProperty(field)) filtered[field] = row[field];
              });
              return filtered;
            });
            this.maxrow=this.api.maxrow;
            this.client = this.api.clients;
            this.clienttNames = this.client.map((client: any) => client.name);
            console.log("client", this.data);
            this.dataSource = this.data;
          }
        })
      }}
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clienttNames.filter(name => name.toLowerCase().includes(filterValue));
  }
  //it sort data
  sortData(status: string) {
    

    
  const url= "https://litige.azurewebsites.net/letiges/join/group";
    this.filtered = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data)=>{
        this.api = data;
        
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'created_at', 'email','client_id','invoice_id',
          'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
          'actions',
        ];
        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        this.client = this.api.clients;
        if (status === 'name') {
          this.SN = !this.SN;
          this.clienttNames = this.client.map((client: any) => client.name);
        }
        else {
          this.mail=!this.mail;
          this.clienttNames = this.data.map((client: any) => client.email);
        }
        console.log("client", this.clienttNames);
        this.dataSource = this.data;
      }
    })
    
  }
  //it redirect u to the user page
  sortDataname(id: number) {
    console.log("id from route", id);
    this.route.navigate(['/user', id]);
  }
  transfer(link : string) {
    // Logic to transfer data
    
    const searchTerm = this.myControl.value; 
  const url= "https://litige.azurewebsites.net/"+link + searchTerm;
    this.filtered = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data)=>{
        this.api = data;
        
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'created_at', 'email','client_id','invoice_id',
          'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
          'actions',
        ];

        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        this.client = this.api.clients;
        if (link === 'autocomplete/') {
          this.SN = !this.SN;
          this.clienttNames = this.client.map((client: any) => client.name);
        }
        else {
          this.mail=!this.mail;
          this.clienttNames = this.data.map((client: any) => client.email);
        }
        console.log("client", this.clienttNames);
        this.dataSource = this.data;
      }
    })
  }

  //it rederict u to a page that make u change the status of the invoice
  sortDataStatus(invoice: any) {
    this.route.navigate(['edit/invoice'],{
      state: { invoice } 
    })
    }
  
  sortdatastatuslitige(litige: any) {
    this.route.navigate(['/edit'], {
      state: { litige } 
    });
    console.log("litige from route", litige);

  }
  filterbytime() {
    const params: any = {};
  const url="https://litige.azurewebsites.net/filterbytime";
    if (this.time.min&& this.time.max) {
      params.min = this.time.min.toISOString();
      params.max = this.time.max.toISOString();
    }  
    this.http.get(url,{params}).subscribe({
      next: (data) => {
        this.api=data
        
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'created_at', 'email','client_id','invoice_id',
          'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
          'actions',
        ];
        
        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        
        this.clienttNames = this.data.map((client: any) => client.name);
        console.log("client", this.clienttNames);
        console.log("data", this.data);
        this.dataSource = this.data;
      }

    })

  
  }
  dispute(element: any) {
    this.route.navigate(['dispute'],{
      state: { element }
    })
   }
  paidclient(element: any) {
  const url='https://litige.azurewebsites.net/update/all' ;
    console.log("element from route", element);
    const data = {
      id: element.invoice_id,
      date: new Date(),
      money: element.montant,
    };
    this.http.patch(url, data).subscribe({
      next: (data) => {
        console.log("Paid client updated:", data);
        this.ngOnInit();
      },
      error: (error) => {
        console.error("Error updating paid client:", error);
      }
    });
  const url2 = 'https://litige.azurewebsites.net/notifications/insert';
    console.log("element from route", element);
    this.http.post(url2, data).subscribe({
      next: (data) => {
        console.log("Paid client updated:", data);

      }
    });
  }
  invoiceid(notification: any) {
  const url = `https://litige.azurewebsites.net/notifications/${notification.invoice_id}`;
    this.http.get(url).subscribe({
      next: (data) => {
        console.log("notification from route", notification);
        this.api = data;
        // Only keep allowed fields in each row
        const allowedFields = [
          'address', 'created_at', 'email','client_id','invoice_id',
          'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
          'actions',
        ];
        this.data = (this.api.data || []).map((row: any) => {
          const filtered: any = {};
          allowedFields.forEach(field => {
            if (row.hasOwnProperty(field)) filtered[field] = row[field];
          });
          return filtered;
        });
        console.log("client", this.clienttNames);
        this.dataSource = this.data;
      }
    });
  }
  //edit amount that need to be paid
  edit(element: any) {
    this.bool=!this.bool;
    this.id = element.invoice_id;
  const url="https://litige.azurewebsites.net/edit/montant"
    if (!this.bool) {
      //const result = confirm("Are you sure you want to edit the amount");
      this.partialdata={
      id: this.id,
      montant: element.montant,
      }
      console.log(this.partialdata)

      this.http.patch(url,this.partialdata).subscribe();

    }    
      
   }
  //edit amount paid 
  edit_paid(element: any) {
    this.paid=!this.paid;
    this.id_p = element.invoice_id;
  const url="https://litige.azurewebsites.net/edit/amount_paid"
    if (!this.paid) {
      //const result = confirm("Are you sure you want to edit the amount paid");
      this.partialdata={
      id: this.id_p,
      montant: element.amount_paid,
      }
      console.log(this.partialdata)

      this.http.patch(url,this.partialdata).subscribe({
        error: (err) => {
          console.error("Error updating amount paid:", err);
        },

      });

    }
  }
  date_a() {
    this.date = !this.date;
  }
  //navigation between rows
  nextRow(){
    console.log("next row");
    this.currentRow+=5;
  const url = "https://litige.azurewebsites.net/nextrow/"+ this.currentRow;
    this.api_tab(url);

  }
  previousRow(){
    console.log("previous row");
    this.currentRow-=5;
  const url= "https://litige.azurewebsites.net/previousrow/"+ this.currentRow;
    this.api_tab(url);

  }
  currentrow(){
    console.log("current row");
  const url= "https://litige.azurewebsites.net/nextrow/"+ this.currentRow;
    this.api_tab(url);

  }
  goToFirstRow(){
    console.log("go to first row");
    this.currentRow = 0;
  const url = "https://litige.azurewebsites.net/letiges/join";
    this.api_tab(url);
  }
  goToLastRow(){
    console.log("go to last row");
    const restrow = this.maxrow %5;
    this.currentRow = this.maxrow - restrow ;
  const url= "https://litige.azurewebsites.net/previousrow/"+ this.currentRow;
    this.api_tab(url);

    
  }
  //end of the code that navigate between rows
  api_tab(url: string){
      console.log("API call to:", url);
      this.http.get(url,{ withCredentials: true }).subscribe({
        next: (data)=>{
          this.api = data;
          
          // Only keep allowed fields in each row
          const allowedFields = [
            'address', 'created_at', 'email','client_id','invoice_id',
            'invoice_number', 'invoices_status','due_date', 'montant','amount_paid', 'name', 'phone', 'updated_at',
            'actions',
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
invoices() {
  const url = "https://litige.azurewebsites.net/invoices_sort";
  this.api_tab(url);

}
  nextcount() {
    this.count+=3;
  }

  previouscount() {
    this.count-=3;
  }
  nextnextcount() {
    this.count+=6;
  }
  previouspreviouscount() {
    this.count-=6;
  }
  socketcall(){
    this.socket.listen('paid').subscribe({
      next: (data:any)=>{
        console.log("socket called:", data);
        this.currentrow(); // Refresh the current row
      }
    });
  
  
  }
  goToRow(row: number) {
    this.currentRow = row * 5;
  const url = "https://litige.azurewebsites.net/nextrow/" + this.currentRow;
    this.api_tab(url);
  }


}