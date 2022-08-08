import {Component, Input, OnInit} from '@angular/core';
import {Department, Role, User, UserType} from "../../../shared/data-type/User";
import {Team} from "../../../shared/data-type/Team";

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.scss']
})
export class UserSearchBarComponent implements OnInit {
  @Input() foundUsers!: User[];
  @Input() addedMembers!: User[]
  typed:Boolean = false;

  t:Team={id:1,name:'Team 1',teamLeader:"Teamleader"}
  users : User[] = [
    {id:1, email:'a',password:'a',forname:'A',surname:'B',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:2, email:'b',password:'a',forname:'C',surname:'E',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:3, email:'c',password:'a',forname:'E',surname:'F',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
  ]

  constructor() { }

  ngOnInit(): void {
  }


  addToTeam(user: User) {
    console.log(user)
    this.addedMembers.push(user)
    this.foundUsers.forEach((element,index)=>{

      if(element.id===user.id) this.foundUsers.splice(index, 1);
    });
  }

  public searchUser(): any {
    this.typed = true
    // this.userService.filterUsersByName(this.typedName).subscribe(
    //   response => {
    // this.foundUsers = response;
    this.foundUsers =  [
      {id:2, email:'b',password:'a',forname:'C',surname:'E',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
      {id:3, email:'c',password:'a',forname:'E',surname:'F',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t}]
    // },
    // error => {
    //   console.log(error);
    // });
  }

}
