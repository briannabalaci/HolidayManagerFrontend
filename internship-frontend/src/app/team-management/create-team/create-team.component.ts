import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Team} from "../../shared/data-type/Team";
import {FormBuilder, Validators} from "@angular/forms";
import {Department, Role, User, UserType} from "../../shared/data-type/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  @Output() clickCreate = new EventEmitter<Team>();

  teamFormGroup = this.formBuilder.group({
    name:['',Validators.required],
    teamLead:['',Validators.required],
    members:['',Validators.required]
  })

  typedName:String=""
  teamLeader:String=""
  foundUsers: User[] = [];

  t:Team={id:1,name:'Team 1',teamLeader:"Teamleader"}
  users : User[] = [
    {id:1, email:'a',forname:'A',surname:'B',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:2, email:'b',forname:'C',surname:'E',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:3, email:'c',forname:'E',surname:'F',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
  ]

  constructor(private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {}

  createTeam():void{
    const valuesFromForm = this.teamFormGroup.value;
    const newTeam ={
      name : valuesFromForm.name,
      teamLeader : valuesFromForm.teamLead
    }
    // this.clickCreate.emit(newTeam)
  }

  public searchUser(): any {
    // this.userService.filterUsersByName(this.typedName).subscribe(
    //   response => {
        // this.foundUsers = response;
        this.foundUsers =  [
          {id:2, email:'b',forname:'C',surname:'E',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
          {id:3, email:'c',forname:'E',surname:'F',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t}]
      // },
      // error => {
      //   console.log(error);
      // });
  }

}
