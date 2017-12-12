import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamopportunitiesComponent } from './teamopportunities.component';

describe('TeamopportunitiesComponent', () => {
  let component: TeamopportunitiesComponent;
  let fixture: ComponentFixture<TeamopportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamopportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamopportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
