import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-litige',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './litige.component.html',
  styleUrls: ['./litige.component.scss']
})
export class LitigeComponent {
    litige: any ;
    api: any;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() { 

    this.api = history.state.element||{};
    console.log('API data:', this.api);
    this.litige = {
      id: null,
      clientId: this.api.client_id|| 0,
      invoice_id: this.api.invoice_id || 0,
      status: '',
      description: '',
      opened_at: new Date(),
      updated_at: '',
      resolution_date: null
    };
  }
  submitLitige() {
    this.http.post('http://127.0.0.1:5000/register/litige', this.litige,{withCredentials: true}).subscribe({
      next: (response) => {
        console.log('Litige soumis avec succès', response);
        this.router.navigate(['/confirmation']);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission du litige', error);
      }
    });
  }
  
}
    

