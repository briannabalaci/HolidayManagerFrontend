import { Component, OnInit } from '@angular/core';
import {Team} from "../../shared/data-type/Team";
import {TeamService} from "../../service/team.service";


const TEAMS:Team[]=[
  {id:1,name:"Team 1",teamLeader:"a"},
  {id:2,name:"Team 2",teamLeader:"a"},
  {id:3,name:"Team 3",teamLeader:"a"},
]

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})

export class TeamsTableComponent implements OnInit {

  // const DATA_SOURCE = this.teams
  displayedColumns: string[] = ['Team','View','Delete']
  dataSource = TEAMS;
  teams:Team[] = []

  constructor(private teamService:TeamService) { }

  ngOnInit(): void {
     this.teamService.getAllTeams().subscribe(data => {this.teams = data;})
  }

}
