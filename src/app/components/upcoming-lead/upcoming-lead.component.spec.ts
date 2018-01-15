import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingLeadComponent } from './upcoming-lead.component';

describe('UpcomingLeadComponent', () => {
  let component: UpcomingLeadComponent;
  let fixture: ComponentFixture<UpcomingLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
