import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';  

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
api: any;
  litiges: any[]= [];
  clients: any[]=[];
  bool: boolean = false;
  clienttNames: string[] = [];
  searchTerm: string = '';
  myControl = new FormControl('');
  client: any[] = [];
  filtered!: Observable<string[]>;

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    const url= "https://litige.azurewebsites.net/litige";
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
        this.clienttNames = this.client.map((client: any) => client.name);
        this.clients=this.api.client;
        console.log(this.litiges);
        console.log(this.clients);
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
    const url= "https://litige.azurewebsites.net/litige/all";
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
    const url = `https://litige.azurewebsites.net/litige/${searchTerm}`;
    
    
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
