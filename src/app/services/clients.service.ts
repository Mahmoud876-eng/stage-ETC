import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) { }
  getline() {
  return this.http.get('https://litige.azurewebsites.net/line');
  }
  getpie() {
  return this.http.get('https://litige.azurewebsites.net/pie/sum');
  }
  getlineid(id: string) {
    return this.http.get(`https://litige.azurewebsites.net/line/${id}`);
  }
  getpieid(id: string) {
    return this.http.get(`https://litige.azurewebsites.net/pie/sum/${id}`);
  }
}
