import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentListStatComponent } from './agent-list-stat.component';

describe('AgentListStatComponent', () => {
  let component: AgentListStatComponent;
  let fixture: ComponentFixture<AgentListStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentListStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentListStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
