import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsDialogBoxComponent } from './more-details-dialog-box.component';

describe('MoreDetailsDialogBoxComponent', () => {
  let component: MoreDetailsDialogBoxComponent;
  let fixture: ComponentFixture<MoreDetailsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreDetailsDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreDetailsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
