import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstituteRequestsComponent } from './substitute-requests.component';

describe('SubstituteRequestsComponent', () => {
  let component: SubstituteRequestsComponent;
  let fixture: ComponentFixture<SubstituteRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstituteRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstituteRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
