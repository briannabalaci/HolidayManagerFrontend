import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadHomeComponent } from './teamlead-home.component';

describe('TeamleadHomeComponent', () => {
  let component: TeamleadHomeComponent;
  let fixture: ComponentFixture<TeamleadHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleadHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamleadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
