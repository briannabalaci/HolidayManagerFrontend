import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  email: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token')!;
    this.email = jwt_decode<any>(token).email;
  }

  checked(e: any): void {
    if(e.target.checked){
      document.getElementById("right-nav")?.setAttribute("style","box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); background-color: rgb(240, 240, 240);");      
    }else
      document.getElementById("right-nav")?.setAttribute("style","box-shadow: none; background-color: transparent;");      
  }

  logout():void{
    sessionStorage.clear();
  }

  goBack() {
    const destination = this.detectDestination();
    this.router.navigate([destination]);
  }
  
  detectDestination() {
    const url = this.router.url;
    console.log(url);
    switch(url) {
      case '/user-admin':
        return 'login';
      case '/dashboard':
        return 'login';
      case '/event':
        return 'dashboard';
      case '/event' + this.getEventId(url):
        return 'dashboard'
      default:
        return 'login';
    }
  }

  getEventId(url: String) {
    if(url.includes('event')) {
      const words = url.split('/');
      return '/' + words[words.length-1];
    }
    return '';
  }

}
