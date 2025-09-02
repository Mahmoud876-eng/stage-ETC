
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent implements OnInit {
  api: any;
  invoice: any ;
  invoices: any;
  clients: any[] = [];
  litige: any;
  
  constructor(private http: HttpClient,private route : Router,private routes: ActivatedRoute ) {}

  ngOnInit() {
    this.invoice = history.state.invoice;
   
  }

  saveInvoice() {
    // For now, just log the invoice data
    console.log('Invoice to save:', this.invoice.invoices_status);
    const url = 'https://litige.azurewebsites.net/api/invoices/' + this.invoice.invoice_id
    if (this.invoice.invoices_status === 'disputed') {
      this.http.put(url, this.invoice, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Invoice updated successfully', response);
          this.api = response;
          this.litige = this.api.message;
          this.route.navigate(['/dispute'], {
            state: { element: this.invoice }
          });
        },
        error: (error) => {
          console.error('Error updating invoice', error);
        }
      });
    } else {
      this.http.put(url, this.invoice, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Invoice updated successfully', response);
          this.route.navigate(['/editfa']);
        },
        error: (error) => {
          console.error('Error updating invoice', error);
          alert('Error updating invoice');
        }
      });
    }
    
    
  }
  cancel() {
    // Logic to cancel the edit
    console.log('Edit cancelled');
    alert('Edit cancelled (static mode).');
  }
  
}
