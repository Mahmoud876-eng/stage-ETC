import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  data = {
    username: '',
    email: '',
    password: ''
  };
  id: any;
  apidata: any;
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const url = 'https://litige.azurewebsites.net/register';
    this.http.post<{token: string}>(url, this.data,{ withCredentials: true}).subscribe({
      next: (data) => {
        if (data) {
          console.log('Post successful:', data);

          localStorage.setItem('token', this.apidata.token);
          this.router.navigate(['/client']);
        } else {
          console.error('Post failed:', data);
        }
      },
      error: (err: any) => {
        console.error('Post error:', err);
      }
    });
  }
}

