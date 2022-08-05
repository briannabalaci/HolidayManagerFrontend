import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsRequestsComponent } from './teams-requests.component';

describe('TeamsRequestsComponent', () => {
  let component: TeamsRequestsComponent;
  let fixture: ComponentFixture<TeamsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
