import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadPickerComponent } from './teamlead-picker.component';

describe('TeamleadPickerComponent', () => {
  let component: TeamleadPickerComponent;
  let fixture: ComponentFixture<TeamleadPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleadPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamleadPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
