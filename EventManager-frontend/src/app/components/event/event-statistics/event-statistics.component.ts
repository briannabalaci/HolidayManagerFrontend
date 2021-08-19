import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EventEntity } from 'src/app/shared/data-types/event';
import { Invite } from 'src/app/shared/data-types/invite';
import { Question } from 'src/app/shared/data-types/question';
import { EventService } from 'src/app/shared/services/event.service';
import { UserService } from 'src/app/shared/services/user.service';

enum Filter {
  Accepted = "accepted",
  Declined = "declined",
  Pending = "pending",
  All = "all"
}

function getFilterByKey(key: string) {
  return Filter[key as keyof typeof Filter];
}

@Component({
  selector: 'app-event-statistics',
  templateUrl: './event-statistics.component.html',
  styleUrls: ['./event-statistics.component.scss']
})
export class EventStatisticsComponent implements OnInit {
  get questions(): Question[] {
    return this.event?.questions || [];
  }

  get invites(): Invite[] {
    return this.event?.invites || [];
  }

  get displayedColumns(): string[] {
    return['name', ...this.questions.map(question => "" + question.id)];
  }

  get shouldShowQuestionColumns(): boolean {
    return getFilterByKey(this.selectedFilter) != Filter.Declined;
  }

  get dataSource(): any[] {
    return this.invites.map(invite => {

      const responses: string[][] = invite.inviteQuestionResponses?.map(response => {
        return [
          ''+response.question?.id, response.answer?.text || ''
        ]
      }) || [];

      let result:any = {};
      responses.forEach(function(data){
        result[data[0]] = data[1]
      });

      return {
        name: this.findName(invite.userInvited || ''),
        //invite.userInvited,
        status: invite.status,
        ...result
      }
    })
  }

  public dataSourceUpdated:MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  event?: EventEntity;
  eventId: number = 1;
  filters: string[] = Object.keys(Filter);
  selectedFilter: string = this.filters[0];
  user: string = '';

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.eventService.getEvent(this.eventId).subscribe(
      data => {
        this.event = data;
        this.filterByStatus(Filter.Accepted);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  findName(email: string) {
    this.userService.findByEmail(email).subscribe(user => 
      {
        console.log(user.forename?.concat(" ", user.surname || ''));
        return user.forename?.concat(" ", user.surname || '');
      });
  }

  filterByStatus(status: Filter) {
    let filter = "";
    switch(status) {
      case Filter.Accepted:
        filter = "accepted";
        break;
      case Filter.Declined:
        filter = "declined";
        break;
      case Filter.Pending:
        filter = "not accepted";
        break;
      default: //All
        this.dataSourceUpdated.data = this.dataSource;
        return;
    }
    
    this.dataSourceUpdated.data = this.dataSource.filter(row => row.status.toLowerCase() === filter);
  }

  onFilterChange(): void {
    const filter = getFilterByKey(this.selectedFilter);
    this.filterByStatus(filter);
  }

  downloadPdf() {
    console.log("Merge");
  }

}
