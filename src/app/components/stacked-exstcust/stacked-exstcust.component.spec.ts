import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedExstcustComponent } from './stacked-exstcust.component';

describe('StackedExstcustComponent', () => {
  let component: StackedExstcustComponent;
  let fixture: ComponentFixture<StackedExstcustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedExstcustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedExstcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
