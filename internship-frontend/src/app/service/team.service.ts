import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team, TeamAdd, TeamUpdate} from "../shared/data-type/Team";
import {coerceStringArray} from "@angular/cdk/coercion";

const URL_BASE = "http://localhost:8090/team"
// const URL_BASE = "http://Runtimeterrorinternshipapp-env.eba-exhqmhri.us-east-1.elasticbeanstalk.com/team"

const GET_ALL_TEAMS = URL_BASE+"/all"
const GET_TEAM_MEMBERS = URL_BASE+"/members"
const ADD_TEAM = URL_BASE+"/add"
const UPDATE_TEAM = URL_BASE+"/update"
const DELETE_TEAM = URL_BASE+"/delete"
const GET_BY_ID = URL_BASE+"/get-by-id"

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

  public updateTeam(team:TeamUpdate):Observable<TeamUpdate> {
    console.log("in service update team ...................")
    return this.httpClient.put<TeamUpdate>(UPDATE_TEAM,team);
  }

  public deleteTeam(teamId:number):Observable<Team> {
    return this.httpClient.delete<Team>(DELETE_TEAM + "/"+teamId.toString())
  }

  public getById(teamId:number):Observable<Team>{
    return this.httpClient.get<Team>(GET_BY_ID+"/"+teamId)
  }

}
