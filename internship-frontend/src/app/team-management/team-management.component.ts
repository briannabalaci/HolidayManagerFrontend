import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Team, TeamAdd} from "../shared/data-type/Team";
import {TeamService} from "../service/team.service";
import {delay, Observable} from "rxjs";
import {User} from "../shared/data-type/User";
import {UserService} from "../service/user.service";



@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnInit {

  showForm:boolean=false;
  teams:Team[] = []; //the teams list thta is sent to teams-table
  teamToView:Team = new Team();
  usersWithoutTeam:User[] = []
  safeForView:boolean = false

  constructor(private teamService:TeamService, private userService:UserService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(data => this.teams = data);
    this.userService.getAllUsersWithoutTeam().subscribe(data => this.usersWithoutTeam = data)
  }

  public toggleShowAddForm(){
    this.safeForView = false
    this.showForm=!this.showForm;
  }

  createTeam(newTeam : TeamAdd){
    this.showForm=!this.showForm;
    this.teamService.addTeam(newTeam).subscribe( result => {
        this.teamService.getAllTeams().subscribe( x => {this.teams = x})
    })
  }

  deleteTeam(teamID:number){
    this.teams.forEach((element,index)=>{
      if(element.id===teamID)
      {
        this.teamService.deleteTeam(element.id!).subscribe( result => {
          this.teamService.getAllTeams().subscribe( x => {this.teams = x})
          this.userService.getAllUsersWithoutTeam().subscribe(x => this.usersWithoutTeam = x)
        })

      }
    });
  }

  viewTeamDetails(team:Team){
    this.showForm = true;
    this.safeForView = true
    this.teamToView = team
  }



}
