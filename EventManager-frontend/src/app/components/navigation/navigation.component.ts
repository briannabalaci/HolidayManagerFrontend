import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  email: string = '';

  constructor() { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token')!;
    this.email = jwt_decode<any>(token).email;
  }

  checked(e: any): void {
    if(e.target.checked){
      document.getElementById("right-nav")?.setAttribute("style","box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); background-color: white;");      
    }else
      document.getElementById("right-nav")?.setAttribute("style","box-shadow: none; background-color: transparent;");      
  }

  logout():void{
    sessionStorage.clear();
  }

}
