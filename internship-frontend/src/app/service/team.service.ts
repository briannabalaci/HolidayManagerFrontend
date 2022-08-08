import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../shared/data-type/Team";

const GET_ALL_TEAMS = "http://localhost:8090/team/get-all"
const ADD_TEAM = "http://localhost:8090/team/add"

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient:HttpClient) { }

  public getAllTeams():Observable<Team[]>{
    return this.httpClient.get<Team[]>(GET_ALL_TEAMS);
  }

  public createTeam(team:Team):Observable<Team> {
    return this.httpClient.post<Team>(ADD_TEAM,team);
  }
}
