import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAssignedtoComponent } from './revenue-assignedto.component';

describe('RevenueAssignedtoComponent', () => {
  let component: RevenueAssignedtoComponent;
  let fixture: ComponentFixture<RevenueAssignedtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueAssignedtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueAssignedtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
