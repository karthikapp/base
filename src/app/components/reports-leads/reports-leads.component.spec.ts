import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLeadsComponent } from './reports-leads.component';

describe('ReportsLeadsComponent', () => {
  let component: ReportsLeadsComponent;
  let fixture: ComponentFixture<ReportsLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
