import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallStartEndReportComponent } from './call-start-end-report.component';

describe('CallStartEndReportComponent', () => {
  let component: CallStartEndReportComponent;
  let fixture: ComponentFixture<CallStartEndReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallStartEndReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallStartEndReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
