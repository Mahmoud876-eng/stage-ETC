import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
   litige: any;

  constructor(private router: Router,private http: HttpClient) {}
  ngOnInit() {
    this.litige = history.state.litige;
    console.log('dddedde',this.litige);
    const currentDate = new Date();
    console.log(currentDate);
  }  
  submitLitige() {
    this.http.post('/api/litiges', this.litige,{withCredentials: true}).subscribe({
      next: (response) => {
        console.log('Litige soumis avec succès', response);
        
        this.router.navigate(['/table']);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission du litige', error);
      }
    });
  }
  
}

