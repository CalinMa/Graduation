import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingApiComponent } from './time-tracking-api.component';

describe('TimeTrackingApiComponent', () => {
  let component: TimeTrackingApiComponent;
  let fixture: ComponentFixture<TimeTrackingApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTrackingApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrackingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
