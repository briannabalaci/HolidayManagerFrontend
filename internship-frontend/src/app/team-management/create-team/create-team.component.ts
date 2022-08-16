import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Team, TeamAdd, TeamUpdate} from "../../shared/data-type/Team";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Department, Role, User, UserType} from "../../shared/data-type/User";
import {MatTable} from "@angular/material/table";
import {TeamService} from "../../service/team.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit,OnChanges {

  teamLeader:User;
  teamName:string = ""
  addedMembers: User[] = []
  displayedColumns: string[] = ['User','Delete']
  addUpdate:boolean = false
  triedToAddUpdate:boolean = false


  public userControl: FormControl = new FormControl();
  public userFilteredControl: FormControl = new FormControl();
  public filteredUsers: User[]

  public teamLeadControl: FormControl = new FormControl();

  typed:Boolean = false;
  isErrorMessage:Boolean = false;
  errorString=""
  protected _onDestroy = new Subject();
  isDisabled = false;


  @ViewChild(MatTable) table: MatTable<User>

  @Output() clickCreate = new EventEmitter<Team>();
  @Output() clickUpdate = new EventEmitter<Team>();
  @Output() clickDeleteUserFromTeam = new EventEmitter<User>()
  @Output() clickAddUserToTeam = new EventEmitter<User>()
  @Output() errorMessageEmitter =new EventEmitter<string>()

  @Input() teamToView:Team //the team that we want to view
  @Input() usersWithoutTeam:User[] = []
  @Input() safeForView:boolean = false
  @Input() errorMessageFromAdd:string = ""

  teamFormGroup = this.formBuilder.group({name:['',Validators.required],})
  constructor(private formBuilder: FormBuilder, private teamService:TeamService) { }

  ngOnInit(): void {
    this.filteredUsers = this.usersWithoutTeam.slice()
    this.userFilteredControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addUpdate = true
    if(this.safeForView){
      this.addUpdate = false
      this.teamService.getTeamMembers(this.teamToView.id!).subscribe(
        members => {
          this.addedMembers = members
          this.teamFormGroup.controls['name'].setValue(this.teamToView.name!)
          this.isDisabled = true
          this.teamLeader = this.teamToView.teamLeader!;
          this.addedMembers.forEach((el, idx) => {
            if (el.id == this.teamToView.teamLeader?.id) {
              this.teamLeader = el;
            }
          })
        }
      )
    }
    if(this.errorMessageFromAdd!="" ) {
      console.log("intru")
      // this.errorMessageEmitter.emit(errorString)
      this.isErrorMessage=true
      this.errorString = this.errorMessageFromAdd
    }
    else if(this.triedToAddUpdate){
      // this.errorString = ""
      this.addedMembers = []
      this.table.renderRows()
      this.teamFormGroup.reset()
    }
  }



  resetWarnings(){
    this.isErrorMessage = false
    this.errorString = ""
    // this.teamLeader = new User()
    console.log("reset")
  }
  onlySpaces(str:string) {
    return /^\s*$/.test(str);
  }
  createTeam():void{
    const valuesFromForm = this.teamFormGroup.value;
    const memb: number[] = []
    this.addedMembers.forEach((element, index) => {
      memb.push(element.id!)
    });
    console.log("In create team")
    console.log(this.teamLeader)

    if(valuesFromForm.name == "" || this.onlySpaces(valuesFromForm.name!)) this.errorString+="Name field must not be null! \n"
    if(this.addedMembers.length == 0 ) this.errorString+="You must add at least one member!\n"
    if(this.teamLeader == null || this.teamLeader.id == null) this.errorString+="The team must have a team leader!\n"
    if(this.errorString!="") {
      // this.errorMessageEmitter.emit(errorString)
      this.isErrorMessage=true
      console.log("Teamleader: "+this.teamLeader)
    }
    else {
      console.log("Teamleader in add: "+this.teamLeader)

      // this.errorString = ""
      this.triedToAddUpdate = true
      if (this.addUpdate) {
        const newTeam: TeamAdd = {
          name: valuesFromForm.name!,
          teamLeaderId: this.teamLeader.id,
          membersId: memb!,
        }
        this.clickCreate.emit(newTeam)

      } else {
        const updatedTeam: TeamUpdate = {
          id: this.teamToView.id!,
          name: valuesFromForm.name!,
          teamLeaderId: this.teamLeader.id,
          membersId: memb!,
        }
        this.clickUpdate.emit(updatedTeam)
      }
    }
  }

  protected filterUsers() {
    if (!this.usersWithoutTeam) return

    let search = this.userFilteredControl.value;
    if (!search) {
      this.filteredUsers = this.usersWithoutTeam.slice()
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers =
      this.usersWithoutTeam.filter(user => (user.forname + " " + user.surname).toLowerCase().indexOf(search) > -1)
  }


  addUserToTeam(user: User) {
    const aux : User[] = []
    this.addedMembers.forEach(val => {aux.push(Object.assign({},val))})
    if (!aux.includes(user)) {
      aux.push(user)
      this.addedMembers.splice(0)
      aux.forEach(val => {this.addedMembers.push(Object.assign({},val))})
      this.table.renderRows();
      this.clickAddUserToTeam.emit(user)
    }

  }

  deleteUserFromTeam(user:User){
    const aux : User[] = []
    this.addedMembers.forEach(val => {aux.push(Object.assign({},val))})
    aux.forEach((element,index)=>{
      if(element.id===user.id) {
        aux.splice(index, 1);
        this.addedMembers.splice(0)
        aux.forEach(val => {this.addedMembers.push(Object.assign({},val))})
        if(this.addedMembers.length == 0 || this.teamLeader.id == user.id) {
          this.teamLeader = new User()
          console.log("Ajung aici")
          console.log(this.teamLeader)
        }

        this.clickDeleteUserFromTeam.emit(user)
      }
    });
    this.table.renderRows();
  }



}

