import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Team} from "../../shared/data-type/Team";
import {FormBuilder, Validators} from "@angular/forms";
import {Department, Role, User, UserType} from "../../shared/data-type/User";
import {UserService} from "../../service/user.service";
import {AuthguardService} from "../../authguards/authguard.service";

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
  addedMembers: User[] = []
  displayedColumns: string[] = ['User','Delete']



  constructor(private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
  }


  saveTeamLeader(teamLeader:String){
    this.teamLeader = teamLeader;
  }
  createTeam():void{
    const valuesFromForm = this.teamFormGroup.value;
    const newTeam ={
      name : valuesFromForm.name,
      teamLeader : this.teamLeader
    }

    console.log("In create")
    console.log("Members: "+this.addedMembers)
    console.log("Name: "+newTeam.name)
    console.log("Teamleader: "+newTeam.teamLeader)
    // this.clickCreate.emit(newTeam)
  }

  typed:Boolean = false;
  t:Team={id:1,name:'Team 1',teamLeader:"Teamleader"}
  users : User[] = [
    {id:1, email:'a',password:'a',forname:'A',surname:'B',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:2, email:'b',password:'a',forname:'C',surname:'E',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
    {id:3, email:'c',password:'a',forname:'E',surname:'F',department:Department.JAVA,role:Role.DEVELOPER,nrHolidays:30,type:UserType.TEAMLEAD,team:this.t},
  ]
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
