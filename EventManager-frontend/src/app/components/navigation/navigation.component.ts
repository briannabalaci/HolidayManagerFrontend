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
    switch(url) {
      case '/event':
        if (sessionStorage.getItem("back") === "-1")
          return 'dashboard';
        else
          return '/event/' + sessionStorage.getItem("back");
      case '/event' + this.getEventId(url):
        return 'dashboard';
      case '/event' + this.getEventId(url) + '/statistics':
        return '/event' + this.getEventId(url);
      default:
        return 'login';
    }
  }

  canGoBack() {
    const url = this.router.url;
    if(url === '/user-admin' || url === '/dashboard') {
      return false;
    }
    return true;
  }

  getEventId(url: String) {
    if(url.includes('event') && !url.includes('statistics')) {
      const words = url.split('/');
      return '/' + words[words.length-1];
    }
    if(url.includes('statistics')) {
      const words = url.split('/');
      return '/' + words[words.length-2];
    }
    return '';
  }

}
