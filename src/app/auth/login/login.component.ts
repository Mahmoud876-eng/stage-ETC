import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiData: any;
  data = {
    email: '',
    password: ''
  };
  id: any;
  constructor(private http: HttpClient, private router: Router)  {}
  login() {
    const url = 'https://litige.azurewebsites.net/login';
    this.http.post<{token: string}>(url, this.data,{ withCredentials: true}).subscribe({
      next: (data) => {
        this.apiData = data;
        localStorage.setItem('token', this.apiData.token);
        this.router.navigate(['/client']);
       
      },
      error: (err) => {
        console.error('Login error:', err); 
      }
    });
  }
  
}


