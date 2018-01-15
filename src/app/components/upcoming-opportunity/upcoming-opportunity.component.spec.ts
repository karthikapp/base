import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingOpportunityComponent } from './upcoming-opportunity.component';

describe('UpcomingOpportunityComponent', () => {
  let component: UpcomingOpportunityComponent;
  let fixture: ComponentFixture<UpcomingOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
