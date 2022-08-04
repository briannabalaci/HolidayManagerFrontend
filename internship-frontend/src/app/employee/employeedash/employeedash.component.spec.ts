import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashComponent } from './employeedash.component';

describe('EmployeedashComponent', () => {
  let component: EmployeedashComponent;
  let fixture: ComponentFixture<EmployeedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeedashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
