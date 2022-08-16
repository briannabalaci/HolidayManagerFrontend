import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Team, TeamAdd, TeamUpdate} from "../shared/data-type/Team";
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
  errorMessageGeneral:string = ""

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

    this.teamService.addTeam(newTeam).subscribe( result => {
      console.log(result)
      if(result.name == null) this.errorMessageGeneral+=this.errorMessageGeneral + "A team with the same name already exists!\n"
      else {
        this.teamService.getAllTeams().subscribe(x => {
          this.teams = x
        })
        this.showForm=!this.showForm;

      }
    })
  }


  updateTeam(updatedTeam : TeamUpdate){
    this.showForm=!this.showForm;
    this.teamService.updateTeam(updatedTeam).subscribe( result => {
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
    this.teamToView = {
      id:team.id,
      name:team.name,
      teamLeader:team.teamLeader
    }
  }

  addUserToTeam(user:User){
    this.usersWithoutTeam.forEach((element, index) => {
      if (element.id === user.id) this.usersWithoutTeam.splice(index, 1);
    });
  }

  deleteUserFromTeam(user:User){
    if(!this.usersWithoutTeam.includes(user))
      this.usersWithoutTeam.push(user)
  }



}
