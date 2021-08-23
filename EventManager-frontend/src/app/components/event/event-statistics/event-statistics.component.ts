import { DatePipe } from '@angular/common';
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

  get displayedColumns(): string[] {
    return['name', ...this.questions.map(question => "" + question.id)];
  }

  get shouldShowQuestionColumns(): boolean {
    return getFilterByKey(this.selectedFilter) != Filter.Declined;
  }

  get shouldShowNoSuchUsers(): boolean {
    return this.dataSourceUpdated.data.length > 0;
  }

  public dataSourceUpdated:MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private userService: UserService,
              private datePipe: DatePipe) { }

  event?: EventEntity;
  eventId: number = 1;
  filters: string[] = Object.keys(Filter);
  selectedFilter: string = this.filters[0];
  user: string = '';
  dataSource: any[] = [];
  invites: Invite[] = [];
  filter: string = '';

  invitesWithNames : {invite: Invite; name: string}[] = [];

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.eventService.getEvent(this.eventId).subscribe(
      data => {
        this.event = data;
        this.invites = this.event.invites!;

        //get names of each user
        this.invites.forEach(invite => {
          this.userService.findByEmail(invite.userInvited!).subscribe(user => 
            {
              const responses: string[][] = invite.inviteQuestionResponses?.map(response => {
                return [
                  ''+response.question?.id, response.answer?.text || ''
                ]
              }) || [];
  
              let result:any = {};
              responses.forEach(function(data){
                result[data[0]] = data[1]
              });
              this.dataSource.push( {
                name: user.forename?.concat(" ", user.surname || '')!,
                //invite.userInvited,
                status: invite.status,
                ...result
              });
              this.filterByStatus(Filter.Accepted);
              console.log(this.dataSource);
            });
        })
        
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
    switch(status) {
      case Filter.Accepted:
        this.filter = "accepted";
        break;
      case Filter.Declined:
        this.filter = "declined";
        break;
      case Filter.Pending:
        this.filter = "pending";
        break;
      default: //All
      this.filter = "all";
        this.dataSourceUpdated.data = this.dataSource;
        return;
    }
    
    this.dataSourceUpdated.data = this.dataSource.filter(row => row.status.toLowerCase() === this.filter.toLowerCase());
    console.log(this.dataSourceUpdated.data.length);
  }

  onFilterChange(): void {
    const filter = getFilterByKey(this.selectedFilter);
    this.filterByStatus(filter);
  }

  downloadPdf() {
    this.eventService.getGeneratedPdf(this.event?.id!, this.filter).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', url);
      link.setAttribute('download', `Event Report ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  }

}
