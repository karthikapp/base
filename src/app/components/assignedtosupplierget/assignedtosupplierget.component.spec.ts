import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtosuppliergetComponent } from './assignedtosupplierget.component';

describe('AssignedtosuppliergetComponent', () => {
  let component: AssignedtosuppliergetComponent;
  let fixture: ComponentFixture<AssignedtosuppliergetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtosuppliergetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtosuppliergetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
