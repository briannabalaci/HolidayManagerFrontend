import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Team} from "../../shared/data-type/Team";
import {TeamService} from "../../service/team.service";
import {MatTable} from "@angular/material/table";
import {User} from "../../shared/data-type/User";

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})

export class TeamsTableComponent implements OnInit,OnChanges {

  displayedColumns: string[] = ['Team','View','Delete']
  @Input() teams:Team[] = [] //get the teams from team-management
  @Output() clickDeleteTeam = new EventEmitter<number>() //send de deleted team ID to team-management
  @Output() clickViewTeamDetails = new EventEmitter<Team>() //send the Id of the team we want to view

  constructor(private teamService:TeamService) { }
  @ViewChild(MatTable) table: MatTable<User>

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changeees")
    console.log(changes)
    console.log(this.teams)
  }
  deleteTeam(team:Team){
    this.clickDeleteTeam.emit(team.id)
  }

  viewTeamDetails(team:Team){
    this.clickViewTeamDetails.emit(team)
  }


}
