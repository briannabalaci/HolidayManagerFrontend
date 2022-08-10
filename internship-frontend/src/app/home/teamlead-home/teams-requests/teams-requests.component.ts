import { Component, OnInit } from '@angular/core';
import {TeamleadService} from "../../../service/teamlead.service";
import {Holiday} from "../../../shared/data-type/Holiday";
import {User} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";

export class RequestsTeamMembers {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  type?: string;
}

const ELEMENT_DATA: RequestsTeamMembers[] = []
@Component({
  selector: 'app-teams-requests',
  templateUrl: './teams-requests.component.html',
  styleUrls: ['./teams-requests.component.scss']
})
export class TeamsRequestsComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Start date', 'End date', 'Type', 'Edit'];
  dataSource = ELEMENT_DATA;
  requests!: Holiday[];
  user!: User;
  team!: Team;

  constructor(private teamLeadService: TeamleadService) { }

  ngOnInit(): void {
    this.teamLeadService.getUser().subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.teamLeadService.getTeamRequests(this.user!.team!.id!).subscribe(data => {
        this.requests = data;
        this.convertData();
      })
    })


  }

  convertData(){
    this.dataSource = this.requests.map(obj => {
      return {name: obj.user!.forname! + " " + obj.user!.surname!, startDate: obj.startDate, endDate: obj.endDate, type: obj.type}});
  }

}
