import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe( data => {
      console.log(data);
    })
  }

}
