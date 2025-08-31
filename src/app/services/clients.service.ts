import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) { }
  getline() {
    return this.http.get('http://127.0.0.1:5000/line');
  }
  getpie() {
    return this.http.get('http://127.0.0.1:5000/pie/sum');
  }
  getlineid(id: string) {
    return this.http.get(`http://127.0.1:5000/line/${id}`);
  }
  getpieid(id: string) {
    return this.http.get(`http://127.0.1:5000/pie/sum/${id}`);
  }
}
