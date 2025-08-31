import { HttpClient } from '@angular/common/http';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Litige';
  bolean: boolean = false;
  notifications :any;
  notificationsCount: number = 0;
  
  api:any;
  constructor(private http: HttpClient,private route: Router, private socket: SocketService) {}
  // This is the function that will be called when the component is initialized
  socketlistner() {
    this.socket.listen('notification').subscribe({
      
      next: (data:any)=>{
        console.log("Notification received:", data);
        this.notificationsCount ++;
        this.notificationscall(); // Refresh the notifications
      }
    });
  }
  ngOnInit() {
    this.notificationscall();
    this.socketlistner();
  }
  notificationscall(){
    
    const url ="http://127.0.0.1:5000/notifications";
    this.http.get(url).subscribe({
      next:(data)=>{
        this.api=data
        this.notifications=this.api.notifications
        console.log("Notifications fetched:", this.notifications);
      }
    })
  }
  delete(notification: string) {
    const url = "http://127.0.0.1:5000/notifications/delete";
    
    console.log("Deleting notification:", notification);
    console.log("Current notifications count:", this.notificationsCount);
    this.http.patch(url,  notification ).subscribe({
      next: (data) => {
        console.log('Notification deleted:', data);

      }
    });
  }
    transfer(notification: string) {
      this.route.navigate(['/table'], { state: { notification } });
  }

  expandSidebar() {
    this.bolean = !this.bolean;
    console.log('Sidebar expanded:', this.bolean);
  }
  logout(){
    localStorage.removeItem("token")
    this.route.navigate(['/login'])
  }

}
