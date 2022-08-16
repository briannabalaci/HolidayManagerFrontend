import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNotificationsComponent } from './nav-bar-notifications.component';

describe('NavBarNotificationsComponent', () => {
  let component: NavBarNotificationsComponent;
  let fixture: ComponentFixture<NavBarNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
