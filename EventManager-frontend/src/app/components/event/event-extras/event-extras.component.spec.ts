import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventExtrasComponent } from './event-extras.component';

describe('EventExtrasComponent', () => {
  let component: EventExtrasComponent;
  let fixture: ComponentFixture<EventExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
