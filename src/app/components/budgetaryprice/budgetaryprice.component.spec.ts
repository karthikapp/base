import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetarypriceComponent } from './budgetaryprice.component';

describe('BudgetarypriceComponent', () => {
  let component: BudgetarypriceComponent;
  let fixture: ComponentFixture<BudgetarypriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetarypriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetarypriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
