import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team, TeamAdd} from "../shared/data-type/Team";
import {coerceStringArray} from "@angular/cdk/coercion";

const GET_ALL_TEAMS = "http://localhost:8090/team/get-all"
const GET_TEAM_MEMBERS = "http://localhost:8090/team/get-members"
const ADD_TEAM = "http://localhost:8090/team/add"
const DELETE_TEAM = "http://localhost:8090/team/delete"
const GET_BY_ID = "http://localhost:8090/team/get-by-id"

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient:HttpClient) { }

  public getAllTeams():Observable<Team[]>{
    return this.httpClient.get<Team[]>(GET_ALL_TEAMS);
  }

  public getTeamMembers(teamID:number):Observable<Team[]>{
    return this.httpClient.get<Team[]>(GET_TEAM_MEMBERS + "/" +teamID.toString());
  }

  public addTeam(team:TeamAdd):Observable<TeamAdd> {
    return this.httpClient.post<TeamAdd>(ADD_TEAM,team);
  }

  public deleteTeam(teamId:number):Observable<any> {
    return this.httpClient.delete<any>(DELETE_TEAM + "/"+teamId.toString())
  }

  public getById(teamId:number):Observable<any>{
    return this.httpClient.get<any>(GET_BY_ID+"/"+teamId)
  }

}
