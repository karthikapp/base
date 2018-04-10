import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuechartsCustomerComponent } from './revenuecharts-customer.component';

describe('RevenuechartsCustomerComponent', () => {
  let component: RevenuechartsCustomerComponent;
  let fixture: ComponentFixture<RevenuechartsCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuechartsCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuechartsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
