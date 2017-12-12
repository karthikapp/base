import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadsComponent } from './teamleads.component';

describe('TeamleadsComponent', () => {
  let component: TeamleadsComponent;
  let fixture: ComponentFixture<TeamleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
