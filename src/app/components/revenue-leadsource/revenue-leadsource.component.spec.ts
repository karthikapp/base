import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueLeadsourceComponent } from './revenue-leadsource.component';

describe('RevenueLeadsourceComponent', () => {
  let component: RevenueLeadsourceComponent;
  let fixture: ComponentFixture<RevenueLeadsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueLeadsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueLeadsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
