import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueExstcustComponent } from './revenue-exstcust.component';

describe('RevenueExstcustComponent', () => {
  let component: RevenueExstcustComponent;
  let fixture: ComponentFixture<RevenueExstcustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueExstcustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueExstcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
