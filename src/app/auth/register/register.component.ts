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
    password: '',
    status: ''
  };
  id: any;
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const url = 'https://litige.azurewebsites.net/register';
    this.http.post(url, this.data, { withCredentials: true }).subscribe({
      next: (data: any) => {
        if (data) {
          console.log('Post successful:', data);
          if (!this.id){
            this.router.navigate(['/client']);
          }else{
            this.router.navigate(['/user', this.id]);

          }
          
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

