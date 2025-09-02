import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  standalone: true,
   imports: [
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     MatCardModule,
     MatFormFieldModule,
     MatInputModule,
     MatAutocompleteModule,
     MatButtonModule,
     MatIconModule
  ],
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent {
  api: any;
  id: any;
  litiges: any[]= [];
  clients: any[]=[];
  bool: boolean = false;
  clienttNames: string[] = [];
  searchTerm: string = '';
  myControl = new FormControl('');
  client: any[] = [];
  filtered!: Observable<string[]>;
  @Input() link: any;
  constructor(private router: Router, private http: HttpClient,private routes: ActivatedRoute ) {}
  /*ngOnChanges(changes: SimpleChanges) {
      if (changes['link']) {
        console.log('Received new link:', this.link);
        this.bool = false;
        this.filtered = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
        );
    
        this.http.get(this.link,{ withCredentials: true }).subscribe({
        next: (data)=>{
          this.api=data
          this.litiges=this.api.litiges;
          this.client=this.api.clients;
          this.clienttNames = this.client.map((client: any) => client.description);
          this.clients=this.api.client;
          console.log(this.litiges);
          console.log(this.clients);
        },
       error: (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }

        })
      }
  }    */
 ngOnInit() {
    
    let url: string;
    this.id = this.routes.snapshot.paramMap.get('id')!;
    if (this.id) {
      url= `https://litige.azurewebsites.net/litige/${this.id}`;
    }else {
      url= `https://litige.azurewebsites.net/litige`;
    }
    //const url=`${this.link}`;
    console.log("link to show filter",url);
    this.bool = false;
    this.filtered = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data)=>{
        this.api=data
        this.litiges=this.api.litiges;
        this.client=this.api.clients; 
        
        this.clienttNames = this.client.map((client: any) => client.description);
        
        
        this.clients=this.api.client;
        console.log('anything',this.litiges);
        console.log('eaea',this.clients);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }

    })
  };
  openDisputeDialog(litige: any) {
    // Logique pour ouvrir le dialogue de litige
    console.log('Ouvrir le dialogue pour le litige:',litige);
  };
  deleteDispute(id: string) {
    // Logique pour supprimer le litige
    console.log('Supprimer le litige avec l\'ID:', id);
  };
  editDispute( litige: any) {
    // Logique pour éditer le litige
    console.log('Éditer le litige:', litige);
    this.router.navigate(['/edit'], {
    state:  {litige } 
    });


  };
  expand(){
    let url: string;
    if (!this.id) {
      url= `https://litige.azurewebsites.net/litige/all`;
    } else {
      url= `https://litige.azurewebsites.net/litige/${this.id}/all`;
    }
    this.bool = true;
    
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data)=>{
        this.api=data
        this.litiges=this.api.litiges;
        this.clients=this.api.client;
        console.log(this.litiges);
        console.log(this.clients);
      }

    })

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clienttNames.filter(name => name.toLowerCase().includes(filterValue));
  }
  transfer() {
  const searchTerm = this.myControl.value; 
  const url = `https://litige.azurewebsites.net/litige/${this.id}/${searchTerm}`; //it make a search for the organizations
     // it make a search for the clients
    console.log("url to search",url);
    
    this.http.get(url,{ withCredentials: true }).subscribe({
      next: (data) => {
        this.bool = false;
        console.log('get successful:', data);
        this.api = data;
        
        this.clients = this.api.client;
        this.litiges = this.api.litiges;
        
        console.log('Updated Medecines:', this.litiges);
        console.log('Updated Patient Names:', this.searchTerm);
      },
      error: (err) => {
        console.error('Post error:', err);
      }
    });
  }
}

