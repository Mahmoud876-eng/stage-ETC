import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  constructor() {
    this.socket =io('http://127.0.0.1:5000')
   }
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
}
}
