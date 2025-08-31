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
    const url = 'http://127.0.0.1:5000/login';
    this.http.post<{token: string}>(url, this.data,{ withCredentials: true}).subscribe({
      next: (data) => {
        this.apiData = data;
        localStorage.setItem('token', this.apiData.token);
        this.router.navigate(['/dispute']);
       
      },
      error: (err) => {
        console.error('Login error:', err); 
      }
    });
  }
  
}


