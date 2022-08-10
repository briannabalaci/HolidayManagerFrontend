import {User} from "./User";

export class Team{
  id?:number;
  name?:string;
  teamLeader?:User;
}

export class TeamAdd{
  name?:string;
  teamLeaderId?:number;
  membersId?:number[];
}
