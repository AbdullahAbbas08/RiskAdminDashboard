import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallReasonStatComponent } from './call-reason-stat.component';

describe('CallReasonStatComponent', () => {
  let component: CallReasonStatComponent;
  let fixture: ComponentFixture<CallReasonStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallReasonStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallReasonStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
