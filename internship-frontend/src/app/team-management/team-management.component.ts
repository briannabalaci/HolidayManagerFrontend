import { Component, OnInit } from '@angular/core';
import {Team} from "../shared/data-type/Team";
import {TeamService} from "../service/team.service";
import {UserService} from "../service/user.service";



@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnInit {

  team:Team[] = []
  showForm:boolean=false;
  constructor(private teamService:TeamService) { }

  ngOnInit(): void {
  }

  public toggleShowAddForm(){
    this.showForm=!this.showForm;
  }

  createTeam(newTeam:Team){
    this.teamService.createTeam(newTeam).subscribe(result => this.team.push(result))
  }


}
