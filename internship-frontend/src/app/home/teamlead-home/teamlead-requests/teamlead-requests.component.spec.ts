import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadRequestsComponent } from './teamlead-requests.component';

describe('TeamleadRequestsComponent', () => {
  let component: TeamleadRequestsComponent;
  let fixture: ComponentFixture<TeamleadRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleadRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamleadRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
