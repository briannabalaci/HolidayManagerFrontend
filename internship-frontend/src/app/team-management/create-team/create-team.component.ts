import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Team, TeamAdd} from "../../shared/data-type/Team";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Department, Role, User, UserType} from "../../shared/data-type/User";
import {UserService} from "../../service/user.service";
import {AuthguardService} from "../../authguards/authguard.service";
import {MatTable} from "@angular/material/table";
import {TeamService} from "../../service/team.service";
import {Observable, ReplaySubject, Subject, takeUntil} from "rxjs";

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

  public userControl: FormControl = new FormControl();
  public userFilteredControl: FormControl = new FormControl();
  public filteredUsers: User[]

  public teamLeadControl: FormControl = new FormControl();

  typed:Boolean = false;
  protected _onDestroy = new Subject();
  isDisabled = false;


  @ViewChild(MatTable) table: MatTable<User>
  @Output() clickCreate = new EventEmitter<Team>();
  @Input() teamToView:Team //the team that we want to view
  @Input() usersWithoutTeam:User[] = []
  @Input() safeForView:boolean = false

  teamFormGroup = this.formBuilder.group({name:['',Validators.required],})
  constructor(private formBuilder: FormBuilder, private userService:UserService, private teamService:TeamService) { }

  ngOnInit(): void {

    this.filteredUsers = this.usersWithoutTeam.slice()
    this.userFilteredControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.safeForView == true){
      this.teamService.getTeamMembers(this.teamToView.id!).subscribe(
        members => {
          this.addedMembers = members
          this.teamFormGroup.controls['name'].setValue(this.teamToView.name!)
          // this.teamFormGroup.controls['name'].disable()
          this.isDisabled = true
          this.teamLeader = this.teamToView.teamLeader!;
          this.addedMembers.forEach((el, idx) => {
            if (el.id == this.teamToView.teamLeader?.id) {
              this.teamLeader = el;
            }
          })
        }
      )

      // this.teamService.getById(this.teamToView.id!).subscribe(
      //
      //   result => {
      //     this.teamLeader = result.teamLeader
      //     this.teamLeader.forname = result.teamLeader.forname
      //     this.teamLeader.surname = result.teamLeader.forname
      //   }
      // )
      // this.teamToView =
    }
  }

  createTeam():void{
    const valuesFromForm = this.teamFormGroup.value;
    const memb: number[] = []
    this.addedMembers.forEach((element, index) => {
      memb.push(element.id!)
    });
    const newTeam : TeamAdd = {
      name : valuesFromForm.name!,
      teamLeaderId : this.teamLeader.id,
      membersId:memb!,
    }

    this.clickCreate.emit(newTeam)
    this.addedMembers =[]
    this.table.renderRows()
    this.teamFormGroup.reset()
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
    console.log("Before add")
    console.log(this.addedMembers)
    if (!this.addedMembers.includes(user)) {
      console.log("In add")
      console.log(this.addedMembers)

      this.addedMembers.push(user)
      this.table.renderRows();

      this.usersWithoutTeam.forEach((element, index) => {
        if (element.id === user.id) this.usersWithoutTeam.splice(index, 1);
      });
    }

  }

  deleteUserFromTeam(user:User){
    this.addedMembers.forEach((element,index)=>{
      if(element.id===user.id) {
        this.addedMembers.splice(index, 1);
        console.log("After delete")
        console.log(this.addedMembers)
        this.usersWithoutTeam.push(user)
      }
    });
    this.table.renderRows();
  }



}

